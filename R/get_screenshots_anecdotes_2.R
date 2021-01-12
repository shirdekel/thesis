##' @title Screenshots anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_screenshots_anecdotes_2 <- function() {
  file_name_materials <-
    get_file_name_materials_anecdotes_2()

  materials_directory <-
    file.path("inst", "materials", "anecdotes", "experiment2")

  file_path_materials <-
    get_file_path_materials(materials_directory, file_name_materials)

  pre_experiment <-
    str_c(
      "this.click('#jspsych-instructions-next');",
      str_c(
        "this.click('.jspsych-btn');" %>%
          rep(3),
        collapse = "\n"
      ),
      sep = "\n"
    )

  casper_calls_chronological <-
    c(
      pre_experiment,
      "this.click('.jspsych-btn');" %>%
        rep(15)
    ) %>%
    slide(~., .before = Inf) %>%
    map_chr(
      ~ str_c(
        .,
        collapse = "\n"
      )
    )

  casper_calls <-
    casper_calls_chronological %>%
    .[
      c(
        # instructions
        1,
        # combined condition (interstitial, display, follow-up) x 3
        2:16,
        # anecdote only condition
        3
      )
    ]

  anecdote_between <-
    c(
      "combined" %>%
        rep(16),
      "anecdote_only"
    )

  webshot_eval <-
    list(
      casper_calls,
      anecdote_between
    ) %>%
    pmap_chr(
      function(casper_calls, anecdote_between) {
        str_c(
          "casper.thenOpen(this.getCurrentUrl() + '",
          "?test=true",
          "&project_variation=1",
          "&anecdote_variation=1",
          "&anecdote_between=",
          anecdote_between,
          str_c(
            "', function() {", casper_calls, "});",
            sep = "\n"
          )
        )
      }
    )

  screenshot_components <-
    lst(
      file_path_materials,
      webshot_eval
    )
  screenshot_components
}
