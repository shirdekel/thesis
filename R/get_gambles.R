##' @title Get gambles

##' @param outcome_positive_restricted
##'
##' @param prob_positive_restricted
##' @param outcome_dif
##' @param loss_prob_restriction
##'
##' @return
##' @author Shir Dekel
##' @export
get_gambles <- function(outcome_positive_restricted, prob_positive_restricted, loss_prob_restriction, outcome_dif) {

  loss_prob <- 1
  duplicate_restriction <- TRUE

  while ((loss_prob > loss_prob_restriction) | any(duplicate_restriction)) {

    # Sample from the indexes of the restricted set (so that you can get the corresponding set of outcomes and probabilities)
    index_sample <- sample(1:length(outcome_positive_restricted), 10)

    # Get a sample of outcomes
    outcome_positive_restricted_sample <- outcome_positive_restricted[index_sample]

    # Get a sample of probabilities
    prob_positive_restricted_sample <- prob_positive_restricted[index_sample]

    # Combine outcomes and probabilities and organise as list of pairs
    positive_combined <- list(outcome_positive_restricted_sample,prob_positive_restricted_sample) %>%
      transpose() %>%
      map(unlist)

    # Check for duplicate pairs
    duplicate_restriction <- duplicated(positive_combined)

    # Get a list of trial outcomes (positive and negative possibilities)
    outcome_combined <- list(outcome_positive_restricted_sample, outcome_positive_restricted_sample-outcome_dif) %>%
      transpose() %>%
      map(unlist)

    # Get aggregated outcomes
    outcome_aggregated <- expand.grid(outcome_combined) %>% # Get a data frame of all possible combinations of the trial outcomes
      rowSums() %>% # Sum the rows (to get the final state of what the outcome combinations would be)
      unique() %>%
      sort() # Important so that the probabilities do not flip when plotted

    # Get Poisson binomial distribution of the sample of probabilities
    prob_aggregated <- dpoibin(kk=0:length(prob_positive_restricted_sample),
                                   pp = prob_positive_restricted_sample)

    # Get negative aggregated outcomes
    loss <- outcome_aggregated < 0

    # Sum corresponding probabilities
    loss_prob <- prob_aggregated[loss] %>%
      sum()
  }

  # Calculate expected value and gain/loss ratio of selected gambles
  restriction_values_restricted <- get_restriction_values(prob_positive_restricted_sample, outcome_positive_restricted_sample, outcome_dif)

  # Combine values
  gambles <- list(
    outcome_positive_restricted_sample = outcome_positive_restricted_sample,
    prob_positive_restricted_sample = prob_positive_restricted_sample,
    prob_aggregated = prob_aggregated,
    outcome_aggregated = outcome_aggregated,
    loss_prob = loss_prob
  ) %>%
    append(restriction_values_restricted)

  return(gambles)

}
