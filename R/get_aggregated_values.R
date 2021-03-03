##' @title Get aggregated values

##' @return
##' @author Shir Dekel
##' @export
##' @param outcome_positive
##' @param prob_positive
##' @param outcome_dif
##' @param sort
get_aggregated_values <- function(outcome_positive, prob_positive, outcome_dif, sort = TRUE) {

  # Get a list of trial outcomes (positive and negative possibilities)
  outcome_combined <-
    list(
      outcome_positive,
      outcome_positive - outcome_dif
    ) %>%
    transpose() %>%
    map(unlist)

  # Get aggregated outcomes
  outcome_aggregated <-
    expand.grid(outcome_combined) %>% # Get a data frame of all possible combinations of the trial outcomes
    rowSums() %>% # Sum the rows (to get the final state of what the outcome combinations would be)
    unique()

  if (sort) {
    ## Important so that the probabilities do not flip when plotted
    ## Aggregation 1 did not do this so need to have this option
    outcome_aggregated <-
      outcome_aggregated %>%
      sort()
  }

  # Get Poisson binomial distribution of the sample of probabilities
  prob_aggregated <-
    dpoibin(
      kk = 0:length(prob_positive),
      pp = prob_positive
    )

  lst(
    outcome_aggregated,
    prob_aggregated
  )
}
