##' @title End trial

##' @return
##' @author Shir Dekel
##' @export
get_trial_end <- function() {

  trial_end_html <- div(
    p("Press below to complete the experiment."),
    p("It will take a few seconds to save your data, after which you will be automatically redirected back to Prolific."),
    p("Thank you!")
  ) %>%
    as.character()

  trial_end <- trial_html_button_response(
    trial_end_html,
    choices = "End experiment",
    data = insert_property(stage = "end")
  )

  return(trial_end)

}
