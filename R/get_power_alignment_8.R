##' @title Power analysis

##' @return
##' @author Shir Dekel
##' @export
get_power_alignment_8 <- function() {

  df <-
      get_df_alignment_8(n = 8 * 100)

  estimates <-
      get_estimates_alignment_8(df)

  nsim <- 100
  simulation_results <-
      seq_len(nsim) %>%
      map_df(~ get_data_simulation_results(df, estimates))

  simulation_summary <-
      summarise_simulation(simulation_results, nsim) %>%
      filter(term == "npv_amount:reliability_amount1:alignment1:reliability_type1")

  return(simulation_summary)
}
