##' @title Get power table

##' @return
##' @author Shir Dekel
##' @export
get_power_table_alignment_8 <- function() {
  npv_amount <-
    get_npv()

  model_alignment_8 <-
    get_model_alignment_8(8, npv_amount)

  n_vector <-
    seq(from = 21, by = 1, length.out = 15)

  nsim <- 3000

  pb <- progress_bar$new(
    format = "[:bar] :current/:total eta :eta",
    total = nsim * length(n_vector),
    width = 50,
    force = TRUE
  )

  power_table <-
    n_vector %>%
    map_df(
      ~ get_simulation_summary_alignment_8(
        n = 16 * .x,
        model_alignment_8,
        nsim,
        pb,
        npv_amount
      ) %>%
        mutate(
          n = as.factor(.x * 4)
        )
    )
}
