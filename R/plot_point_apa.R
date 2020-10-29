##' @title Plot point in APA

##' @return
##' @author Shir Dekel
##' @export
plot_point_apa <- function(data) {
  data %>%
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
    theme_apa(base_size = 10)
}
