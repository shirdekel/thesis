#' Clean Experiment 6
#'
#' Prolific sample
#'
#' @param data_raw
#'
#' @return A dataframe.
#'
clean_data_alignment_6 <- function(data_raw,
                                   experiment_number,
                                   data_clean_test,
                                   prolific_filter,
                                   prolific_filter_label) {

  dvName <- c("ranking", "allocation")

  data_prolific <-
    data_raw %>%
    cleanProlific()

  data_clean <-
    dvName %>%
    map(
      ~ select(data_prolific,
               contains(.x),
               variance,
               hint,
               "sex" = "Q25",
               "age" = "Q27"
      ) %>%
        mutate(id = row_number()) %>%
        pivot_longer(
          cols = -(variance:id),
          names_to = c("project"),
          names_prefix = "\\w*_",
          values_to = .x,
          values_drop_na = TRUE
        )) %>%
    reduce(left_join, by = c("variance", "hint", "sex", "age", "id", "project")) %>%
    mutate(
      variance = recode(variance, "1" = "Low", "2" = "High"),
      hint = recode(hint, "1" = "No Hint", "2" = "Salience Only", "3" = "Hint + Salience"),
      npv_amount = case_when(
        project == 1 ~ "700",
        project == 2 ~ "500",
        project == 3 ~ "100",
        project == 4 ~ "900",
        project == 5 ~ "300"
      ),
      id = as.factor(id),
      across(c(all_of(dvName), npv_amount, age), as.numeric),
    ) %>%
    mutate_if(is.character, as.factor) %>%
    mutate(sex = as.character(sex),
           sample = "prolific") %>%
    get_max_min_difference(npv_amount, variance, hint)

  return(data_clean)
}
