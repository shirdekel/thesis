##' @title Run aggregation experiment locally

##' @return
##' @author Shir Dekel
##' @export
run_locally_aggregation <- function(experiment_number) {
  here(
    "inst",
    "jspsych",
    "aggregation",
    str_c("experiment", (experiment_number))
  ) %>%
    run_locally()
}
