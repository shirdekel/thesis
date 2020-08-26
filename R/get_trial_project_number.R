##' @title Project number follow up question

##' @param max
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_project_number <- function(max = 20) {

  trial_project_number_html <- get_survey_number(
    label_text = "In total, how many projects did you just see?",
    name = "project_number",
    max = max,
    suffix = "projects") %>%
    as.character()

  trial_project_number <- trial_generic(
    "survey-html-form",
    html = trial_project_number_html,
    data = insert_property(stage = "project_number")
  )

  return(trial_project_number)

}
