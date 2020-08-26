##' @title Get main experiment trials

##' @param projects_experiment3
##'
##' @param randomize_order
##'
##' @return
##' @author Shir Dekel
##' @export
get_main_experiment3 <- function(projects_experiment3, randomize_order) {

  instructions_experiment3 <-
    get_instructions_experiment4() %>%
    .[["naive"]] %>%
    .[["timeline"]]

  trials_experiment3 <-
    get_trials_experiment3(
      projects_experiment3,
      randomize_order
    )

  main_experiment3 <-
    instructions_experiment3 %>%
    append(
      trials_experiment3 %>%
        flatten()
    ) %>%
    build_timeline() %>%
    flatten()

  return(main_experiment3)

}
