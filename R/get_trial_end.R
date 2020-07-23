##' @title End trial

##' @return
##' @author Shir Dekel
##' @export
get_trial_end <- function() {

  trial_end_html <- div(
    p("Press below to complete the experiment and save your data."),
    p("Thank you!")
  ) %>%
    as.character()

  trial_end <- trial_html_button_response(
    trial_end_html,
    choices = "End experiment"
  )

  return(trial_end)

}
