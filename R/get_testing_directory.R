##' @title Get testing directory
##' @param experiment_number
##'
##' @param thesis_project
##'
##' @return
##' @author Shir Dekel
##' @export
get_testing_directory <- function(thesis_project, experiment_number) {

  testing_directory <-
    here(
      "inst",
      "jspsych",
      thesis_project,
      "testing",
      str_c(
        "experiment",
        experiment_number
      )
    )

  testing_directory %>%
      map(create_directory)

  return(testing_directory)

}
