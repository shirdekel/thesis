##' @title Clean data for alignment 2

##' @param data_raw_filtered
##' @param test
##' @param prolific_filter
##' @param prolific_filter_label
##' @return
##' @author Shir Dekel
##' @export
clean_data_alignment_2 <- function(data_raw_filtered, experiment_number, test, prolific_filter, prolific_filter_label) {
  dv <- c("ranking", "allocation", "confidence", "justification")

  data_combined <-
      data_raw_filtered %>%
      rename_qualtrics() %>%
      split_pivot_join_experiment3(dv)

  data_clean <-
      data_combined %>%
      group_by(prolific) %>%
      mutate(date_rank = dense_rank(StartDate)) %>%
      filter(date_rank == 1) %>%
      ungroup() %>%
      add_id_column(prolific) %>%
      mutate(
          across(npvReliability, recode_reliability),
          across(alignment, recode_alignment),
          across(weighting, recode_weighting),
          across(age, recode_age),
          npv_amount = get_npv_amount(project),
          across(where(check_numeric), as.numeric),
          across(c(alignment, npvReliability), as.factor),
          sample = "prolific"
      ) %>%
      clean_forecast() %>%
      get_max_min_difference(npv_amount, alignment, npvReliability)

  return(data_clean)
}
