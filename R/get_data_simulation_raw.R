##' @title Get raw simulated data
##' For looping

##' @return
##' @author Shir Dekel
##' @export
##' @param df
##' @param estimates
get_data_simulation_raw <- function(df, estimates) {
  model <-
    makeLmer(allocation ~
    npv_amount * alignment * reliability_amount * reliability_type +
      (1 | id),
    fixef = estimates$fixed_effects,
    VarCorr = estimates$random_effects,
    sigma = estimates$residual_sd,
    data = df
    )

  data_simulation <-
    model %>%
    model.frame()

  data_simulation %>%
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
