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
        # General instructions
        1,
        # Anecdote only instructions
        3,
        # Combined instructions
        3,
        # Statistics only instructions
        15,
        # Interstitial, display (anecdote and target), and follow-up x 5
        2:16
      )
    ]

  anecdote_between <-
    c(
      "anecdote_only" %>%
        rep(2),
      "combined" %>%
        rep(17)
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

  selector_type <-
    list(
      instructions = ".instructions",
      anecdote = c(".anecdote", ".target"),
      statistics_only = ".target"
    )

  selector <-
    list(
      NULL,
      selector_type$anecdote,
      NULL
    ) %>%
    rep(4) %>%
    c(
      list(NULL),
      list(selector_type$instructions) %>%
        rep(3),
      .,
      list(NULL),
      list(selector_type$statistics_only),
      list(NULL)
    )

  expand_type <-
    list(
      anecdote_only = c(-1145, 0, 1145, 0),
      combined_short = c(-1560, 0, 1560, 0),
      combined_medium = c(-1620, 0, 1620, 0),
      combined_long = c(-1675, 0, 1675, 0),
      statistics_only = c(-550, 0, 550, 0)
    )

  expand_allocation <-
    c(
      expand_type$combined_short %>%
        list(),
      expand_type$combined_medium %>%
        list(),
      expand_type$combined_short %>%
        list(),
      expand_type$combined_long %>%
        list(),
      expand_type$statistics_only %>%
        list()
    )

  expand <-
    expand_allocation %>%
    list(
      0 %>% rep(5),
      .,
      0 %>% rep(5)
    ) %>%
    transpose() %>%
    flatten() %>%
    c(
      0,
      expand_type$anecdote_only %>%
        list(),
      expand_type$combined_short %>%
        list(),
      expand_type$statistics_only %>%
        list(),
      .
    )

  screenshot_components <-
    lst(
      file_path_materials,
      webshot_eval,
      selector,
      expand
    )
  screenshot_components
}
