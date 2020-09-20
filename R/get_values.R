##' @title Get plan values
##'
##' To be used in static branching functions

##' @return
##' @author Shir Dekel
##' @export
get_values <- function() {

  gamble_n <-
    c(
      10 %>%
        rep(2),
      20
    )

  experiment <-
    str_c("experiment", 2:4)

  get_screenshots <-
    syms(str_c("get_screenshots", experiment, sep = "_"))

  get_plot <-
    syms(str_c("get_plot", experiment, sep = "_"))

  get_results <-
    syms(str_c("get_results", experiment, sep = "_"))

  import_data <-
    syms(c("import_data_server" %>%
             rep(3)))

  data_directory <-
    c(
      here("inst", "extdata", "psychsydexp") %>%
        rep(3)
    )

  data_clean_test <-
    c(
      FALSE %>%
        rep(3)
    )

  prolific_filter <-
    list(
      "datetime > '2020-07-28'",
      list(
        c("datetime > '2020-09-17'", "datetime < '2020-09-18'"),
        c("datetime > '2020-09-18'", "similarity == 'low'"),
        c("datetime > '2020-09-18'", "similarity == 'high'")
      ),
      "datetime > '2020-07-28'"
    )

  prolific_filter_label <-
    list(
      list(character(0)),
      list(
        character(0),
        "similarity_low",
        "similarity_high"
      ),
      list(character(0))
    )

  values <-
    lst(
      gamble_n,
      experiment,
      get_experiment,
      get_screenshots,
      get_plot,
      get_results,
      import_data,
      data_directory,
      data_clean_test,
      prolific_filter,
      prolific_filter_label
    )

  return(values)
}
