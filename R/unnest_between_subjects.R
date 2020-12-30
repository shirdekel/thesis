##' @title Unnest between-subjects components

##' Expand each between-subjects condition. Also, unnest project variation so
##' that each within-subjects combination (of alignment and valence) gets a
##' different project variation sequencej.
##' @return
##' @author Shir Dekel
##' @export
##' @param between_subjects_mutated
unnest_between_subjects <- function(between_subjects_mutated) {
  between_subjects_unnested <-
    between_subjects_mutated %>%
    unnest(
      c(
        data,
        project_variation,
        multiplier_anecdote,
        multiplier_cutoff,
        success,
        reason_structure,
        reason_integration,
        reason_value_string
      )
    )
  between_subjects_unnested
}
