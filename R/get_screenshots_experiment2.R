##' @title screenshots E2

##' @return
##' @author Shir Dekel
##' @export
get_screenshots_experiment2 <- function() {

  file_name_materials_experiment2 <-
    get_file_name_materials_experiment2()

  materials_directory_experiment2 <-
    here("inst", "materials", "aggregation", "experiment2")

  if(!dir.exists(materials_directory_experiment2)) {
    dir.create(materials_directory_experiment2)
  }

  file_path_materials <-
    get_file_path_materials(
      materials_directory_experiment2,
      file_name_materials_experiment2
      )

  casper_calls <-
    c(
      str_c(
        "this.click('#jspsych-instructions-next');",
        str_c(
          "this.click('.jspsych-btn');" %>% rep(3),
          collapse = "\n"
        ),
        sep = "\n"
      ),
      "this.click('#jspsych-instructions-next');" %>%
        rep(3),
      "this.click('.jspsych-btn');" %>%
        rep(13)
    ) %>%
    slide(~ ., .before = Inf) %>%
    append(.[4], after = 4) %>% # awareness
    append(.[6], after = 6) %>% # project 1 presentation
    map_chr(
      ~ str_c(
        .,
        collapse = "\n"
      ))

  awareness <-
    c(
      "naive" %>%
        rep(4),
      "aware" %>%
        rep(15)
    )

  presentation <-
    c(
      "joint" %>%
        rep(6),
      "separate" %>%
        rep(13)
    )

  webshot_eval <-
    list(
      casper_calls,
      awareness,
      presentation
    ) %>%
    pmap_chr(
      function(casper_calls, awareness, presentation)
        str_c(
          "casper.thenOpen(this.getCurrentUrl() + '?distribution=present&presentation=",
          presentation,
          "&awareness=",
          awareness,
          str_c(
            "', function() {", casper_calls, "});",
            sep = "\n"
          )
        )
    )

  screenshot_components <-
    lst(
      file_path_materials,
      webshot_eval
    )

  return(screenshot_components)

}
