##' @title Get main experiment trials

##' @param projects_experiment4
##'
##' @param randomize_order
##'
##' @return
##' @author Shir Dekel
##' @export
get_main_experiment4 <- function(projects_experiment4, randomize_order) {

  instructions_experiment4 <-
    get_instructions_experiment4() %>%
    unname()

  trials_experiment4 <-
    get_trials_experiment4(
      projects_experiment4,
      randomize_order
    )

  main_experiment4 <-
    instructions_experiment4 %>%
    c(
      trials_experiment4 %>%
        flatten()
    ) %>%
    build_timeline() %>%
    flatten()

  return(main_experiment4)

}
