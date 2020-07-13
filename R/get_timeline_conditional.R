##' @title Get conditional timeline

##' @param trial
##'
##' @param condition_distribution
##'
##' @return
##' @author Shir Dekel
##' @export
get_timeline_conditional <- function(trial, condition_distribution, condition_presentation) {

  timeline_conditional <- build_timeline(trial) %>%
    display_if(fn_data_condition(condition_distribution == !!condition_distribution)) %>%
    build_timeline() %>%
    display_if(fn_data_condition(condition_presentation == !!condition_presentation))

  return(timeline_conditional)

}
