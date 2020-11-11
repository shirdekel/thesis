##' @title Power analysis

##' @return
##' @author Shir Dekel
##' @export
##' @param n 
get_power_alignment_8 <- function(n) {
  df <-
      get_df_alignment_8(n = n)

  formula <-
      allocation ~
      npv_amount * reliability_amount * alignment * reliability_type +
          (1 | id)

  model_alignment_8 <-
      get_model_alignment_8(df, formula)

  estimates <-
      get_estimates(model_alignment_8)

  nsim <- 100
  simulation_results <-
      seq_len(nsim) %>%
      map_df(~ get_data_simulation_results(df, estimates, formula))

  simulation_summary <-
      summarise_simulation(simulation_results, nsim) %>%
      filter(term == "npv_amount:reliability_amount1:alignment1:reliability_type1")
  return(simulation_summary)
}
