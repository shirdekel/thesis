##' @title Unnest within-subjects

##' Expand each within-subjects condition alongside anecdote variation to show
##' feature type. This give each feature type condition (target or anecdote) two
##' anecdote variation combinations (1,2 or 2,1). Doing this before any further
##' business name/project variation unnesting guarantees that each combination
##' of conditions gets the same combination of business names. Location needs to
##' be unnested here so that each feature type condition gets the relevant
##' location (i.e., location_anecdote with anecdote).
##' @return
##' @author Shir Dekel
##' @export
##' @param project_variation_mutated
unnest_within_subjects <- function(project_variation_mutated) {
  within_subjects_unnested <-
    project_variation_mutated %>%
    unnest(
      c(
        data,
        anecdote_variation,
        location
      )
    )
  within_subjects_unnested
}
