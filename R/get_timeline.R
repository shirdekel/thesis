##' @title Get anecdotes 2 timeline
##'
##' Parse each between-subjects row (with each of the five within-subjects
##' display within the data column) as javascript using jaysire.

##' @return
##' @author Shir Dekel
##' @export
##' @param parameters_anecdotes_2
##' @param randomize_order
get_timeline <- function(parameters_anecdotes_2, randomize_order) {
  parameters_anecdotes_2 %>%
    nest_for_timeline() %>%
    mutate(
      timeline = get_projects_anecdotes_2(
        project_variation,
        anecdote_variation,
        anecdote_between,
        data,
        randomize_order
      ) %>%
        list()
    ) %>%
    pull(timeline)
}
