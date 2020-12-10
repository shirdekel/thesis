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
      age
    )  %>%
    apa_plot(
      dv = "age",
      iv1 = "anecdote_between"
    )

  return(plot_anecdotes_2)
}
