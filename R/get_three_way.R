##' @title Get three way interaction for anecdotes 2

##' Omnibus
##'   Anecdote x similarity x valence
##' @return
##' @author Shir Dekel
##' @export
##' @param model
get_three_way <- function(model) {
  model %>%
    apa_print() %>%
    pluck("full_result", "anecdote_between1_similarity1_valence1")
}
