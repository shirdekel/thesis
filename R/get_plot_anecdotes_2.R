##' @title Get plot for anecdotes 2
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_plot_anecdotes_2 <- function(data_clean) {
  plot_anecdotes_2 <-
    data_clean %>%
    nest_by(
      id,
      anecdote_between,
      anecdote_within,
      alignment,
      valence,
      allocation
    ) %>%
    apa_plot(
      iv1 = "valence",
      iv2 = "anecdote_within",
      dv = "allocation"
    ) +
    facet_grid(
      col = vars(alignment), row = vars(anecdote_between),
      labeller = label_both
    )

  return(plot_anecdotes_2)
}
