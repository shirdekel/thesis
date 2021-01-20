##' @title Get anecdotes 2 results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_anecdotes_2 <- function(data_clean, iv, dv) {
  data_analysis <-
    data_clean %>%
    filter(anecdote_within == "anecdote") %>%
    nest_by(
      id,
      anecdote_between,
      similarity,
      valence,
      allocation,
      similarity_rating,
      relevance_specific_rating,
      relevance_general_rating
    ) %>%
    ungroup()

  model <-
    data_analysis %>%
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


  ## Manipulation check  Similarity conditions are rated accordingly
  ##   Similarity rating: High similarity > low similarity
  ##   Regardless of condition

  model_similarity_rating <-
    data_analysis %>%
    aov_4(
      similarity_rating ~
      anecdote_between +
        (c(similarity * valence) | id),
      data = .
    )

  similarity_rating_similarity <-
    model_similarity_rating %>%
    apa_print() %>%
    pluck("full_result", "similarity")

  ## Allocation is influenced by perceived similarity
  ##   Negative valence
  ##     Negative correlation between allocation and similarity rating
  ##   Positive valence
  ##     Positive correlation between allocation and similarity rating

  allocation_similarity_rating <-
    data_analysis %>%
    lm(
      allocation ~
      valence * similarity * similarity_rating,
      data = .
    ) %>%
    emtrends(c("valence", "similarity"), var = "similarity_rating") %>%
    pairs(by = c("valence")) %>%
    apa_print() %>%
    pluck("full_result")

  ## The relationship between allocation and specific relevance is moderated
  ##  by similarity
  ##   Negative valence
  ##     Low similarity: no correlation between allocation and specific relevance rating
  ##     High similarity: negative correlation between allocation and specific relevance rating
  ##   Positive valence
  ##     Low similarity: no correlation between allocation and specific relevance rating
  ##     High similarity: positive correlation between allocation and specific relevance rating


  # double check this
  allocation_similarity_rating <-
    data_analysis %>%
    lm(
      allocation ~
      valence * similarity * relevance_specific_rating,
      data = .
    ) %>%
    emtrends(c("valence", "similarity"), var = "relevance_specific_rating") %>%
    contrast(interaction = "pairwise", by = "valence") %>%
    apa_print() %>%
    pluck("full_result")

  results_anecdotes_2 <-
    lst(
      three_way,
      anecdotes_only_similarity,
      similarity_high_anecdote,
      combined,
      similarity_rating_similarity
    )

  return(results_anecdotes_2)
}
