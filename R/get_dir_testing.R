##' @title Get testing directory
##' @param experiment
##' @return
##' @author Shir Dekel
##' @export
get_dir_testing <- function(experiment) {

  dir_testing <-
    here("inst", "jspsych", "testing", experiment)

  if(!dir.exists(dir_testing)) {
    dir.create(dir_testing)
  }

  return(dir_testing)

}
