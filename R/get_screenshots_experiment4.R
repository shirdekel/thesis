##' @title Screenshots E4

##' @param gambles_20
##'
##' @return
##' @author Shir Dekel
##' @export
get_screenshots_experiment4 <- function(gambles_20) {

  # Establish E4 testing directory
  dir_testing <-
    get_dir_testing(experiment = 4)

  if(!dir.exists(dir_testing)) {
    dir.create(dir_testing)
  }

  # Create experiment files in testing directory without randomisation (so that we can get screenshots for all projects)
  get_experiment4(gambles_20, randomize_order = FALSE, path = dir_testing, pre_experiment = FALSE)

  file_name_materials_experiment4 <-
    get_file_name_materials_experiment4()

  dir_materials_experiment4 <-
    here("inst", "materials", "experiment4")

  file_path_materials_experiment4 <-
    get_file_path_materials(dir_materials_experiment4, file_name_materials_experiment4)

  casper_calls <-
    c(
      "this.click('#jspsych-instructions-next');" %>%
        rep(4),
      "this.click('#jspsych-survey-multi-choice-next');" %>%
        rep(20),
      "this.click('#jspsych-survey-html-form-next');" %>%
        rep(2),
      "this.click('#jspsych-html-button-response-button-0');"
    ) %>%
    slide(~ ., .before = Inf) %>%
    append(.[2], after = 2) %>% # instructions awareness
    append(.[5], after = 5) %>% # project 1 awareness
    map_chr(
      ~ str_c(
        .,
        collapse = "\n"
      ))

  awareness <-
    c(
      "naive" %>%
        rep(2),
      "aware" %>%
        rep(2),
      "naive",
      "aware" %>%
        rep(24)
    )

  eval <-
    list(
      casper_calls,
      awareness
    ) %>%
    pmap_chr(
      function(casper_calls, awareness)
          str_c(
            "casper.thenOpen(this.getCurrentUrl() + '?project_variation=1&awareness=",
            awareness,
            str_c(
              "', function() {", casper_calls, "});",
              sep = "\n"
            )
          )
    )

  get_screenshots(file_path_materials_experiment4, eval, dir_testing)

}
