##' @title Get main experiment trials

##' @param projects_experiment3
##'
##' @return
##' @author Shir Dekel
##' @export
get_main_experiment3 <- function(projects_experiment3) {

  instructions <-
    get_instructions()

  trials_experiment3 <-
    get_trials_experiment3(
      projects_experiment3
    )

  main_experiment3 <-
    list(
      instructions
    ) %>%
    append(
        trials_experiment3 %>%
        flatten()
    ) %>%
    build_timeline() %>%
    flatten()

  return(main_experiment3)

}
