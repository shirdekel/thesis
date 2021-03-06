##' @title Get separate condition timeline

##' @param preamble
##'
##' @param project_description
##' @param form_options
##' @param project_input
##' @param distribution
##' @param randomize_order
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_separate <- function(preamble = "<p>Indicate below whether you would invest in the following:</p>", project_description, form_options = c("Yes", "No"), project_input, distribution, randomize_order) {

  trial_separate <- trial_survey_multi_choice(
    preamble = preamble,
    questions = question_multi(
      prompt = insert_variable("prompt"),
      options = form_options,
      name = insert_variable("name"),
      required = TRUE
    ),
    data = insert_property(stage = "project_choice")
  ) %>%
    build_timeline() %>%
    set_variables(prompt = project_description,
                  name = project_input) %>%
    set_parameters(randomize_order = randomize_order) %>%
    build_timeline() %>%
    display_if(fn_data_condition(distribution == !!distribution)) %>%
    build_timeline() %>%
    display_if(fn_data_condition(presentation == "separate"))

  return(trial_separate)

}
