##' @title screenshots E2

##' @param dir_testing_experiment
##'
##' @return
##' @author Shir Dekel
##' @export
get_screenshots_experiment2 <- function(dir_testing_experiment) {

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

  eval <-
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

  get_screenshots(file_path_materials_experiment2, eval, dir_testing_experiment)

}
