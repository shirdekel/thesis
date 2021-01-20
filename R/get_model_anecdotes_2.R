##' @title Get anecdotes 2 model
##' @param data_clean

##' @return
##' @author Shir Dekel
##' @export
get_model_anecdotes_2 <- function(data_clean) {
  data_clean %>%
    filter(anecdote_within == "anecdote") %>%
    nest_by(
      id,
      anecdote_between,
      similarity,
      valence,
      allocation
    ) %>%
    aov_4(
      allocation ~
      anecdote_between +
        (c(similarity * valence) | id),
      data = .
    )
}
