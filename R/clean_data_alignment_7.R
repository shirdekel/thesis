##' @title Clean data for alignment 2

##' @param data_raw_filtered
##' @param test
##' @param prolific_filter
##' @param prolific_filter_label
##' @return
##' @author Shir Dekel
##' @export
clean_data_alignment_7 <- function(data_raw_filtered, experiment_number, test, prolific_filter, prolific_filter_label) {
  names_to <- c("project", "dv", "alignment", "reliability_type", "reliability_amount", "npv_cond", "npv_amount")
  names_pattern <- "(.*)_cond_(.*)_(.*)A_(.*)R_(.*)R_(.*)N_(.*)"

  data_raw_tidy <-
    data_raw_filtered %>%
    group_by(subject) %>%
    nest() %>%
    mutate(
      df = map(data, getresponses, names_to, names_pattern),
      total_time = map_dbl(data, gettime),
      order = map_dbl(data, ~ .x %>%
                        pull(order_condition) %>%
                        unique()),
      data = NULL
    ) %>%
    unnest(df) %>%
    pivot_wider(names_from = "dv", values_from = "value") %>%
    mutate(prolific = prolific %>%
             as.character()) %>%
    unite("participant", c(prolific, sona), na.rm = TRUE, remove = F) %>%
    filter(!str_detect(participant, "test")) %>%
    nest() %>%
    rowid_to_column("id") %>%
    unnest(data) %>%
    ungroup() %>%
    mutate(
      across(c(allocation, ranking), as.numeric),
      id = as.factor(id),
      order = as.factor(order),
      npv_amount = as.numeric(as.character(npv_amount))
    ) %>%
    mutate_if(is.character, as.factor)

  ## Order
  order_conditions <- list(
    c(1, 2, 3, 4),
    c(3, 4, 1, 2),
    c(4, 3, 2, 1),
    c(2, 1, 4, 3)
  )

  conditions_labels <- cross2(c("I", "E"), c("L", "H")) %>%
    map(~ str_c(.x, collapse = "")) %>%
    unlist()

  order_levels <- order_conditions %>%
    map(~ .x %>%
          map(~ conditions_labels[.x]) %>%
          unlist() %>%
          str_c(collapse = "_")) %>%
    set_names(c(1:4) %>% as.character()) %>%
    unlist()

  data_clean <-
    data_raw_tidy %>%
    mutate(
      order = recode(order, !!!order_levels),
      reliability_type_order = case_when(
        order == "IL_EL_IH_EH" | order == "IH_EH_IL_EL" ~ "impR_expR",
        order == "EH_IH_EL_IL" | order == "EL_IL_EH_IH" ~ "expR_impR"
      ),
      alignment_order = case_when(
        order == "IL_EL_IH_EH" | order == "EL_IL_EH_IH" ~ "lowA_highA",
        order == "EH_IH_EL_IL" | order == "IH_EH_IL_EL" ~ "highA_lowA"
      ),
      reliability_type_order = reliability_type_order %>% as.factor(),
      alignment_order = alignment_order %>%
        as.factor(),
      sample = "prolific_sona"
    )

  return(data_clean)
}
