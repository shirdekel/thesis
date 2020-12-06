##' @title Data simulation for anecdotes 2
##' @param data_clean

##' @return
##' @author Shir Dekel
##' @export
get_data_simulation_anecdotes_2 <- function() {
  ## loadd(data_clean_anecdotes_1)

  ## anecdote_between <- c("anecdote_only", "combined")

  ## alignment <- c("low", "high")

  ## anecdote_within <- c("statistics_only", "anecdote")

  ## between <- lst(
  ##   anecdote_between
  ## )

  ## within <- lst(
  ##   alignment,
  ##   anecdote_within
  ## )

  ## n <- 2

  ## sim_design(
  ##   within,
  ##   between,
  ##   n = n / 2,
  ##   plot = FALSE,
  ##   long = TRUE
  ## ) %>%
  ##   arrange(id) %>%
  ##   as_tibble() %>%
  ##   select(-y) %>%
  ##   mutate(
  ##     across(
  ##       starts_with("anecdote"),
  ##       ~ .x %>%
  ##         str_replace("\\.", "_")
  ##     ),
  ##     alignment = case_when(
  ##       anecdote_within == "statistics_only" ~ "NA",
  ##       TRUE ~ alignment %>% as.character()
  ##     ),
  ##     ## valence = case_when(
  ##     ##   anecdote_within == "statistics_only" ~ "NA",
  ##     ##   TRUE ~ valence
  ##     ## )
  ##   ) %>%
  ##   distinct()

  ## data_clean_anecdotes_1 %>%
  ##   lm(
  ##     allocation_projectA ~ alignment * anecdote,
  ##     data = .
  ##   ) %>%
  ##   y_explicit() <-
  ##   predict(model_alignment_2, newdata = df)

  ## model.frame() %>%
  ##   as_tibble() %>%
  ##   rowid_to_column()

within <- list(
  similarity = c("low", "high"),
  valence = c("negative", "positive")
)

between <- list(
  anecdote = c("anecdote.only", "combined")
)

mu <- data.frame(
  row.names = c("low_negative", "low_positive",
                "high_negative", "high_positive"),
  anecdote.only = c(60, 20,
                    20, 60),
  combined = c(80, 40,
               40, 80)
)
r <- list(
  anecdote.only = 0.5,
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

  within_statistics_only <-
    list(
      anecdote = "statistics.only",
  valence = c("negative", "positive")
    )

  between_statistics_only <-
    list(
      anecdote = "anecdote.only"
    )

  mu_statistics_only <-
      data.frame(
          row.names = c("statistics.only_negative", "statistics.only_positive"),
          anecdote.only = c(100, 0)
      )

  df2 <-
  sim_design(within_statistics_only,
      n = 100,
      mu = mu_statistics_only,
      sd = 10,
      r = 0.5,
      dv = "allocation",
      long = TRUE,
      plot = FALSE,
      empirical = TRUE
  )

  df1 %>%
    full_join(df2) %>%
    as_tibble() %>%
    mutate(
      across(similarity, ~ .x %>%
                           fct_explicit_na(na_level="NA") 
             )
    )

}

