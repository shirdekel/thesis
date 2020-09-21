##' @title Get experiment path

##' @param thesis_project
##'
##' @param experiment_number
##'
##' @return
##' @author Shir Dekel
##' @export
get_experiment_path <- function(thesis_project, experiment_number) {

  experiment_path <-
    here(
      "inst",
      "jspsych",
      thesis_project,
      str_c(
        "experiment",
        experiment_number
      )
    )

  return(experiment_path)
}
