##' @title Mutate post experiment
##' @param name
##' @param experiment_generator
##' @param thesis_project
##' @param experiment_number
##' @return
##' @author Shir Dekel
##' @export
execute_function_call_if_else <- function(name, experiment_generator, thesis_project,
                                          experiment_number) {
  if (experiment_generator == "jspsych") {
    execute_function_call(
      name,
      thesis_project,
      experiment_number
    ) %>%
      list()
  } else {
    NA
  }
}
