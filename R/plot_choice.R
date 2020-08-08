##' @title Plot choice data
##' @param data
##' @return
##' @author Shir Dekel
##' @export
plot_choice <- function(data) {

  choice_plot <- data %>%
    unite("condition", presentation, distribution, awareness) %>%
    apa_plot(iv1 = "condition",
             iv1.lab = "Presentation and distribution condition",
             dv = "choice",
             dv.lab = "Mean choice of project acceptance")

  return(choice_plot)

}
