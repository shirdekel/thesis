##' @title Get post experiment trials E4

##' @return
##' @author Shir Dekel
##' @export
get_post_experiment4 <- function() {

  trial_project_expectation <-
    get_trial_project_expectation()

  trial_project_number <-
    get_trial_project_number(max = 40)

  trial_portfolio_binary <-
    get_trial_portfolio_binary()

  trial_portfolio_number <-
    get_trial_portfolio_number(project_number = 20)

  debrief <-
    get_debrief()

  trial_end <-
    get_trial_end()

  post_experiment4 <-
    build_timeline(
      trial_project_expectation,
      trial_project_number,
      trial_portfolio_binary,
      trial_portfolio_number,
      debrief,
      trial_end
    )

  return(post_experiment4)

}
