##' @title Get prolific filter for Aggregation Experiment 4

##' @return
##' @author Shir Dekel
##' @export
get_prolific_filter_aggregation_4 <- function() {
  prolific_filter_aggregation_4 <-
    list(
      c(
        "datetime > '2020-07-28'",
        "datetime < '2020-10-02'",
        # Participants from Experiment 3 that used the Experiment 4 link
        "!prolific %in% c('5f3d8efea2dc2616ff46b697', '5dd4a7c9c0823f494b158668', '5858c6178604ae000165e66a')"
      ),
      c(
        "datetime > '2020-10-02'",
        "awareness == 'naive'"
      ),
      c(
        "datetime > '2020-10-02'",
        "awareness == 'aware'"
      )
    )

  return(prolific_filter_aggregation_4)
}
