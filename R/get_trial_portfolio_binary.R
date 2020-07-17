##' @title Get portfolio trial - binary
##'
##' @param preamble_portfolio_distribution
##' @param distribution
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_portfolio_binary <- function(preamble_portfolio_distribution, distribution) {

  trial_portfolio_binary_html <- p(
    strong("Consider all the projects you saw. If you had to choose between investing in all of them, or investing in none of them, which would you choose?")
  ) %>%
    as.character()

  trial_portfolio_binary <- trial_html_button_response(
    stimulus = str_c(preamble_portfolio_distribution, trial_portfolio_binary_html),
    choices = c("Invest in all of the projects", "Invest in none of the projects")
  ) %>%
    build_timeline() %>%
    display_if(fn_data_condition(distribution == !!distribution))


  return(trial_portfolio_binary)

}
