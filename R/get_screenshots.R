##' @title Get screenshots

##' @param file_path_materials
##'
##' @param dir_testing
##' @param eval
##'
##' @return
##' @author Shir Dekel
##' @export
get_screenshots <- function(file_path_materials, eval, dir_testing) {

  list(
    file_path_materials,
    eval
  ) %>%
    pmap(
      ~ file.path(dir_testing, "experiment", "index.html") %>%
        webshot(
          file = .x,
          selector = "#jspsych-content",
          eval = .y
        )
    )

}
