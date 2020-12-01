##' @title Get condition allocation columns

##' @return
##' @author Shir Dekel
##' @export
get_columns_alignment_8 <- function() {
  columns_alignment_8 <-
    insert_property(
      subject = insert_javascript("jsPsych.randomization.randomID(15)"),
      thesis_project = "alignment",
      experiment = "experiment8",
      sample = "prolific",
      project_variation = insert_javascript("project_variation_condition"),
      alignment = insert_javascript("alignment_condition"),
      reliability_type = insert_javascript("reliability_type_condition"),
      business_name_variation = "business_name_variation_condition" %>%
        insert_javascript(),
      display_variation = "display_variation_condition" %>%
        insert_javascript(),
      current_project_display_order = insert_javascript("1"),
      PROLIFIC_PID = insert_javascript("urlvar.PROLIFIC_PID"),
      STUDY_ID = insert_javascript("urlvar.STUDY_ID"),
      SESSION_ID = insert_javascript("urlvar.SESSION_ID")
    )

  return(columns_alignment_8)
}
