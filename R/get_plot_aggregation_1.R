##' @title Get plot for Experiment 1
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_plot_aggregation_1 <- function(data_clean) {
  data_proportion <-
    data_clean %>%
    nest_by(id, awareness, presentation, alignment, proportion)

  dv.lab <- "Mean proportions of project acceptance"

  awareness <-
    apa_plot(
      data = data_proportion,
      iv1 = "awareness",
      iv1.lab = "Awareness of project set size",
      dv = "proportion",
      dv.lab = dv.lab
    )

  presentation <-
    apa_plot(
      data = data_proportion,
      iv1 = "presentation",
      dv = "proportion",
      dv.lab = dv.lab
    )

  alignment_presentation <-
    apa_plot(
      data = data_proportion,
      iv1 = "alignment",
      iv1.lab = "Similarity",
      iv2 = "presentation",
      dv = "proportion",
      dv.lab = dv.lab
    )

  lst(
    awareness,
    presentation,
    alignment_presentation
  )
}
