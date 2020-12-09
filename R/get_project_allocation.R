##' @title Get project allocation

##' @return
##' @author Shir Dekel
##' @export
##' @param projects
##' @param randomize_order
get_project_allocation <- function(projects, randomize_order) {
  trial_projects <-
    trial_generic(
      "survey-html-form4",
      html = insert_variable("allocation_table"),
      data = insert_property(stage = "project_allocation"),
      preamble =
        "Carefully read through the project descriptions below and then do the following: 1. Rank the projects between 1 (highest) and 5 (lowest) in order of investment priority in the relevant \"Project Ranking\" row input; and 2. Allocate each project a percentage (a number between 0 and 100) of the total budget in the relevant \"Project Allocation\" row input."
    )

  interstitial <-
    trial_generic(
      "survey-html-form",
      html = insert_variable("interstitial"),
      data = insert_property(stage = "interstitial"),
    on_finish = insert_javascript(
        "function() {
        current_project_display_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_display_order').values[0];
        jsPsych.data.addProperties({
        current_project_display_order: current_project_display_order_value
        });
        }"
    )
    )

  interstitial_trials <-
    seq_len(2) %>%
    map(
      ~ get_interstitial(.x)
    )

  full_timeline <-
    build_timeline(
      interstitial,
      trial_projects
    ) %>%
    build_timeline() %>%
    set_variables(
      allocation_table = projects$data[[1]]$project_table,
      interstitial = interstitial_trials
    ) %>%
    set_parameters(randomize_order = randomize_order) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        reliability_type == !!projects$reliability_type
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        project_variation == !!projects$project_variation
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        alignment == !!projects$alignment
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        business_name_variation == !!projects$business_name_variation
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        display_variation == !!projects$display_variation
      )
    )


  return(full_timeline)
}
