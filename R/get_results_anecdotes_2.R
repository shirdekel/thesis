##' @title Get anecdotes 2 results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_anecdotes_2 <- function(data_clean, iv, dv) {
  model <-
    data_clean %>%
    get_model_anecdotes_2()

  three_way <-
    model %>%
    get_three_way()

  anecdotes_only_similarity <-
    model %>%
    get_anecdotes_only_similarity()

  similarity_high_anecdote <-
    model %>%
    get_similarity_high_anecdote()

  combined <-
    data_clean %>%
    get_combined()

  results_anecdotes_2 <-
    lst(
      three_way,
      anecdotes_only_similarity,
      similarity_high_anecdote,
      combined
    )

  return(results_anecdotes_2)
}
