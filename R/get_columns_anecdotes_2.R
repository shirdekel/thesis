##' @title Get condition allocation columns
##' @return
##' @author Shir Dekel
##' @export
get_columns_anecdotes_2 <- function() {
  columns_anecdotes_2 <-
    insert_property(
      subject = insert_javascript("jsPsych.randomization.randomID(15)"),
      thesis_project = "anecdotes",
      experiment = "experiment2",
      sample = "prolific",
      project_variation = insert_javascript("project_variation_condition"),
      anecdote_variation = insert_javascript("anecdote_variation_condition"),
      anecdote_between = insert_javascript("anecdote_between_condition"),
      current_project_display_order = insert_javascript("1"),
      PROLIFIC_PID = insert_javascript("urlvar.PROLIFIC_PID"),
      STUDY_ID = insert_javascript("urlvar.STUDY_ID"),
      SESSION_ID = insert_javascript("urlvar.SESSION_ID")
    )
  return(columns_anecdotes_2)
}
