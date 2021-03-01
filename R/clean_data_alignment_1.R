#' Clean Experiment 1
#'
#' @param data_raw
#'
#' @return A dataframe.
#'
clean_data_alignment_1 <- function(data_raw,
                                   experiment_number,
                                   data_clean_test,
                                   prolific_filter,
                                   prolific_filter_label) {

  data_raw_prolific <-
    data_raw %>%
    cleanProlific()

  dvName <- c("allocation", "confidence")
  highA <- c("17", "18")
  lowA <- c("70", "71")

  questionVals <-
    list(highA,
         lowA) %>%
    pmap(
      ~ list(
        prefix = "Q",
        align = c(.x, .y),
        connect = "_",
        project = 1:5
      )
    ) %>%
    map(
      ~ .x %>%
        cross() %>%
        map_chr(~ .x %>%
                  str_c(collapse = ""))) %>%
    map(~ select(
      data_raw_prolific, all_of(.x),
      "npvReliability" = "allocation",
      "sex" = "Q79",
      "age" = "Q75"
    ) %>%
      mutate(id = row_number())) %>%
    set_names(dvName)

  data_clean <-
    list(dvName, highA, lowA) %>%
    pmap(function(a, b, c) {
      select(questionVals[[a]],
             "high" = contains(b),
             "low" = contains(c),
             .data$npvReliability,
             .data$id,
             .data$sex,
             .data$age
      )
    }) %>%
    map2(dvName,
         ~ pivot_longer(.x,
                        cols = -(npvReliability:age),
                        names_to = c("alignment", "project"),
                        names_pattern = "(high|low)(.)",
                        values_to = .y
         )) %>%
    reduce(left_join, by = c("npvReliability", "id", "sex", "age", "alignment", "project")) %>%
    mutate(
      npvReliability = recode(npvReliability, "1" = "high", "2" = "low"),
      project.npv = case_when(
        project == 1 ~ "700",
        project == 2 ~ "500",
        project == 3 ~ "100",
        project == 4 ~ "900",
        project == 5 ~ "300"
      ),
      across(c(all_of(dvName), project.npv, age), as.numeric),
      id = as.factor(id)
    ) %>%
    mutate_if(is.character, as.factor) %>%
    mutate(sex = as.character(sex),
           sample = "prolific") %>%
    get_max_min_difference(project.npv, alignment, npvReliability)

  return(data_clean)
}
