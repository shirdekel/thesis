##' @title Get anecdotes 2 model
##' @param data_clean

##' @return
##' @author Shir Dekel
##' @export
get_model_anecdotes_2 <- function(data_clean) {
  data_clean %>%
    lm(
      allocation ~
      anecdote_between * similarity * valence,
      data = .
    )
}
