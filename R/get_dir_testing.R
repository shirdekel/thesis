##' @title Get testing directory
##' @param experiment
##' @return
##' @author Shir Dekel
##' @export
get_dir_testing <- function(experiment) {

  dir_testing <-
    here("inst", "jspsych", "testing", str_c("experiment", experiment))

  return(dir_testing)

}
