##' @title Get long projects distribution absent trial
##'
##' Each participant will see 20 project made up of the 10 domains, with two variations each. The two variations will be chosen at random, such that there will be 10 sets of pair variations.
##'
##' @param projects_experiment3
##'
##'
##' @return
##' @author Shir Dekel
##' @export
get_trials_experiment4 <- function(projects_experiment4) {

  # For within-industry variation
  project_variation <-
    1:length(projects_experiment4$description) %>%
    as.numeric()

  trials_experiment4 <-
    projects_experiment4 %>%
    append(list(project_variation)) %>%
    pmap(
      function(description_variation, input_variation, project_variation_value)
        get_trial_separate(
          project_description = description_variation,
          project_input = input_variation,
          distribution = "absent"
        ) %>%
        build_timeline() %>%
        display_if(fn_data_condition(project_variation == !!project_variation_value))
    )

  interstitials <-
    1:20 %>%
    map(
      ~ c(
        str_c(
          "You will now see project ",
          .,
          " of 20."
        ),
        "You will now see one project."
      )
    ) %>%
    imap(
      function(stimulus, position)
        stimulus %>%
        map(
          ~ trial_html_button_response(
            stimulus = .x,
            choices = "Continue",
            data = insert_property(
              stage = str_c(
                "interstitial",
                position)
            )
          )
        )
    )

  return(trials_experiment4)

}
