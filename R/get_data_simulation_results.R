##' @title Get raw simulated data
##' For looping

##' @return
##' @author Shir Dekel
##' @export
##' @param df
##' @param estimates
##' @param formula
get_data_simulation_results <- function(df, estimates, formula) {
  data_simulation_raw <-
    get_data_simulation_raw(df, estimates, formula)

  data_simulation_raw %>%
    mixed(
      formula,
      data = .,
      method = "S"
    ) %>%
    .[["full_model"]] %>%
    tidy()
}
