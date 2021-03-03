##' @title Get plot for Experiment 1
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_plot_aggregation_1 <- function(data_clean) {
  apa_plot(
    data = data_clean,
    iv1 = "Alignment",
    iv1.lab = "Similarity",
    iv2 = "Presentation",
    iv3 = Awareness,
    dv = "risk",
    dv.lab = "Mean proportions of project acceptance"
  )
}
