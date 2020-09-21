##' @title Get screenshots

##' @param screenshot_components
##'
##' @param testing_experiment_directory
##'
##' @return
##' @author Shir Dekel
##' @export
get_screenshots <- function(testing_experiment_directory, screenshot_components) {

  screenshot_components %>%
    pmap(
      ~ file.path(testing_experiment_directory, "index.html") %>%
        webshot(
          file = .x,
          selector = "#jspsych-content",
          eval = .y
        )
    )

}
