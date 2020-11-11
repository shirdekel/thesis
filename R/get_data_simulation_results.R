##' @title Get raw simulated data
##' For looping

##' @return
##' @author Shir Dekel
##' @export
##' @param df
##' @param estimates
get_data_simulation_results <- function(df, estimates) {
  data_simulation_raw <-
    get_data_simulation_raw(df, estimates)

  data_simulation_raw %>%
    mixed(
      allocation ~ npv_amount * reliability_amount *
        alignment * reliability_type +
        (1 | id),
      data = .,
      method = "S"
    ) %>%
    .[["full_model"]] %>%
    tidy()
}
