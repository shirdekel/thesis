##' @title Get plan parameters
##'
##' To be used in static branching functions

##' @return
##' @author Shir Dekel
##' @export
get_parameters <- function() {

  thesis_project <-
    c(
      c("aggregation") %>%
        rep(3),
      "alignment"
    )

  experiment_number <-
    c(2, 3, 4, 1)

  gamble_n <-
    c(
      10 %>%
        rep(2),
      20,
      NA
    )

  get_screenshots <-
    syms(str_c("get_screenshots_experiment", experiment_number))

  get_plot <-
    syms(str_c("get_plot_experiment", experiment_number))

  get_results <-
    syms(str_c("get_results_experiment", experiment_number))

  import_data <-
    syms(c(
      "import_data_server" %>%
             rep(4)
      ))

  data_directory <-
    c(
      here("inst", "extdata", "psychsydexp") %>%
        rep(3),
      NA
    )

  data_clean_test <-
    c(
      FALSE %>%
        rep(3),
      NA
    )

  prolific_filter <-
    list(
      "datetime > '2020-07-28'",
      list(
        c("datetime > '2020-09-17'", "datetime < '2020-09-18'"),
        c("datetime > '2020-09-18'", "similarity == 'low'"),
        c("datetime > '2020-09-18'", "similarity == 'high'")
      ),
      "datetime > '2020-07-28'",
      NA
    )

  prolific_filter_label <-
    list(
      list(character(0)),
      list(
        character(0),
        "similarity_low",
        "similarity_high"
      ),
      list(character(0)),
      NA
    )

  experiment_path <-
    get_experiment_path(thesis_project, experiment_number)

  parameters <-
    tibble(
      thesis_project,
      experiment_number,
      gamble_n,
      get_screenshots,
      get_plot,
      get_results,
      import_data,
      data_directory,
      data_clean_test,
      prolific_filter,
      prolific_filter_label,
      experiment_path
    )

  return(parameters)
}
