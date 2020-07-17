##' @title Get portfolio trial - number
##'
##' @param preamble_portfolio_distribution
##' @param distribution
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_portfolio_number <- function(preamble_portfolio_distribution, distribution) {

  trial_portfolio_number_html <- get_survey_number(
    label_text = p(
      strong("If you could choose to invest in a certain number of the projects you saw, how many would you invest in?")
    ),
    name = "portfolio_number",
    max = 20,
    suffix = "projects") %>%
    as.character()

  trial_portfolio_number <- trial_generic(
    "survey-html-form",
    html = str_c(preamble_portfolio_distribution, trial_portfolio_number_html)
  ) %>%
    build_timeline() %>%
    display_if(fn_data_condition(distribution == !!distribution))

  return(trial_portfolio_number)

}
