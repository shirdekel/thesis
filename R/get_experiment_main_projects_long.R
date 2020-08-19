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

  preamble_distribution_absent <-
    p("Indicate below whether you would invest in the following:") %>%
    as.character()

  trial_distribution_absent <-
    get_trial_distribution_absent(
      projects_long,
      preamble_distribution_absent
    )

  experiment_main_projects_long <-
    list(
      instructions,
      trial_naive
    ) %>%
    append(
      list(
        trial_distribution_absent$joint$similarity_low,
        trial_distribution_absent$joint$similarity_high,
        trial_distribution_absent$separate$similarity_low,
        trial_distribution_absent$separate$similarity_high
      ) %>%
        flatten()
    ) %>%
    build_timeline() %>%
    flatten()

  return(experiment_main_projects_long)

}
