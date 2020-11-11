##' @title Data simulation for alignment 8
##' @param data_clean

##' @return
##' @author Shir Dekel
##' @export
get_data_simulation_alignment_8 <- function() {
  df <-
    get_df_alignment_8(n = 8 * 22)

  estimates <-
    get_estimates_alignment_8(df)

  data_simulation_raw <-
    get_data_simulation_raw(df, estimates)

## data_simulation_raw %>%
## get_plot_simulation_alignment_8()

  return(data_simulation_raw)
}
