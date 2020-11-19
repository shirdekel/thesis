##' @title Run alignment experiment locally
##'
##' Couldn't work out how to pass `here` or `file.path` an empty string

##' @return
##' @author Shir Dekel
##' @export
run_locally_anecdotes <- function(experiment_number = 2, test = TRUE) {
  if (test) {
    path <-
      here(
        "inst",
        "jspsych",
        "anecdotes",
        "testing",
        str_c("experiment", (experiment_number))
      )
  } else {
    path <-
      here(
        "inst",
        "jspsych",
        "anecdotes",
        str_c("experiment", (experiment_number))
      )
  }
  path %>%
    run_locally()
}
