##' @title Get conditions dataframe for anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_conditions <- function() {
  conditions_anecdote <-
    expand_grid(
      anecdote_between = c("anecdote_only", "combined"),
      anecdote_within = "anecdote",
      alignment = c("low", "high"),
      valence = c("negative", "positive"),
      feature_type = c("target", "anecdote"),
      project_type = c("target", "comparison"),
    )

  conditions_statistics_only <-
    expand_grid(
      anecdote_between = c("anecdote_only", "combined"),
      feature_type = c("target", "anecdote"),
      project_type = c("target", "comparison")
    ) %>%
    mutate(
      anecdote_within = "statistics_only",
      alignment = "NA",
      valence = "NA",
    )

  conditions_anecdote %>%
    full_join(
      conditions_statistics_only,
      by = c(
        "anecdote_between", "anecdote_within", "alignment", "valence",
        "feature_type", "project_type"
      )
    )
}
