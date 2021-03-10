##' @title Get gambles

##' @param thesis_project
##' @param experiment_number
##' @param restricted_values
##' @param gamble_n number of gambles
##' @return
##' @author Shir Dekel
##' @export
get_gambles <- function(thesis_project, experiment_number, restricted_values,
                        gamble_n) {
  if (thesis_project == "aggregation") {
    if (experiment_number != 1) {
      loss_prob <- 1
      duplicate_restriction <- TRUE

      while ((loss_prob > 0.1) | any(duplicate_restriction)) {

        # Sample from the indexes of the restricted set (so that you can get the
        # corresponding set of outcomes and probabilities)
        index_sample <-
          length(restricted_values$outcome) %>%
          seq_len() %>%
          sample(gamble_n)

        # Get a sample of outcomes
        outcome_positive_restricted_sample <-
          restricted_values$outcome[index_sample]

        # Get a sample of probabilities
        prob_positive_restricted_sample <-
          restricted_values$prob[index_sample]

        # Combine outcomes and probabilities and organise as list of pairs
        positive_combined <-
          list(
            outcome_positive_restricted_sample,
            prob_positive_restricted_sample
          ) %>%
          transpose() %>%
          map(unlist)

        # Check for duplicate pairs
        duplicate_restriction <-
          duplicated(positive_combined)

        aggregated_values <-
          get_aggregated_values(
            outcome_positive_restricted_sample,
            prob_positive_restricted_sample,
            restricted_values$outcome_dif
          )

        loss_prob <-
          get_loss_prob(
            aggregated_values$outcome_aggregated,
            aggregated_values$prob_aggregated
          )

        loss_prob_correct <- loss_prob

        outcome_positive <- outcome_positive_restricted_sample
        prob_positive <- prob_positive_restricted_sample
      }
    } else {
      aggregated_values <-
        get_aggregated_values(
          restricted_values$outcome,
          restricted_values$prob,
          restricted_values$outcome_dif,
          sort = FALSE
        )

      loss_prob <-
        get_loss_prob(
          aggregated_values$outcome_aggregated,
          aggregated_values$prob_aggregated
        )

      aggregated_values_correct <-
        get_aggregated_values(
          restricted_values$outcome,
          restricted_values$prob,
          restricted_values$outcome_dif
        )

      loss_prob_correct <-
        get_loss_prob(
          aggregated_values_correct$outcome_aggregated,
          aggregated_values_correct$prob_aggregated
        )

      outcome_positive <- restricted_values$outcome
      prob_positive <- restricted_values$prob
    }

    # Calculate expected value and gain/loss ratio of selected gambles
    restriction_values <-
      get_restriction_values(
        prob_positive,
        outcome_positive
      )

    # Combine values
    gambles <-
      lst(
        outcome_positive,
        prob_positive,
        loss_prob,
        loss_prob_correct
      ) %>%
      append(aggregated_values) %>%
      append(restriction_values)

    return(gambles)
  } else {
    return(NA)
  }
}
