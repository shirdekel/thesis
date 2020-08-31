##' @title Clean data

##' @param data_raw
##'
##' @param experiment
##'
##' @return
##' @author Shir Dekel
##' @export
clean_data <- function(data_raw, experiment) {

  if(experiment == "experiment2") {
    data_raw <-
      data_raw %>%
      rowwise() %>%
      mutate(
        across(c(experiment, sample, stage), ~ .x %>%
                 map_if(validate, fromJSON) %>%
                 unlist()),
        across(experiment, ~ .x %>%
                 recode("aggregation_exp2" = "experiment2")),
        thesis_project = "aggregation"
      ) %>%
      ungroup()
  }

  data_raw_prep <-
    data_raw %>%
    filter(experiment == experiment, thesis_project == "aggregation") %>%
    select(stage, time_elapsed, dateCreated, subject, experiment, sample, awareness, presentation, distribution, button_pressed, responses, question_order, thesis_project)

  data_combined <-
    tibble()

  if(experiment == "experiment2") {
    names_to <- c("project", "outcome_positive", "outcome_dif", "probability_positive")
  } else {
    names_to <- c("project", "detail", "outcome_positive", "outcome_dif", "probability_positive")
  }

  if("separate" %in% data_raw_prep$presentation) {
    data_combined <-
      data_raw_prep %>%
      clean_data_separate(names_to) %>%
      bind_rows(data_combined)
  }

  if("joint" %in% data_raw_prep$presentation) {
    data_combined <-
      data_raw_prep %>%
      clean_data_joint(names_to) %>%
      bind_rows(data_combined)
  }

  data_combined <-
    data_raw_prep %>%
    clean_data_other() %>%
    inner_join(data_combined, by = "subject")

  if("portfolio_binary" %in% data_raw_prep$stage) {
    data_combined <-
      data_raw_prep %>%
      clean_data_portfolio_binary() %>%
      inner_join(data_combined, by = "subject")
  }

  data <-
    data_combined %>%
    remove_empty("cols") %>%
    group_by(subject) %>%
    mutate(choice = recode(choice, "Yes" = 1, "No" = 0),
           datetime = dateCreated %>%
             dmy_hms(tz = "Australia/Sydney"),
           total_time = max(time_elapsed)/60000, # Milliseconds to minutes
           proportion = sum(choice)/length(choice),
           across(c(distribution, awareness, presentation), as.factor),
           across(where(check_numeric), as.numeric),
           gamble = str_c(
             "(",
             probability_positive,
             ", ",
             outcome_positive,
             "; ",
             1 - probability_positive,
             ", ",
             outcome_positive - outcome_dif,
             ")"
           ) %>%
             as.factor(),
           get_restriction_values(probability_positive, outcome_positive) %>%
             .[c("expected_value", "gain_loss_ratio")] %>%
             as_tibble()) %>%
    select(-c(question_order, time_elapsed, dateCreated, responses)) %>%
    ungroup() %>%
    nest_by(subject) %>%
    rowid_to_column("id") %>%
    unnest(data) %>%
    ungroup() %>%
    nest_by(subject, presentation, distribution, awareness, proportion) %>%
    unite("condition", presentation, distribution, awareness, remove = FALSE) %>%
    mutate(across(condition, as.factor)) %>%
    unnest(data)

  if("prolific" %in% colnames(data)) {
    data <-
      data %>%
      filter(!str_detect(prolific, "test1234"))

    get_prolific_id(data)
  }

  return(data)

}
