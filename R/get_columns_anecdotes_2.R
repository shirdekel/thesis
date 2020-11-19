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
          alignment = insert_javascript("alignment_condition"),
          anecdote = insert_javascript("anecdote_condition"),
          valence = insert_javascript("valence_condition"),
          PROLIFIC_PID = insert_javascript("urlvar.PROLIFIC_PID"),
          STUDY_ID = insert_javascript("urlvar.STUDY_ID"),
          SESSION_ID = insert_javascript("urlvar.SESSION_ID")
      )

  return(columns_anecdotes_2)
}
