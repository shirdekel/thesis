##' @title Unnest project variation

##' Expand sets of five (project variations)
##' Expand project variation with business name, type, and location, etc. to
##' align each set of five project variations with a business name set (of two)
##' and the relevant type and location.
##' @return
##' @author Shir Dekel
##' @export
##' @param within_subjects_unnested
unnest_project_variation <- function(within_subjects_unnested) {
  project_variation_unnested <-
    within_subjects_unnested %>%
    unnest(
      c(
        project_variation,
        business_name,
        type,
        location,
        feature,
        value_numeric,
        value_string,
        reason_value_string,
        multiplier_anecdote,
        multiplier_cutoff,
        unit,
        reason,
        reason_location,
        reason_cutoff,
        reliability,
        npv
      )
    )
  project_variation_unnested
}
