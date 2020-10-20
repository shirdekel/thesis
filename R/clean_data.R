##' @title Clean data

##' @param data_raw_filtered
##' @param test
##' @param prolific_filter
##' @param prolific_filter_label
##' @return
##' @author Shir Dekel
##' @export
clean_data <- function(data_raw_filtered, experiment_number, test = FALSE, prolific_filter, prolific_filter_label) {
  data_raw_prep <-
    data_raw_filtered %>%
    rowwise() %>%
    # Need to convert stage from JSON. Making sure it comes out normal from
    # jaysire proved to be difficult because it unboxes also other elements.
    # Also might need to eventually include project_variation, but Experiment 2
    # doesn't have it.
    mutate(
      across(c(stage), ~ .x %>%
        map_if(validate, fromJSON) %>%
        unlist())
    ) %>%
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
    clean_data_other() %>%
    inner_join(data_combined, by = "subject")

  if ("portfolio_binary" %in% data_raw_prep$stage) {
    data_combined <-
      data_raw_prep %>%
      clean_data_portfolio_binary() %>%
      inner_join(data_combined, by = "subject")
  }

  data <-
    data_combined %>%
    clean_data_combined()

  if ("prolific" %in% colnames(data) & !test) {
    data <-
      data %>%
      filter(
        # Filter out testing data
        !str_detect(prolific, "test1234"),
        # Filter out data generated through Prolific preview (through personal PID)
        prolific != "5b878067600e3a000194db61"
      )

    list(prolific_filter, prolific_filter_label) %>%
      pmap(
        ~ data %>%
          get_prolific_id(.x, .y)
      )
  }

  data <-
    data %>%
    # Only remove duplicates now because sometimes the past study filtering is not set right in Prolific and you still need to credit the duplicates
    remove_duplicates() %>%
    # Assign IDs only after all filtering
    add_id_column(subject)

  return(data)
}
