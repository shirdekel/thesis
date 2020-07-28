##' @title Get descriptives
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_descriptives <- function(data) {

  allocation <- data %>%
    nest_by(subject, awareness, presentation, distribution) %>%
    ungroup() %>%
    count(awareness, presentation, distribution) %>%
    adorn_totals("row")

  time_average <- data %>%
    pull(total_time) %>%
    mean()

  descriptives <- list(allocation = allocation,
                       time_average = time_average)

  return(descriptives)

}
