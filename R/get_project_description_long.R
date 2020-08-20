##' @title Get long project descriptions
##'
##' @param gambles
##' @param project_long_components
##' @param project_long_detail
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_description_long <- function(gambles, project_long_components, project_long_detail) {

  project_long_section <-
    get_project_long_sections(
      gambles,
      project_long_components,
      project_long_detail
    ) %>%
    transpose() %>%
    map(unlist)

  project_description_long <-
    project_long_section %>%
    map(shuffle_project_long_section)

  return(project_description_long)

}
