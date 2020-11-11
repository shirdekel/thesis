##' @title One instance of simulated data

##' @return
##' @author Shir Dekel
##' @export
##' @param df
##' @param estimates
get_data_simulation_raw <- function(df, estimates) {
  set_sum_contrasts()
  model <-
    makeLmer(allocation ~
    npv_amount * alignment * reliability_amount * reliability_type +
      (1 | id),
    fixef = estimates$fixed_effects,
    VarCorr = estimates$random_effects,
    sigma = estimates$residual_sd,
    data = df
    )

  model %>%
    model.frame()
}
