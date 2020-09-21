##' @title Get materials file paths
##'
##' @param file_name_materials
##' @param materials_directory
##'
##' @return
##' @author Shir Dekel
##' @export
get_file_path_materials <- function(materials_directory, file_name_materials) {

  file_path_materials <-
    file.path(
      materials_directory,
      str_c(
        file_name_materials,
        ".png"
      )
    )

  return(file_path_materials)

}
