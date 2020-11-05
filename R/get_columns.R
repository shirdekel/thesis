##' @title Get condition allocation columns

##' @param thesis_project
##'
##' @param experiment_number
##'
##' @return
##' @author Shir Dekel
##' @export
get_columns <- function(thesis_project, experiment_number) {
  columns <-
    str_c("get_columns", thesis_project, experiment_number, sep = "_") %>%
    exec()
  return(columns)
}
