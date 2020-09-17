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
             rep(2),
           "import_data_local"))

  data_directory <-
    c(
      here("inst", "extdata", "psychsydexp") %>%
        rep(2),
      here("inst", "jspsych", "experiment4", "data")
    )

  data_clean_test <-
    c(
      FALSE %>%
        rep(2),
      TRUE
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
      data_clean_test
    )

  return(values)
}
