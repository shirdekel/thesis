##' @title Get anecdote analysis in the high similarity condition
##'
##' For Anecdotes 2
##' Effect of statistics

##'   Negative valence
##'     High similarity: combined > anecdote only
##'   Positive valence
##'     High similarity: anecdote only > combined

##' @return
##' @author Shir Dekel
##' @export
##' @param model
get_similarity_high_anecdote <- function(model) {
  c(
    "high_negative_anecdote_only_combined",
    "high_positive_anecdote_only_combined"
  ) %>%
    map(
      ~ model %>%
        emmeans(c("anecdote_between", "similarity", "valence")) %>%
        pairs(by = c("similarity", "valence")) %>%
        apa_print() %>%
        pluck("full_result", .x)
    ) %>%
    set_names("valence_negative", "valence_positive")
}
