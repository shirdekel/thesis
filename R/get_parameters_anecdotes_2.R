##' @title Get anecdotes 2 parameters

##' @return
##' @author Shir Dekel
##' @export
get_parameters_anecdotes_2 <- function() {
  tibble(
    project_variation = 1,
    anecdote_variation = seq_len(2) %>%
   as.numeric(),
    feature_type = c("target", "anecdote") %>% list(),
    business_name = get_business_name_anecdotes_2() %>% list(),
    type = get_project_type_anecdotes_2() %>% list(),
    location = get_location_anecdotes_2() %>% list(),
    integration = get_integration() %>% list(),
    structure = get_structure() %>% list(),
    feature = get_feature_anecdotes_2() %>% list(),
    value_numeric = get_project_value_base() %>% list(),
    value_string = get_value_string() %>% list(),
    multiplier = get_multiplier() %>% list(),
    unit = get_unit_anecdotes_2() %>% list(),
    reliability = get_reliability_anecdotes_2(),
    npv = get_npv_anecdotes_2(),
    project_type = c("target", "comparison") %>%
      latin_list(),
    alignment = c("low", "high") %>% list(),
    reason = get_reason() %>%list()
  ) %>%
    unnest(c(
      location,
      integration,
      structure,
      value_string,
      alignment,
      multiplier
    )) %>%
    unnest(
      c(
        business_name,
        feature_type,
        location,
        integration,
        structure,
        value_string,
        multiplier,
      )
    ) %>%
    ## select(business_name, feature_type, value_numeric, location)
    rowwise() %>%
    # needs to be removed because otherwise there are NAs after pivoting
    ## select(feature_type, anecdote_variation, alignment, npv)
    ungroup() %>%
    unnest(c(
      npv,
      reliability,
      project_type,
      business_name,
      type,
      location,
      integration,
      structure,
      feature,
      value_numeric,
      value_string,
      multiplier,
      unit,
      reason
    )) %>%
    ## select(anecdote_variation, alignment, npv, reason, feature_type)
    rowwise() %>%
    mutate(
      value = get_value(
        value_numeric,
        multiplier,
        value_string
      ) %>% list(),
      predicted_features = get_predicted_features(
        value,
        feature,
        unit
      ),
    cutoff = get_cutoff(value_numeric) %>%list,
      analysis = get_analysis(business_name, location,
                             integration, structure,
                             value_string, value_numeric,
                             reason, cutoff)
      ) %>%
    ## pull(analysis)
    select(-c(multiplier, value)) %>%
    pivot_longer(
      c(
        business_name,
        type,
        location,
        integration,
        structure,
        predicted_features,
        value_string,
        analysis
      ),
      names_to = "names",
      values_to = "values"
    ) %>%
    pivot_wider(
      names_from = c(names, feature_type),
      values_from = values
    ) %>%
    nest_by(project_variation, alignment, anecdote_variation) %>%
    mutate(
      target = get_target(data) %>%
        list(),
      anecdote = get_anecdote(data) %>%
        list(),
      display = div(anecdote, target) %>%
        as.character()
    ) %>%
    nest_by(project_variation, anecdote_variation) %>%
    mutate(
      timeline = get_projects_anecdotes_2(project_variation,
                                          anecdote_variation,
                                          data) %>%
        list()
    ) %>%
    pull(timeline)
}
