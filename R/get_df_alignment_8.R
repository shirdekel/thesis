##' @title Get simulation data frame

##' @return
##' @author Shir Dekel
##' @export
##' @param n Needs to be divisible by 8
##' @param npv_amount
get_df_alignment_8 <- function(n = 8, npv_amount) {
  reliability_amount <- c("low", "high")
  reliability_type <- c("implicit", "explicit")
  alignment <- c("low", "high")
  display_variation <- seq_len(2)

  counterbalanced_npv <-
    expand_grid(
      npv_amount,
      reliability_amount
    ) %>%
    mutate(
      display_variation = c(
        display_variation,
        display_variation %>%
          rev()
      ) %>%
        as.factor()
    ) %>%
    unnest(npv_amount) %>%
    arrange(display_variation)

  between <- lst(
    alignment,
    reliability_type,
    display_variation
  )

  within <- lst(
    reliability_amount,
  )

  df <-
    sim_design(
      within,
      between,
      n = n / 8,
      plot = FALSE,
      long = TRUE
    ) %>%
    left_join(counterbalanced_npv,
      by = c("display_variation", "reliability_amount")
    ) %>%
    arrange(id) %>%
    mutate(
      across(reliability_amount, ~ .x %>%
        fct_relevel(c("low", "high")))
    ) %>%
    as_tibble() %>%
    select(-y)

  return(df)
}
