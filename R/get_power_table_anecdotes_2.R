##' @title Get power table
##'
##' The N we are interested in is the per group sample size
##'
##' So the input of n_vector is in terms of group sample size, but we then need
##' to multiply it by 2 (two between-subjects conditions) in order to input it
##' to sim_design in terms of full sample size.
##'
##' @return
##' @author Shir Dekel
##' @export
get_power_table_anecdotes_2 <- function() {
    n_vector <-
        ## seq(from = 21, by = 1, length.out = 15)
        100

    nsim <- ## 3000
        2

    n_vector %>%
        map_df(
            ~ get_simulation_summary_anecdotes_2(
                n = 2 * .x,
                nsim
            ) %>%
                mutate(
                    n = as.factor(.x)
                )
        )
}
