##' @param experiment_number
##'
##' @title Get testing directory
##' @return
##' @author Shir Dekel
##' @export
get_dir_testing <- function(experiment_number) {

  dir_testing <-
    here("inst", "jspsych", "testing", str_c("experiment", experiment_number))

  if(!dir.exists(dir_testing)) {
    dir.create(dir_testing)
  }

  return(dir_testing)

}
