##' @title screenshots E3

##' @return
##' @author Shir Dekel
##' @export
get_screenshots_aggregation_3 <- function() {

  file_name_materials_experiment3 <-
    get_file_name_materials_experiment3()

  materials_directory_experiment3 <-
    file.path("inst", "materials", "aggregation", "experiment3")

  file_path_materials <-
    get_file_path_materials(materials_directory_experiment3, file_name_materials_experiment3)

  webshot_eval <-
    c(
      str_c(
        "this.click('#jspsych-instructions-next');",
        str_c(
          "this.click('.jspsych-btn');" %>%
            rep(3),
          collapse = "\n"
        ),
        sep = "\n"
      ),
      "this.click('#jspsych-instructions-next');" %>%
        rep(3),
      "this.click('#jspsych-survey-multi-choice-next');" %>%
        rep(10),
      "this.click('#jspsych-survey-html-form-next');" %>%
        rep(2),
      "this.click('#jspsych-html-button-response-button-0');"
    ) %>%
    slide(~ ., .before = Inf) %>%
    map_chr(
      ~ str_c(
        .,
        collapse = "\n"
      ) %>%
        str_c(
          "casper.thenOpen(this.getCurrentUrl() + '?similarity=low&project_variation=1', function() {", ., "});",
          sep = "\n"
        )
    )

  screenshot_components <-
    lst(
      file_path_materials,
      webshot_eval
    )

  return(screenshot_components)

}
