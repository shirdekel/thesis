##' @title Get anecdotes 2 parameters

##' @return
##' @author Shir Dekel
##' @export
get_parameters_anecdotes_2 <- function() {

## asdf <- 
  tibble(
    project_variation = seq_len(2) %>%
      as.numeric() %>%
   latin_list(),
    anecdote_variation = seq_len(2) %>%
      as.numeric() %>%
  latin_list(),
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
 list(),
    alignment = c("low", "high") %>% list(),
    reason = get_reason() %>% list()
  ) %>%
   # vary by project variation?
    unnest(
      c(
      project_variation,
      business_name,
      type,
      location,
      value_string,
      feature,
      ## integration,
      ## structure,
        ## reliability,
      )
      ) %>%
   # vary by feature_type (target/anecdote)
    unnest(c(
      business_name,
      location,
      integration,
      structure,
      value_string,
      multiplier,
      ## alignment,
        feature_type,
      ## type
    )) %>%
    ## select(project_variation, anecdote_variation, alignment, business_name)
   # vary by anecdote variation?
    unnest(
      c(
        ## business_name,
        ## location,
        ## integration,
        ## structure,
        ## value_string,
        multiplier,
        type,
        npv,
        alignment,
        reason,
        reliability,
      anecdote_variation
      )
    ) %>%
    ## select(project_variation, anecdote_variation, alignment, business_name)
   # vary by project type? (target/comparison)
    unnest(c(
      business_name,
      location,
      integration,
      structure,
      value_string,
      multiplier,
      npv,
      reliability,
      project_type,
      type,
      feature,
      value_numeric,
      unit,
      ## reason
    )) %>%
   ##  select(project_variation, anecdote_variation, alignment, business_name, reason) %>%
   ##  arrange(project_variation, anecdote_variation, alignment) %>%
   ## filter(project_variation == 2, anecdote_variation == 2, alignment == "high") %>%
   ##     pull(reason)
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
      cutoff = get_cutoff(value_numeric) %>% list(),
      analysis = get_analysis(
        business_name, location,
        integration, structure,
        value_string, value_numeric,
        reason, cutoff
      )
    ) %>%
  ##   select(project_variation, anecdote_variation, alignment, business_name, value) %>%
  ##  arrange(project_variation, anecdote_variation, alignment) %>%
  ##  filter(project_variation == 2, anecdote_variation == 2, alignment == "high") %>%
  ## pull(value)
    # needs to be removed because otherwise there are NAs after pivoting
    select(-c(multiplier, value, feature,
              reason, unit, cutoff
              )) %>%
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
      values_from = values,
      ) %>%
    ## select(project_variation, anecdote_variation, alignment, integration_anecdote)  %>%
    ## arrange(project_variation, anecdote_variation, alignment)
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
   ##  filter(project_variation == 1, anecdote_variation == 1) %>%
   ##  pull(data) %>%
   ##  .[[1]] %>%
   ## pull(display) %>%
   ## map(cat)
  mutate(
      timeline = get_projects_anecdotes_2(
        project_variation,
        anecdote_variation,
        data
      ) %>%
        list()
    ) %>%
    pull(timeline)
}
