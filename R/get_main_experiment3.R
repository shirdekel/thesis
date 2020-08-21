##' @title Get main experiment trials

##' @param projects_experiment3
##'
##' @return
##' @author Shir Dekel
##' @export
get_main_experiment3 <- function(projects_experiment3) {

  instructions <-
    get_instructions()

  trial_naive <-
    get_trial_awareness("You will now see the projects.",
                        "naive")

  trials_experiment3 <-
    get_trials_experiment3(
      projects_experiment3
    )

  main_experiment3 <-
    list(
      instructions,
      trial_naive
    ) %>%
    append(
        trials_experiment3 %>%
        flatten()
    ) %>%
    build_timeline() %>%
    flatten()

  return(main_experiment3)

}
