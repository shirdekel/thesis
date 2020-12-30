##' @title Nest for subsequent display
##'
##' Organise table such that each row is a distinct condition, and the data
##' column consists of the two project as rows, with target and anecdote columns
##' for subsequent processing.

##' @return
##' @author Shir Dekel
##' @export
##' @param feature_type_pivoted
nest_for_display <- function(feature_type_pivoted) {
  nested_for_display <-
    feature_type_pivoted %>%
    nest_by(
      project_variation,
      anecdote_variation,
      anecdote_between,
      anecdote_within,
      alignment,
      valence
    )
  nested_for_display
}
