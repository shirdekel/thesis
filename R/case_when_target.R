##' @title Conditional target processing
##'
##' Include all components for anecdotes and combined conditions, but no
##' statistics for anecdote only condition.
##' @param anecdote_within
##' @param anecdote_between
##' @param data
##' @return
##' @author Shir Dekel
##' @export
case_when_target <- function(anecdote_within, anecdote_between, data) {
  case_when(
    anecdote_within == "anecdote" &
      anecdote_between == "anecdote_only" ~
    data %>%
      select(
        project_type,
        "Business name" = business_name_target,
        "Project type" = type_target,
        "Location" = location_target,
        "Integration" = integration_target,
        "Structure" = structure_target,
        "Predicted project features" = predicted_features_target,
        "Project allocation (%)" = input_id_target
      ) %>%
      get_target() %>%
      list(),
    TRUE ~
    data %>%
      select(
        project_type,
        "Business name" = business_name_target,
        "Project type" = type_target,
        "Location" = location_target,
        "Integration" = integration_target,
        "Structure" = structure_target,
        "Predicted project features" = predicted_features_target,
        "Project allocation (%)" = input_id_target,
        "Overall reliability rating (%)" = reliability,
        "NPV ($)" = npv,
        input_id_target
      ) %>%
      get_target() %>%
      list(),
  )
}
