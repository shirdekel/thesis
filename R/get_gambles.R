##' @title Get gambles

##' @param restricted_values
##'
##' @return
##' @author Shir Dekel
##' @export
get_gambles <- function(restricted_values) {

  loss_prob <- 1
  duplicate_restriction <- TRUE

  while ((loss_prob > 0.1) | any(duplicate_restriction)) {

    # Sample from the indexes of the restricted set (so that you can get the corresponding set of outcomes and probabilities)
    index_sample <- sample(1:length(restricted_values$outcome), 10)

    # Get a sample of outcomes
    outcome_positive_restricted_sample <- restricted_values$outcome[index_sample]

    # Get a sample of probabilities
    prob_positive_restricted_sample <- restricted_values$prob[index_sample]

    # Combine outcomes and probabilities and organise as list of pairs
    positive_combined <- list(outcome_positive_restricted_sample,prob_positive_restricted_sample) %>%
      transpose() %>%
      map(unlist)

    # Check for duplicate pairs
    duplicate_restriction <- duplicated(positive_combined)

    # Get a list of trial outcomes (positive and negative possibilities)
    outcome_combined <- list(outcome_positive_restricted_sample, outcome_positive_restricted_sample-restricted_values$outcome_dif) %>%
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
  restriction_values_restricted <- get_restriction_values(prob_positive_restricted_sample, outcome_positive_restricted_sample)

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
