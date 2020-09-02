##' @title screenshots E2

##' @param dir_testing
##'
##' @return
##' @author Shir Dekel
##' @export
get_screenshots_experiment2 <- function(dir_testing) {

  file_name_materials_experiment2 <-
    get_file_name_materials_experiment2()

  dir_materials_experiment2 <-
    here("inst", "materials", "experiment2")

  if(!dir.exists(dir_materials_experiment2)) {
    dir.create(dir_materials_experiment2)
  }

  file_path_materials_experiment2 <-
    get_file_path_materials(
      dir_materials_experiment2,
      file_name_materials_experiment2
      )

  # eval <-
  #   c(
  #     "this.click('#jspsych-instructions-next');" %>%
  #       rep(4),
  #     "this.click('#jspsych-html-button-response-button-0');",
  #     "this.click('#jspsych-survey-multi-choice-next');" %>%
  #       rep(10),
  #     "this.click('#jspsych-survey-html-form-next');",
  #     "this.click('#jspsych-html-button-response-button-0');"
  #   ) %>%
  #   slide(~ ., .before = Inf) %>%
  #   map_chr(
  #     ~ str_c(
  #       .,
  #       collapse = "\n"
  #     ) %>%
  #       str_c(
  #         "casper.thenOpen(this.getCurrentUrl() + '?similarity=low&project_variation=1', function() {", ., "});",
  #         sep = "\n"
  #       )
  #   )
  #
  # list(
  #   file_path_materials_experiment2,
  #   eval
  # ) %>%
  #   pmap(
  #     ~ file.path(dir_testing, "experiment", "index.html") %>%
  #       webshot(
  #         file = .x,
  #         selector = "#jspsych-content",
  #         eval = .y
  #       )
  #   )

}
