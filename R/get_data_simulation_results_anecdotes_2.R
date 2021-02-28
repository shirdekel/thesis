##' @title Anecdote 2 simulation results
##' @return
##' @author Shir Dekel
##' @export
##' @param data
get_data_simulation_results_anecdotes_2 <- function(data) {
  data_statistics_only_excluded <-
    data %>%
    filter(anecdote_within == "anecdote")

  set_sum_contrasts()

  model <-
    data_statistics_only_excluded %>%
    get_model_anecdotes_2()

  three_way <-
    model %>%
    tidy() %>%
    filter(term == "anecdote_between1:similarity1:valence1") %>%
    mutate(
      effect = "Anecdote x similarity x valence"
    )

  anecdotes_only_similarity <-
    model %>%
    get_anecdotes_only_similarity() %>%
    tidy() %>%
    filter(anecdote_between == "anecdote_only") %>%
    mutate(
      effect = c(
        "Negative valence, anecdote-only: low similarity > high similarity",
        "Positive valence, anecdote-only: high similarity > low similarity"
      )
    )

  similarity_high_anecdote <-
    model %>%
    get_similarity_high_anecdote() %>%
    tidy() %>%
    filter(similarity == "high") %>%
    mutate(
      effect = c(
        "Negative valence, high similarity: combined > anecdote-only",
        "Positive valence, high similarity: anecdote-only > combined"
      )
    )

  combined <-
    c(
      "negative",
      "positive"
    ) %>%
    map(
      ~ data %>%
        get_combined(.x) %>%
        tidy()
    ) %>%
    set_names("negative", "positive") %>%
    bind_rows(.id = "valence") %>%
    filter(!(valence == "negative" & contrast == "similarity_low - statistics_only")) %>%
    mutate(
      effect = c(
        "Negative valence: Combined low similarity > combined high similarity",
        "Negative valence: Statistics-only > combined high similarity",
        "Positive valence: Combined high similarity > combined low similarity",
        "Positive valence: Statistics-only > combined high similarity",
        "Positive valence: Statistics-only > combined low similarity"
      )
    )

  negative_statistics_only_combined_null <-
    data %>%
    filter(
      valence %in% c("negative", "NA"),
      anecdote_between == "combined",
      similarity %in% c("low", "NA")
    ) %>%
    mutate(
      within = case_when(
        anecdote_within == "anecdote" ~ str_c("similarity", similarity,
          sep = "_"
        ),
        TRUE ~ anecdote_within
      )
    ) %>%
    lm(
      allocation ~ within,
      data = .
    ) %>%
    emmeans("within") %>%
    pairs(adjust = "none") %>%
    tidy(side = "equivalence", delta = 10) %>%
    mutate(
      effect = c(
        "Negative valence: Statistics-only = combined low similarity"
      )
    )

  lst(
    three_way,
    anecdotes_only_similarity,
    similarity_high_anecdote,
    combined,
    negative_statistics_only_combined_null
  ) %>%
    bind_rows()
}
