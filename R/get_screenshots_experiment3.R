##' @title screenshots E3

##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
get_screenshots_experiment3 <- function(gambles) {

  # Establish E3 testing directory
  dir_testing <-
    here("inst", "jspsych", "testing", "experiment3")

  # Create experiment files in testing directory without randomisation (so that we can get screenshots for all projects)
  get_experiment3(gambles, randomize_order = FALSE, path = dir_testing)

  # Establish E3 materials directory
  file_paths_materials_experiment3 <-
    here("inst", "materials", "experiment3")

  # Clean project type names
  project_type_clean <-
    get_project_components_experiment3() %>%
    .[["type"]] %>%
    str_replace_all(" ", "-")

  # Get target screenshot file paths
  file_path_screenshots <-
    c(
      str_c(
        "instructions",
        1:3
      ),
      str_c(
        "project_choice",
        project_type_clean,
        sep = "_"
      )
    )

  eval <-
    c(
      "",
      "this.click('#jspsych-instructions-next');" %>%
        rep(3),
      "this.click('#jspsych-survey-multi-choice-next');" %>%
        rep(9)
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
    file_path_screenshots,
    eval
  ) %>%
    pmap(
      ~ file.path(dir_testing, "experiment", "index.html") %>%
        webshot(
          file = file.path(
            file_paths_materials_experiment3,
            str_c(
              .x,
              ".png"
            )
          ),
          selector = "#jspsych-content",
          eval = .y
        )
    )

}
