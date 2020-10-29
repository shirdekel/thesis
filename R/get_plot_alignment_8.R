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
    ) %>%
    ggplot(
      aes(
        y = allocation,
        x = npv_amount,
        linetype = reliability_amount,
        fill = reliability_amount
      )
    ) +
    facet_grid(
      cols = vars(reliability_type),
      rows = vars(alignment),
      labeller = "label_both"
    ) +
    geom_point(shape = 21, colour = "black", alpha = 0.7) +
    geom_smooth(method = "lm", colour = "black") +
    scale_fill_grey(start = 0.2, end = 0.8) +
    theme_apa(base_size = 12)

  return(plot_alignment_8)
}
