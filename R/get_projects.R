##' @title Get projects

##' @param gambles
##'
##' @param outcome_dif
##'
##' @return
##' @author Shir Dekel
##' @export
get_projects <- function(gambles, outcome_dif) {

  project_name <- c(
    "Refinera"
  )
  project_type <- c(
    "oil well"
  )
  project_description <- get_project_description(
    gambles,
    project_name,
    project_type
  )
  project_input <- get_project_input(
    project_type,
    gambles
  )

  return(list(description = project_description,
              input = project_input))

}
