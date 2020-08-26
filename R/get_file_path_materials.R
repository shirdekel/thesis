##' @title Get materials file paths
##'
##' @param file_name_materials
##' @param dir_materials
##'
##' @return
##' @author Shir Dekel
##' @export
get_file_path_materials <- function(dir_materials, file_name_materials) {

  file_path_materials <-
    file.path(
      dir_materials,
      str_c(
        file_name_materials,
        ".png"
      )
    )

  return(file_path_materials)

}
