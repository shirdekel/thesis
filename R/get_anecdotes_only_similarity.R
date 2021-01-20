##' @title Get similarity analysis in the anecdotes only condition
##'
##' For Anecdotes 2
##'
##' Similarity check
##'   Negative valence
##'     Anecdotes only: low similarity > high similarity
##'   Positive valence
##'     Anecdotes only: high similarity > low similarity
##' @return
##' @author Shir Dekel
##' @export
##' @param model
get_anecdotes_only_similarity <- function(model) {
    c("anecdote_only_negative_high_low", "anecdote_only_positive_high_low") %>%
        map(
            ~ model %>%
                emmeans(c("anecdote_between", "similarity", "valence")) %>%
                pairs(by = c("anecdote_between", "valence")) %>%
                apa_print() %>%
                pluck("full_result", .x)
        ) %>%
        set_names("valence_negative", "valence_positive")
}
