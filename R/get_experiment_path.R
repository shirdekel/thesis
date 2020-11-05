##' @title Get experiment path

##' @param thesis_project
##'
##' @param experiment_number
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment_directory <- function(thesis_project, experiment_number) {
  experiment_directory <-
    here(
      "inst",
      "jspsych",
      thesis_project,
      str_c(
        "experiment",
        experiment_number
      )
    )
  experiment_directory %>%
    map(create_directory)

  return(experiment_directory)
}
