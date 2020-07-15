##' @title Get portfolio trial
##' @param preamble_portfolio_distribution
##' @param form_options
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_portfolio <- function(preamble_portfolio_distribution, form_options) {


  trial_portfolio <- trial_survey_multi_choice(
    preamble = preamble_portfolio_distribution,
    questions = question_multi(
      "Regardless of what you chose previously, would you accept investing in all the projects that you saw?",
      options = form_options,
      name = "portfolio",
      required = TRUE)
  )

  return(trial_portfolio)

}
