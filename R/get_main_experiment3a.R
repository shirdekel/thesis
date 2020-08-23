##' @title Get main experiment trials

##' @param projects_experiment3
##'
##' @return
##' @author Shir Dekel
##' @export
get_main_experiment3a <- function(projects_experiment3) {

  instructions <-
    get_instructions()

  trials_experiment3a <-
    get_trials_experiment3a(
      projects_experiment3
    )

  main_experiment3a <-
    list(
      instructions
    ) %>%
    append(
        trials_experiment3a %>%
        flatten()
    ) %>%
    build_timeline() %>%
    flatten()

  return(main_experiment3a)

}
