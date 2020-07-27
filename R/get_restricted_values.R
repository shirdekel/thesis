##' @title Get restriction

##' @return
##' @author Shir Dekel
##' @export
get_restricted_values <- function() {

  prob_positive_seq <- get_prob_positive_seq()
  outcome_positive_seq <- get_outcome_positive_seq()
  size <- 10000
  prob_positive_sample <- prob_positive_seq %>%
    sample(size = size, replace = TRUE)
  outcome_positive_sample <- outcome_positive_seq %>%
    sample(size = size, replace = TRUE)
  restriction_values <- get_restriction_values(prob_positive_sample, outcome_positive_sample)
  gain_loss_ratio_restriction <- 2.25
  restriction <- get_restriction(restriction_values, gain_loss_ratio_restriction)
  outcome_positive_restricted <- outcome_positive_sample[restriction]
  prob_positive_restricted <- prob_positive_sample[restriction]

  return(list(outcome = outcome_positive_restricted,
              prob = prob_positive_restricted,
              outcome_dif = restriction_values$outcome_dif))

}
