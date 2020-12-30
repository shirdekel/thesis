##' @title Unselect for subsequent pivoting
##' Needs to be removed because otherwise there are NAs after pivoting
##' @return
##' @author Shir Dekel
##' @export
##' @param data
unselect_for_pivot <- function(data) {
  unselected_for_pivot <-
    data %>%
    select(
      -c(
        multiplier_anecdote,
        multiplier_cutoff,
        cutoff,
        value,
        feature,
        reason,
        reason_structure,
        reason_integration,
        reason_value_string
      )
    )
  unselected_for_pivot
}
