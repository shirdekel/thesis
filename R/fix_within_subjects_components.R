##' @title Fix within-subjects components

##' Make sure positive valence conditions have a low statistics and negative
##' valence conditions have high statistics.
##'
##' Make sure that structure and integration match the relevant anecdote
##' condition.
##' @return
##' @author Shir Dekel
##' @export
##' @param within_subjects_unnested
fix_within_subjects_components <- function(within_subjects_unnested) {
  within_subjects_components_fixed <-
    within_subjects_unnested %>%
    mutate(
      reliability = case_when(
        valence == "positive" ~ reliability %>%
          map(rev),
        TRUE ~ reliability
      ),
      npv = case_when(
        valence == "positive" ~ npv %>%
          map(rev),
        TRUE ~ npv
      ),
      structure = case_when(
        similarity == "high" &
          feature_type == "anecdote"
        ~ structure %>%
          map(rev),
        TRUE ~ structure
      ),
      integration = case_when(
        similarity == "high" &
          feature_type == "anecdote"
        ~ integration %>%
          map(rev),
        TRUE ~ integration
      ),
      reason_integration = case_when(
        similarity == "high" &
          feature_type == "anecdote"
        ~ reason_integration %>%
          map(rev),
        TRUE ~ reason_integration
      )
    )
  within_subjects_components_fixed
}
