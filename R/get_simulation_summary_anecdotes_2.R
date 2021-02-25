##' @title Anecdotes 2 simulation summary
##'
##' For power analysis
##'
##' @param n
##' @param nsim
##' @return
##' @author Shir Dekel
##' @export
get_simulation_summary_anecdotes_2 <- function(n = 10, nsim) {
  data <-
    seq_len(nsim) %>%
    map(
      ~ get_df_anecdotes_2(n = n)
    )

  simulation_results <-
    data %>%
    map_df(
      ~ get_data_simulation_results_anecdotes_2(.x)
    )

  summarise_simulation(simulation_results, nsim)
}
