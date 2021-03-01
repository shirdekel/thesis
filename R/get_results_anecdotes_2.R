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

  set_sum_contrasts()

  model <-
    data_analysis %>%
    get_model_anecdotes_2()

  three_way <-
    model %>%
    get_three_way()

  anecdotes_only_similarity <-
    c("anecdote_only_negative_high_low", "anecdote_only_positive_high_low") %>%
    map(
      ~ model %>%
        get_anecdotes_only_similarity() %>%
        apa_print() %>%
        pluck("full_result", .x)
    ) %>%
    set_names("valence_negative", "valence_positive")

  similarity_high_anecdote <-
    c(
      "high_negative_anecdote_only_combined",
      "high_positive_anecdote_only_combined"
    ) %>%
    map(
      ~ model %>%
        get_similarity_high_anecdote() %>%
        apa_print() %>%
        pluck("full_result", .x)
    ) %>%
    set_names("valence_negative", "valence_positive")

  combined <-
    c(
      "negative",
      "positive"
    ) %>%
    map(
      ~ data_clean %>%
        nest_by(
          id,
          anecdote_between,
          similarity,
          valence,
          allocation,
          anecdote_within
        ) %>%
        get_combined(.x) %>%
        apa_print() %>%
        pluck("full_result")
    ) %>%
    set_names("valence_negative", "valence_positive")

  model_similarity_rating <-
    data_analysis %>%
    get_model_similarity_rating()

  similarity_rating_similarity <-
    model_similarity_rating %>%
    get_similarity_rating_similarity()

  allocation_similarity_rating <-
    data_analysis %>%
    get_allocation_similarity_rating()

  allocation_specific_relevance <-
    data_analysis %>%
    get_allocation_specific_relevance()

  results_anecdotes_2 <-
    lst(
      three_way,
      anecdotes_only_similarity,
      similarity_high_anecdote,
      combined,
      similarity_rating_similarity,
      allocation_similarity_rating,
      allocation_specific_relevance
    )

  return(results_anecdotes_2)
}
