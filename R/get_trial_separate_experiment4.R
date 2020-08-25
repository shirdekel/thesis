##' @title Get separate condition timeline for E4

##' @param preamble
##'
##' @param project_description
##' @param form_options
##' @param project_input
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_separate_experiment4 <- function(preamble = "<p>Indicate below whether you would invest in the following:</p>", timeline_variable, form_options = c("Yes", "No"), awareness, project_variation_value ="") {

  trial_separate_main <- trial_survey_multi_choice(
    preamble = preamble,
    questions = question_multi(
      prompt = insert_variable("prompt"),
      options = form_options,
      name = insert_variable("name"),
      required = TRUE
    ),
    data = insert_property(stage = "project_choice")
  )

  if (awareness == "naive") {
    interstitial_stimulus <- "You will now see one project"
  } else if (awareness == "aware") {
    interstitial_stimulus <- insert_javascript(
      "function() {
        interstitial = 'You will now see project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20'
        return interstitial
        }"
    )
  }

  interstitial <-
    trial_html_button_response(
      stimulus =interstitial_stimulus,
      choices = "Continue",
      data = insert_property(
        stage = "interstitial"),
      on_finish = insert_javascript(
        "function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        }"
      )
    )

  trial_separate_experiment4 <-
    build_timeline(interstitial, trial_separate_main) %>%
    set_variables(prompt = timeline_variable$description,
                  name = timeline_variable$input) %>%
    set_parameters(randomize_order = TRUE) %>%
    build_timeline() %>%
    display_if(fn_data_condition(awareness == !!awareness)) %>%
    build_timeline() %>%
    display_if(fn_data_condition(project_variation == !!project_variation_value))

  return(trial_separate_experiment4)

}
