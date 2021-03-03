##' @title Get loss probability

##' @return
##' @author Shir Dekel
##' @export
get_loss_prob <- function(outcome_aggregated, prob_aggregated) {

  # Get negative aggregated outcomes
  loss <-
    outcome_aggregated < 0

  # Sum corresponding probabilities
  prob_aggregated[loss] %>%
    sum()
}
