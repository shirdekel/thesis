##' @title Get condition allocation columns

##' @return
##' @author Shir Dekel
##' @export
get_columns_alignment_8 <- function() {
  columns_alignment_8 <-
    insert_property(
      subject = insert_javascript("jsPsych.randomization.randomID(15)") %>%
        list(),
      thesis_project = "alignment",
      experiment = "experiment8",
      sample = "prolific",
      project_variation = insert_javascript("project_variation_condition") %>%
        list(),
      alignment = insert_javascript("alignment_condition") %>%
        list(),
      reliability_type = insert_javascript("reliability_type_condition") %>%
        list(),
      business_name_variation = "business_name_variation_condition" %>%
        insert_javascript() %>%
        list(),
      display_variation = "display_variation_condition" %>%
        insert_javascript() %>%
        list(),
      PROLIFIC_PID = insert_javascript("urlvar.PROLIFIC_PID") %>%
        list(),
      STUDY_ID = insert_javascript("urlvar.STUDY_ID") %>%
        list(),
      SESSION_ID = insert_javascript("urlvar.SESSION_ID") %>%
        list()
    ) %>%
    transpose()

  return(columns_alignment_8)
}
