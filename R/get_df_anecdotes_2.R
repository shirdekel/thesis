##' @title Get anecdotes 2 simulation df
##'
##' The logic is that
##'
##'
##' @param n must be divisible by 2
##' @return
##' @author Shir Dekel
##' @export
get_df_anecdotes_2 <- function(n = 10) {
  within <- list(
    similarity = c("low", "high"),
    valence = c("negative", "positive"),
    anecdote_within = "anecdote"
  )

  between <- list(
    anecdote_between = c("anecdote_only", "combined")
  )

  loadd(data_clean_anecdotes_1)
  anecdotes_1 <-
    data_clean_anecdotes_1 %>%
    group_by(anecdote, alignment) %>%
    summarise(across(allocation_projectA, list(mean = mean, sd = stats::sd),
      .names = "{.fn}"
    ), .groups = "drop")

  mu_anecdotes_1 <-
    anecdotes_1 %>%
    super_split(anecdote, alignment)

  ## From Anecdotes 1 (rounded)
  mu_anecdotes_only_low_negative <- mu_anecdotes_1$statistics$`NA`$mean
  mu_anecdotes_only_high_negative <- mu_anecdotes_1$anecdote$high$mean
  mu_combined_high_negative <- mu_anecdotes_1$combined$high$mean

  ## Hypotheses
  mu_anecdotes_only_low_positive <- 100 - mu_anecdotes_only_low_negative
  mu_anecdotes_only_high_positive <- 100 - mu_anecdotes_only_high_negative

  mu_combined_low_negative <- mu_anecdotes_only_low_negative
  mu_combined_low_positive <- mu_anecdotes_only_low_positive
  mu_combined_high_positive <- 100 - mu_combined_high_negative

  mu <- data.frame(
    row.names = c(
      "low_negative", "low_positive",
      "high_negative", "high_positive"
    ),
    anecdote_only = c(
      mu_anecdotes_only_low_negative, mu_anecdotes_only_low_positive,
      mu_anecdotes_only_high_negative, mu_anecdotes_only_high_positive
    ),
    combined = c(
      mu_combined_low_negative, mu_combined_low_positive,
      mu_combined_high_negative, mu_combined_high_positive
    )
  )
  r <- list(
    anecdote_only = 0.5,
    combined = 0.5
  )

  df1 <-
    sim_design(within, between,
      n = n / 2,
      mu = mu,
      sd = mean(anecdotes_1$sd),
      r = r,
      dv = "allocation",
      long = TRUE,
      plot = FALSE
    )

  within_statistics_only <-
    list(
      anecdote_within = "statistics_only"
    )

  between_statistics_only <-
    list(
      anecdote_between = c("anecdote_only", "combined")
    )

  df2 <-
    sim_design(
      within = within_statistics_only,
      between = between_statistics_only,
      n = n / 2,
      mu = mu_anecdotes_1$statistics$`NA`$mean,
      sd = 10,
      r = 0.5,
      dv = "allocation",
      long = TRUE,
      plot = FALSE
    )

  df1 %>%
    full_join(
      df2,
      by = c(
        "id", "anecdote_between", "anecdote_within",
        "allocation"
      )
    ) %>%
    as_tibble() %>%
    mutate(
      across(c(similarity, valence), ~ .x %>%
        fct_explicit_na(na_level = "NA")),
      across(where(is.factor), as.character)
    ) %>%
    arrange(id)
}
