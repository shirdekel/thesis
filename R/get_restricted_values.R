##' @title Get restriction

##' @param experiment_number
##'
##' @param thesis_project
##'
##' @return
##' @author Shir Dekel
##' @export
get_restricted_values <- function(thesis_project, experiment_number) {

  if (thesis_project == "aggregation") {

    prob_positive_seq <-
      get_prob_positive_seq()

    if(experiment_number == 4) {
      outcome_positive_seq <-
        seq(from = 100, to = 200, by = 5)
    } else {
      outcome_positive_seq <-
        seq(from = 100, to = 200, by = 10)
    }

    size <- 10000

    prob_positive_sample <-
      prob_positive_seq %>%
      sample(size = size, replace = TRUE)

    outcome_positive_sample <-
      outcome_positive_seq %>%
      sample(size = size, replace = TRUE)

    restriction_values <-
      get_restriction_values(
        prob_positive_sample,
        outcome_positive_sample
      )

    gain_loss_ratio_restriction <- 2.25

    restriction <-
      get_restriction(
        restriction_values,
        gain_loss_ratio_restriction
      )

    outcome_positive_restricted <-
      outcome_positive_sample[restriction]

    prob_positive_restricted <-
      prob_positive_sample[restriction]

    restricted_values <-
      list(
        outcome = outcome_positive_restricted,
        prob = prob_positive_restricted,
        outcome_dif = restriction_values$outcome_dif
      )

    return(restricted_values)
  } else {
    return(NA)
  }

}
