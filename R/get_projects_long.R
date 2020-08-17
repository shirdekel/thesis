##' @title Get long projects
##'
##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
get_projects_long <- function(gambles) {

  label_similarity <- c("similarity_low", "similarity_high")

  project_long_detail_components <-
    get_project_long_detail_components()

  project_long_detail <-
    get_project_long_detail(project_long_detail_components)

  project_long_components <-
    list(
      get_project_long_components(),
      get_project_long_components() %>%
        transpose() %>%
        simplify()
    ) %>%
    set_names(label_similarity)


  project_description_long_similarity <-
    get_project_description_long_similarity(gambles,
                                            project_long_detail,
                                            project_long_components,
                                            label_similarity)

  project_input_long_similarity <-
    get_project_input_long_similarity(gambles,
                                      project_long_detail_components,
                                      project_long_components,
                                      label_similarity)

  projects_long <-
    list(
      description = project_description_long_similarity,
      input = project_input_long_similarity
    )

  return(projects_long)

}
