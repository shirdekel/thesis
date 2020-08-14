##' @title Get long projects
##'
##' @param gambles
##' @return
##' @author Shir Dekel
##' @export
get_projects_long <- function(gambles) {

  detail <-
    get_project_detail_long_detail()

  project_detail_long <-
    detail %>%
    transpose() %>%
    map(get_project_detail_long)


  project_description <-
    project_detail_long %>%
    map(
      ~ gambles %>%
        get_project_description_long(.x)
    )

  project_input <-
    get_project_input(
      project_detail_long$type,
      gambles
    )

  return(list(description = project_description,
              input = project_input))

}
