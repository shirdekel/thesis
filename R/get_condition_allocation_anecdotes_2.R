##' @title Parse condition allocation JS code for anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_condition_allocation_anecdotes_2 <- function() {
  condition_level <-
    list(
      c("low", "high"),
      c("anecdote_only", "statistics_only", "combined"),
      c("negative", "positive")
    )

  condition_name <-
    c(
      "alignment",
      "anecdote",
      "valence"
    )

  sample <-
    list(
      condition_level,
      str_c(condition_name, "condition", sep = "_")
    ) %>%
    pmap_chr(
      ~ jspsych_sample(.x, .y)
    )

  urlvar <-
    condition_name %>%
    get_urlvar()

  condition_allocation_anecdotes_2 <-
    c(sample, urlvar) %>%
    coffee_compile(bare = TRUE)

  return(condition_allocation_anecdotes_2)
}
