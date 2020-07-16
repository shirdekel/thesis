##' @title Get conditional timeline

##' @param trial
##'
##' @param distribution
##'
##' @return
##' @author Shir Dekel
##' @export
get_timeline_conditional_distribution <- function(trial, distribution) {

  timeline_conditional_distribution <- build_timeline(trial) %>%
    display_if(fn_data_condition(distribution == !!distribution))

  return(timeline_conditional_distribution)

}
