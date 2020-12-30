##' @title Get anecdotes 2 parameters
##'
##' Generate experiment condition structure and relevant parameters for each
##' condition. For subsequent parsing into javascript using jaysire.

##' @return
##' @author Shir Dekel
##' @export
get_parameters_anecdotes_2 <- function() {
  parameters_anecdotes_2 <-
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
        feature, value, anecdote_within, alignment, valence,
        business_name, type, npv, reliability, project_type
      )
    ) %>%
    unselect_for_pivot() %>%
    pivot_feature_type() %>%
    nest_for_display() %>%
    mutate(
      target = case_when_target(anecdote_within, anecdote_between, data),
      anecdote = get_anecdote(data) %>%
        list()
    ) %>%
    unnest(data) %>%
    rowwise() %>%
    mutate(
      display = get_display_anecdotes_2(anecdote_within, target, anecdote)
    ) %>%
    ungroup()
  parameters_anecdotes_2
}
