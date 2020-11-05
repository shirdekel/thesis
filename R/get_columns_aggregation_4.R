##' @title Get condition allocation columns

##' @return
##' @author Shir Dekel
##' @export
get_columns_aggregation_4 <- function() {
  columns_aggregation_4 <-
    insert_property(
      subject = insert_javascript("jsPsych.randomization.randomID(15)") %>%
        list(),
      thesis_project = "aggregation",
      experiment = "experiment4",
      sample = "prolific",
      similarity = "low",
      awareness = insert_javascript("awareness_condition") %>%
        list(),
      presentation = "separate",
      distribution = "absent",
      project_variation = insert_javascript("project_variation_condition") %>%
        list(),
      current_project_choice_order = insert_javascript("1") %>%
        list(),
      PROLIFIC_PID = insert_javascript("urlvar.PROLIFIC_PID") %>%
        list(),
      STUDY_ID = insert_javascript("urlvar.STUDY_ID") %>%
        list(),
      SESSION_ID = insert_javascript("urlvar.SESSION_ID") %>%
        list()
    ) %>%
    transpose()

  return(columns_aggregation_4)
}
