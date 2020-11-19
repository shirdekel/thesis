##' @title One instance of simulated data

##' @return
##' @author Shir Dekel
##' @export
##' @param df
##' @param estimates
get_data_simulation_raw <- function(df, estimates, formula) {
  model <-
    makeLmer(
      formula,
      fixef = estimates$fixed_effects,
      VarCorr = estimates$random_effects,
      sigma = estimates$residual_sd,
      data = df
    )

  model %>%
    model.frame() %>%
    as_tibble()

}
