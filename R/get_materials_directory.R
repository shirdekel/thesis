##' @title Get materials directory

##' @param thesis_project
##'
##' @param experiment_number
##'
##' @return
##' @author Shir Dekel
##' @export
get_materials_directory <- function(thesis_project, experiment_number) {
  materials_directory <-
    here(
      "inst",
      "materials",
      thesis_project,
      str_c(
        "experiment",
        experiment_number
      )
    )
  materials_directory %>%
    map(create_directory)

  return(materials_directory)
}
