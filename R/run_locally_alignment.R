##' @title Run alignment experiment locally

##' @return
##' @author Shir Dekel
##' @export
run_locally_alignment <- function(experiment_number) {
  here(
    "inst",
    "jspsych",
    "alignment",
    str_c("experiment", (experiment_number))
  ) %>%
    run_locally()
}
