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

  trial_distribution_absent <-
    get_trial_distribution_absent(
      projects_long
    )

  main_experiment3 <-
    list(
      instructions,
      trial_naive
    ) %>%
    append(
      list(
        trial_distribution_absent$separate$similarity_low,
        trial_distribution_absent$separate$similarity_high
      ) %>%
        flatten()
    ) %>%
    build_timeline() %>%
    flatten()

  return(main_experiment3)

}
