##' @title Plot proportion data
##' @param data
##' @return
##' @author Shir Dekel
##' @export
plot_proportion <- function(data) {

  proportion_plot <- data %>%
    nest_by(subject, presentation, distribution, awareness, proportion) %>%
    unite("condition", presentation, distribution, awareness) %>%
    apa_plot(iv1 = "condition",
             iv1.lab = "Presentation and distribution condition",
             dv = "proportion",
             dv.lab = "Mean proportion of project acceptance")

  return(proportion_plot)

}
