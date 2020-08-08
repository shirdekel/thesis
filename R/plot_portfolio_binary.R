##' @title Plot binary portfolio data
##' @param data
##' @return
##' @author Shir Dekel
##' @export
plot_portfolio_binary <- function(data) {

  portfolio_binary_plot <- data %>%
    nest_by(subject, presentation, distribution, awareness, portfolio_binary) %>%
    unite("condition", presentation, distribution, awareness) %>%
    apa_plot(iv1 = "condition",
             iv1.lab = "Presentation and distribution condition",
             dv = "portfolio_binary",
             dv.lab = "Mean proportion of project acceptance")

  return(portfolio_binary_plot)

}
