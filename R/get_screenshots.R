##' @title Get screenshots

##' @param screenshot_components
##'
##' @param testing_experiment_directory
##'
##' @return
##' @author Shir Dekel
##' @export
get_screenshots <- function(testing_experiment_directory, screenshot_components) {
  if (is_empty(screenshot_components)) return(NA)

  file.path(testing_experiment_directory, "index.html") %>%
    webshot(
      file = screenshot_components$file_path_materials,
      eval = screenshot_components$webshot,
      # to fit alignment 8 tables
      vwidth = 992 * 1.5
    )
}
