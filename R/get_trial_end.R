##' @title End trial

##' @return
##' @author Shir Dekel
##' @export
get_trial_end <- function() {

  trial_end_html <- div(
    p("Press below to complete the experiment."),
    p("The next page will be a blank white screen. It will take approximately 10 seconds to save your data, after which you will be automatically redirected back to Prolific. Please do not exit until you have been redirected back to Prolific."),
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
