##' @title Nest for subsequent timeline generation
##'
##' Nest once to group within-subjects conditions with their relevant displays
##' and then nest again to group between-subjects conditions with their relevant
##' within-subjects conditions.

##' @return
##' @author Shir Dekel
##' @export
##' @param parameters_anecdotes_2
nest_for_timeline <- function(parameters_anecdotes_2) {
  parameters_anecdotes_2 %>%
    nest_by(
      project_variation,
      anecdote_variation,
      anecdote_between,
      alignment,
      valence,
      display
    ) %>%
    nest_by(
      project_variation,
      anecdote_variation,
      anecdote_between
    )
}
