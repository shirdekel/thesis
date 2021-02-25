##' @title Get anecdotes 2 simulation df
##' @param n must be divisible by 2
##' @return
##' @author Shir Dekel
##' @export
get_df_anecdotes_2 <- function(n) {
  within <- list(
    similarity = c("low", "high"),
    valence = c("negative", "positive"),
    anecdote_within = "anecdote"
  )

  between <- list(
    anecdote_between = c("anecdote_only", "combined")
  )

  mu <- data.frame(
    row.names = c(
      "low_negative", "low_positive",
      "high_negative", "high_positive"
    ),
    anecdote_only = c(
      60, 40,
      20, 80
    ),
    combined = c(
      80, 20,
      40, 60
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
      sd = 10,
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
      mu = 80,
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
      across(similarity, ~ .x %>%
                           fct_explicit_na(na_level = "NA")),
      across(where(is.factor), as.character)
    ) %>%
    arrange(id)

}
