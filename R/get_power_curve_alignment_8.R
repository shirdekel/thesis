##' @title Get power curve

##' @return
##' @author Shir Dekel
##' @export
##' @param data_power
##' @param data_label
get_power_curve_alignment_8 <- function(data_power, data_label) {
  power_curve <-
    data_power %>%
    ggplot(aes(
      x = n,
      y = power,
      group = 1,
      colour = effect_type
    )) +
    facet_wrap(
      facets = vars(effect),
      labeller = labeller(effect = label_wrap_gen())
    ) +
    geom_hline(yintercept = 0.8, linetype = "dashed") +
    geom_errorbar(
      aes(ymin = lower, ymax = upper),
      color = "black", width = 0.1
    ) +
    geom_line() +
    geom_point() +
    labs(
      y = "Power",
      x = "Sample size per condition"
    ) +
    theme_apa() +
    geom_label(
      data = data_label,
      aes(x = n, y = power, label = n),
      nudge_y = -0.05,
      show.legend = FALSE
    ) +
    guides(x = guide_axis(angle = -90))


  return(power_curve)
}
