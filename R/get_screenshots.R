##' @title Get screenshots

##' @param file_path_materials
##'
##' @param eval
##' @param dir_testing_experiment
##'
##' @return
##' @author Shir Dekel
##' @export
get_screenshots <- function(file_path_materials, eval, dir_testing_experiment) {

  list(
    file_path_materials,
    eval
  ) %>%
    pmap(
      ~ file.path(dir_testing_experiment, "index.html") %>%
        webshot(
          file = .x,
          selector = "#jspsych-content",
          eval = .y
        )
    )

}
