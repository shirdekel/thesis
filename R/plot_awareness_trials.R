##' @title Get separate presentation plot for awareness x trial
##' @param data
##' @return
##' @author Shir Dekel
##' @export
plot_awareness_trials <- function(data) {

  awareness_trials_plot <- data %>%
    filter(presentation == "separate", distribution == "absent") %>%
    ggplot(aes(x = project_order, y = choice, linetype = awareness)) +
    geom_smooth(method = "loess", color = "black") +
    scale_x_continuous("Trial", breaks = 1:10) +
    theme_apa() +
    labs(y = "Proportion of project acceptance")

  return(awareness_trials_plot)

}
