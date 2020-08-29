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

  values <-
    lst(
      plot_function,
      gamble_n,
      experiment,
      get_experiment,
      get_screenshots
    )

  return(values)
}
