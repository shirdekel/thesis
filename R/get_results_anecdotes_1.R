##' @title Get anecdotes 2 results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_anecdotes_1 <- function(data_clean, iv, dv) {
  results_anecdotes_1 <-
    data_clean %>%
    nest_by(id, anecdote, age) %>%
    aov_4(
      age ~
      anecdote + (1 | id),
      data = .,
      print.formula = T
    ) %>%
    apa_print()

  return(results_anecdotes_1)
}
