##' @title Get prolific filter for Aggregation Experiment 3

##' @return
##' @author Shir Dekel
##' @export
get_prolific_filter_aggregation_3 <- function() {
  prolific_filter_aggregation_3 <-
    list(
      c("datetime > '2020-09-17'", "datetime < '2020-09-18'"),
      c("datetime > '2020-09-18'", "similarity == 'low'"),
      c("datetime > '2020-09-18'", "similarity == 'high'")
    )

  return(prolific_filter_aggregation_3)
}
