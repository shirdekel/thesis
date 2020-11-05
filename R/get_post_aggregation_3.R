##' @title Get post experiment trials E3

##' @return
##' @author Shir Dekel
##' @export
get_post_aggregation_3 <- function() {

  trial_project_expectation <-
    get_trial_project_expectation()

  trial_project_number <-
    get_trial_project_number()

  trial_portfolio_binary <-
    get_trial_portfolio_binary(
      distribution = "absent"
    )

  trial_portfolio_number <-
    get_trial_portfolio_number(
      distribution = "absent"
    )

  debrief <-
    get_debrief()

  trial_end <-
    get_trial_end()

  post_aggregation_3 <-
    build_timeline(
      trial_project_expectation,
      trial_project_number,
      trial_portfolio_binary,
      trial_portfolio_number,
      debrief,
      trial_end
    )

  return(post_aggregation_3)

}
