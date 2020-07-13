##' @title Get awareness trial

##' @param stimulus
##'
##' @return
##' @author Shir Dekel
##' @export
get_trial_awareness <- function(stimulus) {

  trial_awareness <- trial_html_button_response(
    stimulus = stimulus,
    choices = "Continue"
  )

  return(trial_awareness)

}
