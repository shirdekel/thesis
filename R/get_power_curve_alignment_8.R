##' @title Get power table
##' for later plotting

##' @return
##' @author Shir Dekel
##' @export
get_power_curve_alignment_8 <- function() {
  power_table <-
    get_power_table_8()

  power_curve <-
    power_table %>%
    ggplot(aes(
      x = n,
      y = power,
      group = 1
    )) +
    geom_hline(yintercept = 0.8, linetype = "dashed") +
    geom_errorbar(aes(ymin = lower, ymax = upper), color = "black", width = 0.1) +
    geom_line() +
    geom_point(size = 5) +
    labs(
      y = "Power"
    ) +
    theme_apa(10)


  return(power_curve)
}
