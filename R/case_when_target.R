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
        business_name_target,
        type_target,
        location_target,
        integration_target,
        structure_target,
        predicted_features_target,
        project_type,
        input_id_target
      ) %>%
      get_target() %>%
      list(),
    TRUE ~
    data %>%
      select(
        business_name_target,
        type_target,
        location_target,
        integration_target,
        structure_target,
        predicted_features_target,
        project_type,
        reliability,
        npv,
        input_id_target
      ) %>%
      get_target() %>%
      list(),
  )
}
