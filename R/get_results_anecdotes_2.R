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

  ## Omnibus
  ##   Anecdote x similarity x valence

  three_way <-
    model %>%
    apa_print() %>%
    pluck("full_result", "anecdote_between_alignment_valence")

  ## Similarity check

  ##   Negative valence
  ##     Anecdotes only: low similarity > high similarity
  ##   Positive valence
  ##     Anecdotes only: high similarity > low similarity

  anecdotes_only_similarity <-
    c("anecdote_only_negative_high_low", "anecdote_only_positive_high_low") %>%
    map(
      ~ model %>%
        emmeans(c("anecdote_between", "similarity", "valence")) %>%
        pairs(by = c("anecdote_between", "valence")) %>%
        apa_print() %>%
        pluck("full_result", .x)
    ) %>%
    set_names("valence_negative", "valence_positive")

  ## Effect of statistics

  ##   Negative valence
  ##     High similarity: combined > anecdote only
  ##   Positive valence
  ##     High similarity: combined > anecdote only

  similarity_high_anecdote <-
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

  ## Anecdotal bias moderated by similarity
  ##   Negative valence
  ##     Statistics only > combined high similarity

  ##     Combined: Low similarity > high similarity

  ##     Statistics only = combined low similarity

  ##   Positive valence
  ##     Statistics only > combined low similarity

  ##     Combined: High similarity > low similarity

  ##     Statistics only = combined high similarity

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
        filter(
          valence %in% c("negative", "NA"),
          anecdote_between == "combined"
        ) %>%
        mutate(
          within = case_when(
            anecdote_within == "anecdote" ~ str_c("similarity", similarity,
              sep = "_"
            ),
            TRUE ~ anecdote_within
          )
        ) %>%
        aov_4(
          allocation ~ within +
            (within | id),
          data = .
        ) %>%
        emmeans("within") %>%
        pairs(adjust = "none") %>%
        apa_print() %>%
        pluck("full_result")
    ) %>%
    set_names("valence_negative", "valence_positive")

  results_anecdotes_2 <-
    lst(
      three_way,
      anecdotes_only_similarity,
      similarity_high_anecdote,
      combined
    )

  return(results_anecdotes_2)
}
