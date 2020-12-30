##' @title Get nesting set up
##'
##' Nest in order so that elements can be subsequently added for each relevant
##' layer (project type, feature type, and within subjects conditions).

##' @return
##' @author Shir Dekel
##' @export
##' @param conditions
get_nesting_setup <- function(conditions) {
  nesting_setup <-
    conditions %>%
    nest_by(
      anecdote_between,
      anecdote_within,
      alignment,
      valence,
      feature_type
    ) %>%
    nest_by(
      anecdote_between,
      anecdote_within,
      alignment,
      valence,
    ) %>%
    nest_by(
      anecdote_between
    )
  nesting_setup
}
