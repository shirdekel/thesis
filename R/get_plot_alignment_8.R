##' @title Get plot for alignment 8
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_plot_alignment_8 <- function(data_clean) {
  plot_alignment_8 <-
    data_clean %>%
    nest_by(
      id,
      reliability_amount,
      npv_amount,
      allocation,
      alignment,
      reliability_type
    )  %>%
    get_plot_simulation_alignment_8()

  return(plot_alignment_8)
}
