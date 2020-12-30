##' @title Unnest project type

##' Expand project type conditions with business name, type, location, and
##' feature so that each project type condition is associated with one of two
##' business names and the relevant type, location, and feature set. Integration
##' and structure are first unnested here and not in the previous unnesting
##' because they don't have five variations.
##' @return
##' @author Shir Dekel
##' @export
##' @param within_subjects_components_fixed
unnest_project_type <- function(within_subjects_components_fixed) {
  project_type_unnested <-
    within_subjects_components_fixed %>%
    unnest(
      c(
        data,
        business_name,
        type,
        location,
        integration,
        structure,
        reason_structure,
        feature,
        value_numeric,
        value_string,
        reason_value_string,
        multiplier_anecdote,
        multiplier_cutoff,
        unit,
        reason,
        reason_location,
        reason_integration,
        reason_cutoff,
        reliability,
        npv
      )
    )
  project_type_unnested
}
