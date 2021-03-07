##' @title Get plot for Experiment 1
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_plot_aggregation_1 <- function(data_clean) {
  apa_plot(
    data = data_clean,
    iv1 = "alignment",
    iv1.lab = "Similarity",
    iv2 = "presentation",
    iv3 = awareness,
    dv = "proportion",
    dv.lab = "Mean proportions of project acceptance"
  )
}
