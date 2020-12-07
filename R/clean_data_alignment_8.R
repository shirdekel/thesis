##' @title Clean data for alignment 8

##' @param data_raw_filtered
##' @param test
##' @param prolific_filter
##' @param prolific_filter_label
##' @return
##' @author Shir Dekel
##' @export
clean_data_alignment_8 <- function(data_raw_filtered, experiment_number, test, prolific_filter, prolific_filter_label) {
  data_raw_jspsych_columns_unselected <-
    data_raw_filtered %>%
    unselect_jspysch_columns() %>%
    rowwise() %>%
    mutate(
      across(stage, fromJSON)
    )

  data_allocation <-
    data_raw_jspsych_columns_unselected %>%
    clean_project_allocation()  %>%
    pivot_intrinsic_features() %>%
    pivot_dv()

    data_combined <-
      data_raw_jspsych_columns_unselected %>%
      clean_data_other("project_allocation") %>%
      inner_join(data_allocation, by = "subject")

  data <-
    data_combined %>%
    mutate(
      datetime = dateCreated %>%
        dmy_hms(tz = "Australia/Sydney"),
      total_time = max(time_elapsed)/60000, # Milliseconds to minutes
      across(
        c(reliability_amount,
          reliability_type,
          alignment),
        as.factor),
      across(where(check_numeric), as.numeric)
    ) %>%
  select(-c(time_elapsed, dateCreated)) %>%
    clean_data_finalise_alignment_8(test, prolific_filter, prolific_filter_label)

  return(data)
}
