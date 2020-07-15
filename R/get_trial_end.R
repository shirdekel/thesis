##' .. content for \description{} (no empty lines) ..
##'
##' .. content for \details{} ..
##'
##' @title

##' @return
##' @author Shir Dekel
##' @export
get_trial_end <- function() {

  trial_end_html <- div(
    p("Press below to complete the experiment."),
    p("Thank you!")
  ) %>%
    as.character()

  trial_html_button_response(
    trial_end_html,
    choices = "End experiment"
  )

}
