##' @title Get main experiment trials

##' @param projects_experiment4
##'
##' @return
##' @author Shir Dekel
##' @export
get_main_experiment4 <- function(projects_experiment4) {

  instructions_experiment4 <-
    get_instructions_experiment4()

  trials_experiment4 <-
    get_trials_experiment4(
      projects_experiment4
    )

  trial_test <-
    trial_html_button_response("test")

  main_experiment4 <-
    list(trial_test) %>%
    append(list(instructions_experiment4) %>%
             flatten()) %>%
    append(trials_experiment4 %>%
             flatten()) %>%
    build_timeline() %>%
    flatten()

  return(main_experiment4)

}
