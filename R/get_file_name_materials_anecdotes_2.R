##' @title Anecdotes 2 screenshot file names
##'
##' Get all displays from the combined condition, interstitials, and follow-ups,
##' with a sample anecdotes only display at the end.
##'
##' Don't need to include variations because everyone sees the same domains; the
##' variation is in the associated conditions.

##' @return
##' @author Shir Dekel
##' @export
get_file_name_materials_anecdotes_2 <- function() {
  project_allocation <-
    c("low", "high") %>%
    map(
      ~ str_c("project-allocation",
        "valence",
        c("negative", "positive"),
        "alignment",
        .x,
        sep = "_"
      )
    ) %>%
    unlist() %>%
    map(
      ~ str_c(.x,
        "anecdote-condition",
        c("anecdote-only", "combined"),
        sep = "_"
      )
    ) %>%
    transpose() %>%
    simplify_all()

  project_allocation[[2]] %>%
    c("project-allocation_statistics-only") %>%
    list(
      str_c("interstitial", seq_len(5), sep = "_"),
      .,
      str_c("follow-up", seq_len(5), sep = "_")
    ) %>%
    transpose() %>%
    unlist() %>%
    c(project_allocation[[1]][[1]]) %>%
    c("instructions", .)
}
