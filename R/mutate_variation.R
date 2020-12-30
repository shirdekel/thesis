##' @title Mutate variation conditions
##' Mutate project variation here so that each between subjects condition is
##' identical and each gets the set of five counterbalanced sequences. Do the
##' same with anecdot e variation.
##' @return
##' @author Shir Dekel
##' @export
##' @param nesting_setup
mutate_variation <- function(nesting_setup) {
  variation_mutated <-
    nesting_setup %>%
    mutate(
      project_variation = seq_len(5) %>%
        as.numeric() %>%
        latin_list() %>%
        list(),
      anecdote_variation = seq_len(2) %>%
        as.numeric() %>%
        latin_list() %>%
        list(),
      .before = 1
    )
  variation_mutated
}
