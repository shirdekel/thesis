##' @title Set up parameters for display processing

##' @return
##' @author Shir Dekel
##' @export
get_display_setup <- function() {
  display_setup <-
    get_conditions() %>%
    get_nesting_setup() %>%
    mutate_variation() %>%
    mutate_between_subjects() %>%
    unnest_between_subjects() %>%
    mutate_project_variation() %>%
    unnest_within_subjects() %>%
    unnest_project_variation() %>%
    fix_within_subjects_components() %>%
    unnest_project_type() %>%
    unnest_project_pairs() %>%
    rowwise() %>%
    mutate(
      value = get_value(
        value_numeric,
        multiplier_anecdote,
        value_string
      ) %>%
        list(),
      predicted_features = get_predicted_features(
        value,
        feature,
        unit
      ),
      cutoff = get_cutoff(value_numeric, multiplier_cutoff) %>%
        list(),
      analysis = get_analysis(
        business_name,
        success,
        reason_location,
        location,
        structure,
        reason_structure,
        integration,
        reason_integration,
        reason_cutoff,
        value_string,
        reason_value_string,
        value_numeric,
        cutoff,
        unit
      ),
      input_id = get_input_id(
        feature, value, anecdote_within, similarity, valence,
        business_name, type, npv, reliability, project_type
      )
    ) %>%
    unselect_for_pivot() %>%
    pivot_feature_type() %>%
    nest_for_display()
  display_setup
}
