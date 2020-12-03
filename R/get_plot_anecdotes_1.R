##' @title Get plot for anecdotes 1
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_plot_anecdotes_1 <- function(data_clean) {
  data_clean %>%
      apa_plot(
          iv1 = "Evidence",
          iv2 = "Similarity",
          iv1.lab = "Evidence type",
          iv2.lab = "Similarity",
          dv = "allocation_projectA",
          dv.lab = "Mean allocation"
      )
}
