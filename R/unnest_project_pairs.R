##' @title Unnest project pairs

##' Expand remaining components so that each project type condition gets two
##' individual projects, and each one is associated with an anecdote variation
##' condition. Feature doesn't need another unnesting because we use the same
##' one for both target and comparison.
##' @return
##' @author Shir Dekel
##' @export
##' @param project_type_unnested
unnest_project_pairs <- function(project_type_unnested) {
  project_pairs_unnested <-
    project_type_unnested %>%
    unnest(
      c(
        business_name,
        anecdote_variation,
        integration,
        structure,
        reason_structure,
        value_string,
        reason_value_string,
        multiplier_anecdote,
        multiplier_cutoff,
        reason,
        reason_integration,
        location
      )
    )
  project_pairs_unnested
}
