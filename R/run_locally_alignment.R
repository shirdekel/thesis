##' @title Run alignment experiment locally
##'
##' Couldn't work out how to pass `here` or `file.path` an empty string

##' @return
##' @author Shir Dekel
##' @export
run_locally_alignment <- function(experiment_number = 8, test = TRUE) {
  if (test) {
    path <-
      here(
        "inst",
        "jspsych",
        "alignment",
        "testing",
        str_c("experiment", (experiment_number))
      )
  } else {
    path <-
      here(
        "inst",
        "jspsych",
        "alignment",
        str_c("experiment", (experiment_number))
      )
  }
  path %>%
    run_locally()
}
