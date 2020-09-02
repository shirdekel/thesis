##' @title screenshots E3

##' @param dir_testing
##'
##' @return
##' @author Shir Dekel
##' @export
get_screenshots_experiment3 <- function(dir_testing) {

  file_name_materials_experiment3 <-
    get_file_name_materials_experiment3()

  dir_materials_experiment3 <-
    here("inst", "materials", "experiment3")

  file_path_materials_experiment3 <-
    get_file_path_materials(dir_materials_experiment3, file_name_materials_experiment3)

  eval <-
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

  list(
    file_path_materials_experiment3,
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
