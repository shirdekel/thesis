##' @title Anecdotes 2 screenshot file names
##'
##' Get all displays from the combined condition, interstitials, and follow_ups,
##' with a sample anecdotes only display at the end.
##'
##' Don't need to include variations because everyone sees the same domains; the
##' variation is in the associated conditions.

##' @return
##' @author Shir Dekel
##' @export
get_file_name_materials_anecdotes_2 <- function() {
  specific_instructions <-
    str_c(
      "specific_instructions",
      "anecdote_condition",
      c("anecdote_only", "combined", "statistics_only"),
      sep = "_"
    )

  c("high", "low") %>%
    map(
      ~ str_c("project_allocation",
        "valence",
        c("negative", "positive"),
        "similarity",
        .x,
        sep = "_"
      )
    ) %>%
    unlist() %>%
    c("project_allocation_statistics_only") %>%
    list(
      str_c("interstitial", seq_len(5), sep = "_"),
      .,
      str_c("follow_up", seq_len(5), sep = "_")
    ) %>%
    transpose() %>%
    unlist() %>%
    c(
      "general_instructions",
      specific_instructions,
      .
    )
}
