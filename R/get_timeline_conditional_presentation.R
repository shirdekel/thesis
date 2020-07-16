##' @title Get presentation conditional timeline

##' @return
##' @author Shir Dekel
##' @export
get_timeline_conditional_presentation <- function(trial, presentation) {

  timeline_conditional_presentation <- build_timeline(trial) %>%
    display_if(fn_data_condition(presentation == !!presentation))

  return(timeline_conditional_presentation)

}
