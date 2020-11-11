##' @title Data simulation for alignment 8
##' @param data_clean

##' @return
##' @author Shir Dekel
##' @export
get_data_simulation_alignment_8 <- function() {
  df <-
    get_df_alignment_8(n = 8 * 22)

  formula <-
    allocation ~
    npv_amount * reliability_amount * alignment * reliability_type +
      (1 | id)

  model <-
    get_model_alignment_8(df, formula)

  estimates <-
    get_estimates(model)

  data_simulation_raw <-
    get_data_simulation_raw(df, estimates, formula)

  return(data_simulation_raw)
}
