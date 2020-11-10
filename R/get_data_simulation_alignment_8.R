##' @title Data simulation for alignment 8
##' @param data_clean

##' @return
##' @author Shir Dekel
##' @export
get_data_simulation_alignment_8 <- function() {
  set_sum_contrasts()

  df <-
    get_df_alignment_8(n = 8*22)

  estimates <-
    get_estimates_alignment_8(df)

  nsim <- 100
  simulation_results <-
    seq_len(nsim) %>%
    map_df(~ get_data_simulation_raw(df, estimates))

  simulation_summary <-
    summarise_simulation(simulation_results) %>%
    filter(term == "npv_amount:reliability_amount1:alignment1:reliability_type1")

  beepr::beep()

}
