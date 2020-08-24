##' @title Get project choice paths

##' @param file_paths_materials_experiment3
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_choice_paths <- function(file_paths_materials_experiment3) {

  project_choice_paths <-
    get_project_components_experiment3() %>%
    .[["type"]] %>%
    str_replace_all(" ", "-") %>%
    str_c("project_choice_experiment3_",
          .,
          ".png") %>%
    file.path(file_paths_materials_experiment3, .)

  return(project_choice_paths)

}
