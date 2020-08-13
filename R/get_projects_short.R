##' @title Get projects with short descriptions

##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
get_projects_short <- function(gambles) {

  project_name <- c(
    "Refinera"
  )
  project_type <- c(
    "oil well"
  )
  project_description_short <- get_project_description_short(
    gambles,
    project_name,
    project_type
  )
  project_input_short <- get_project_input(
    project_type,
    gambles
  )

  return(list(description = project_description_short,
              input = project_input_short))

}
