##' @title Get conditional timeline with awareness

##' @param trial
##'
##' @param awareness
##' @param presentation
##'
##' @return
##' @author Shir Dekel
##' @export
get_timeline_conditional_awareness <- function(trial, awareness, presentation) {

  timeline_conditional_awareness <- build_timeline(trial) %>%
    display_if(fn_data_condition(awareness == !!awareness))

  return(timeline_conditional_awareness)

}
