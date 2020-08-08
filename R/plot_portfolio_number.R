##' @title Plot number portfolio data
##' @param data
##' @return
##' @author Shir Dekel
##' @export
plot_portfolio_number <- function(data) {

  portfolio_number_plot <- data %>%
    nest_by(subject, presentation, distribution, awareness, portfolio_number) %>%
    unite("condition", presentation, distribution, awareness) %>%
    apa_plot(iv1 = "condition",
             iv1.lab = "Presentation and distribution condition",
             dv = "portfolio_number",
             dv.lab = "Mean proportion of project acceptance")

  return(portfolio_number_plot)

}
