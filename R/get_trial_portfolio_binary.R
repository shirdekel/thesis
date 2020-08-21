##' @title Get portfolio trial - binary
##'
##' @param distribution
##' @param preamble
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_portfolio_binary <- function(preamble = "", distribution) {

  trial_portfolio_binary_html <- p(
    strong("Consider all the projects you saw. If you had to choose between investing in all of them, or investing in none of them, which would you choose?")
  ) %>%
    as.character()

  trial_portfolio_binary <- trial_html_button_response(
    stimulus = str_c(preamble, trial_portfolio_binary_html),
    choices = c("Invest in all of the projects", "Invest in none of the projects"),
    data = insert_property(stage = "portfolio_binary")
  ) %>%
    build_timeline() %>%
    display_if(fn_data_condition(distribution == !!distribution))


  return(trial_portfolio_binary)

}
