##' @title Data simulation for anecdotes 2
##' @param data_clean

##' @return
##' @author Shir Dekel
##' @export
get_data_simulation_anecdotes_2 <- function() {
  within <- list(
    similarity = c("low", "high"),
    valence = c("negative", "positive")
  )

  between <- list(
    anecdote = c("anecdote_only", "combined")
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
      n = 100,
      mu = mu,
      sd = 10,
      r = r,
      dv = "allocation",
      long = TRUE,
      plot = FALSE,
      empirical = TRUE
    )

  between_statistics_only <-
    list(
      anecdote = "statistics_only"
    )

  df2 <-
    sim_design(between_statistics_only,
      n = 100,
      mu = 80,
      sd = 10,
      r = 0.5,
      dv = "allocation",
      long = TRUE,
      plot = FALSE,
      empirical = TRUE
    )

  df1 %>%
    full_join(df2, by = c("id", "anecdote", "allocation")) %>%
    as_tibble() %>%
    mutate(
      across(similarity, ~ .x %>%
        fct_explicit_na(na_level = "NA"))
    )
}
