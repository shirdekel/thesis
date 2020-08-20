##' @title Get main experiment trials

##' @param projects_long
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment_main_projects_long <- function(projects_long) {

  instructions <-
    get_instructions()

  trial_naive <-
    get_trial_awareness("You will now see the projects.",
                        "naive")

  trial_distribution_absent <-
    get_trial_distribution_absent(
      projects_long
    )

  experiment_main_projects_long <-
    list(
      instructions,
      trial_naive
    ) %>%
    append(
      list(
        # trial_distribution_absent$separate$similarity_low,
        trial_distribution_absent$separate$similarity_high[[1]][[1]]
      )
        # flatten() %>%
        # flatten()
    ) %>%
    build_timeline() %>%
    flatten()

  return(experiment_main_projects_long)

}
