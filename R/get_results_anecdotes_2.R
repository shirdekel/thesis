##' @title Get anecdotes 2 results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_anecdotes_2 <- function(data_clean, iv, dv) {
  results_anecdotes_2 <-
    data_clean %>%
    filter(anecdote_within == "anecdote") %>%
    nest_by(
      id,
      anecdote_between,
      alignment,
      valence,
      allocation
    ) %>%
    aov_4(
      allocation ~
      anecdote_between * alignment * valence +
        (c(alignment, valence) | id),
      data = .,
      print.formula = T
    ) %>%
    apa_print()

  return(results_anecdotes_2)
}
