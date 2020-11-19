##' @title Power analysis

##' @return
##' @author Shir Dekel
##' @export
##' @param n
##' @param model_alignment_8
##' @param nsim
get_simulation_summary_alignment_8 <- function(n = 32, model_alignment_8, nsim, pb, npv_amount) {
  df <-
    get_df_alignment_8(n = n, npv_amount)

  model_alignment_8$fitted.values <-
    predict(model_alignment_8, newdata = df)

  loadd(data_clean_alignment_2)

  model_alignment_2 <-
    data_clean_alignment_2 %>%
    filter(reliability_amount != "noNPV") %>%
    droplevels() %>%
    nest_by(id, allocation, alignment, reliability_amount, npv_amount) %>%
    lm(
      allocation ~ alignment * reliability_amount * npv_amount,
      data = .
    )

  sigma(model_alignment_8) <- sigma(model_alignment_2)

  y <-
    simulate(model_alignment_8, nsim)

  emm_options(msg.interaction = FALSE)

  simulation_results <-
    y %>%
    map(
      ~ df %>%
        mutate(allocation = .x)
    ) %>%
    map_df(~ get_data_simulation_results(.x, pb))

  simulation_summary <-
    summarise_simulation(simulation_results, nsim)
  return(simulation_summary)
}
