##' @title Get plan values
##'
##' To be used in static branching functions

##' @return
##' @author Shir Dekel
##' @export
get_values <- function() {

  plot_function <-
    syms(c("plot_awareness_trials", "plot_project_number", "plot_gamble_values"))

  gamble_n <-
    c(10 %>% rep(2), 20)

  experiment <-
    str_c("experiment", 2:4)

  get_experiment <-
    syms(str_c("get", experiment, sep = "_"))

  get_screenshots <-
    syms(str_c("get_screenshots", experiment, sep = "_"))

  get_plot <-
    syms(str_c("get_plot", experiment, sep = "_"))

  get_results <-
    syms(str_c("get_results", experiment, sep = "_"))

  import_data <-
    syms(c("import_data_server", "import_data_local" %>%
             rep(2)))

  data_directory <-
    c(
      here("inst", "extdata", "psychsydexp"),
      here("inst", "jspsych", "experiment3", "data"),
      here("inst", "jspsych", "experiment4", "data")
    )

  data_clean_test <-
    c(
      FALSE,
      TRUE %>%
        rep(2)
    )

  values <-
    lst(
      plot_function,
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
