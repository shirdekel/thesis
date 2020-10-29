##' @title Clean data for aggregation experiments

##' @param data_raw_filtered
##' @param test
##' @param prolific_filter
##' @param prolific_filter_label
##' @return
##' @author Shir Dekel
##' @export
clean_data_aggregation <- function(data_raw_filtered, experiment_number, test, prolific_filter, prolific_filter_label) {
  data_raw_prep <-
    data_raw_filtered %>%
    column_fromJSON(c(stage)) %>%
    # Might need to eventually include project_variation, but Experiment 2
    # doesn't have it.
    select(
      stage,
      time_elapsed,
      dateCreated,
      subject,
      experiment,
      sample,
      similarity,
      awareness,
      presentation,
      distribution,
      button_pressed,
      responses,
      question_order,
      thesis_project
    )

  data_combined <-
    tibble()

  if (experiment_number == 2) {
    names_to <-
      c("project", "outcome_positive", "outcome_dif", "probability_positive")
  } else {
    names_to <-
      c(
        "project", "detail", "outcome_positive", "outcome_dif",
        "probability_positive"
      )
  }

  if ("separate" %in% data_raw_prep$presentation) {
    data_combined <-
      data_raw_prep %>%
      clean_data_separate(names_to) %>%
      bind_rows(data_combined)
  }

  if ("joint" %in% data_raw_prep$presentation) {
    data_combined <-
      data_raw_prep %>%
      clean_data_joint(names_to) %>%
      bind_rows(data_combined)
  }

  data_combined <-
    data_raw_prep %>%
    clean_data_other("project_choice") %>%
    inner_join(data_combined, by = "subject")

  if ("portfolio_binary" %in% data_raw_prep$stage) {
    data_combined <-
      data_raw_prep %>%
      clean_data_portfolio_binary() %>%
      inner_join(data_combined, by = "subject")
  }

  data <-
    data_combined %>%
    clean_data_combined() %>%
    clean_data_finalise(test, prolific_filter, prolific_filter_label)

  return(data)
}
