##' @title Mutate project variation components
##'
##' Mutate business name, type, location, etc. here so that each of the five
##' sets (of four) of these are associated with a project variation number.
##' @param between_subjects_unnested

##' @return
##' @author Shir Dekel
##' @export
mutate_project_variation <- function(between_subjects_unnested) {
  project_variation_mutated <-
    between_subjects_unnested %>%
    mutate(
      business_name = get_business_name_anecdotes_2() %>%
        list(),
      type = get_project_type_anecdotes_2() %>%
        list(),
      location = case_when(
        alignment == "high" ~ get_location_anecdotes_2() %>%
          .[["high"]] %>%
          list(),
        # Doesn't matter which anecdote locations NA gets, because they don't
        # see an anecdote.
        TRUE ~ get_location_anecdotes_2() %>%
          .[["low"]] %>%
          list()
      ),
      integration = get_integration() %>%
        list(),
      structure = get_structure() %>%
        list(),
      feature = get_feature_anecdotes_2() %>%
        list(),
      value_numeric = get_project_value_base() %>%
        list(),
      value_string = case_when(
        alignment == "high" ~ get_value_string() %>%
          pluck("high") %>%
          list(),
        TRUE ~ get_value_string() %>%
          pluck("low") %>%
          list()
      ),
      unit = get_unit_anecdotes_2() %>%
        list(),
      reliability = get_reliability_anecdotes_2() %>%
        list(),
      npv = get_npv_anecdotes_2() %>%
        list(),
      reason = get_reason() %>%
        list(),
      reason_location = case_when(
        valence == "negative" ~ get_reason_location() %>%
          pluck("negative") %>%
          list(),
        TRUE ~ get_reason_location() %>%
          pluck("positive") %>%
          list()
      ),
      reason_cutoff = get_reason_cutoff() %>%
        list()
    )
  project_variation_mutated
}
