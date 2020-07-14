##' @title Get conditional timeline

##' @param trial
##'
##' @param distribution
##' @param presentation
##'
##' @return
##' @author Shir Dekel
##' @export
get_timeline_conditional_distribution <- function(trial, distribution, presentation) {

  timeline_conditional_distribution <- build_timeline(trial) %>%
    display_if(fn_data_condition(distribution == !!distribution)) %>%
    build_timeline() %>%
    display_if(fn_data_condition(presentation == !!presentation))

  return(timeline_conditional_distribution)

}
