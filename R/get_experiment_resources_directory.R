##' @title Get resources directory
##' @param thesis_project
##' @param experiment_number
##' @return
##' @author Shir Dekel
##' @export
get_experiment_resources_directory <- function(thesis_project,
                                               experiment_number) {
  experiment_resources_directory <-
    here(
      "inst",
      "experiment_resources",
      thesis_project,
      str_c(
        "experiment",
        experiment_number
      )
    )
  experiment_resources_directory %>%
    map(create_directory)

  return(experiment_resources_directory)
}
