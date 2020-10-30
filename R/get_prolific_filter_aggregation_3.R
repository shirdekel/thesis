##' @title Get prolific filter for Aggregation Experiment 3

##' @return
##' @author Shir Dekel
##' @export
get_prolific_filter_aggregation_3 <- function() {
  prolific_filter_aggregation_3 <-
    list(
      # Risk aggregation 3
      c("datetime > '2020-09-17'", "datetime < '2020-09-18'"),
      # Risk aggregation 3b (high similarity condition top-up)
      c("datetime > '2020-09-18'", "datetime < '2020-10-29'",
        "similarity == 'high'"),
      # Risk aggregation 3c (low similarity condition top-up)
      c("datetime > '2020-09-18'", "datetime < '2020-10-29'",
        "similarity == 'low'"),
      # Risk aggregation 3d (low similarity condition top-up 2)
      c("datetime > '2020-10-30'", "similarity == 'low'"),
      # Risk aggregation 3e (high similarity condition top-up 2)
      c("datetime > '2020-10-30'", "similarity == 'high'")
    )

  return(prolific_filter_aggregation_3)
}
