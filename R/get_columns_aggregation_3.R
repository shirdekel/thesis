##' @title Get condition allocation columns

##' @return
##' @author Shir Dekel
##' @export
get_columns_aggregation_3 <- function() {
  columns_aggregation_3 <-
    insert_property(
      subject = insert_javascript("jsPsych.randomization.randomID(15)") %>%
        list(),
      thesis_project = "aggregation",
      experiment = "experiment3",
      sample = "prolific",
      similarity = insert_javascript("similarity_condition") %>%
        list(),
      awareness = "naive",
      presentation = "separate",
      distribution = "absent",
      project_variation = insert_javascript("project_variation_condition") %>%
        list(),
      PROLIFIC_PID = insert_javascript("urlvar.PROLIFIC_PID") %>%
        list(),
      STUDY_ID = insert_javascript("urlvar.STUDY_ID") %>%
        list(),
      SESSION_ID = insert_javascript("urlvar.SESSION_ID") %>%
        list()
    ) %>%
    transpose()

  return(columns_aggregation_3)
}
