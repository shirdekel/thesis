##' @title Summarise simulation results

##' @return
##' @author Shir Dekel
##' @export
##' @param simulation_results
summarise_simulation <- function(simulation_results) {
  simulation_results %>%
    filter(effect == "fixed") %>%
    group_by(term) %>%
    summarise(
      mean_estimate = mean(estimate),
      mean_se = mean(std.error),
      sum(p.value < 0.05) %>%
        binom.confint(nsim, level = 0.95, method = "exact") %>%
        select(mean, lower, upper) %>%
        rename(power = mean),
      .groups = "drop"
    )
}
