##' @title Get separate condition timeline

##' @param preamble
##'
##' @param project_description
##' @param form_options
##' @param project_input
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_separate <- function(preamble, project_description, form_options, project_input) {

  trial_separate <- trial_survey_multi_choice(
    preamble = preamble,
    questions = question_multi(
      prompt = insert_variable("prompt"),
      options = form_options,
      name = insert_variable("name"),
      required = TRUE
    )
  ) %>%
    build_timeline() %>%
    set_variables(prompt = project_description,
                  name = project_input) %>%
    set_parameters(randomize_order = TRUE)

  return(trial_separate)

}
