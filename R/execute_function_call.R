##' @title Execute function call
##' @param name
##' @param thesis_project
##' @param experiment_number
##' @return
##' @author Shir Dekel
##' @export
execute_function_call <- function(name, thesis_project, experiment_number) {
  str_c("get",
    name,
    thesis_project,
    experiment_number,
    sep = "_"
  ) %>%
    exec()
}
