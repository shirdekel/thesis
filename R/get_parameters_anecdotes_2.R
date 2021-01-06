##' @title Get anecdotes 2 parameters
##'
##' Generate experiment condition structure and relevant parameters for each
##' condition. For subsequent parsing into javascript using jaysire.
##'
##' Used for display and follow_up columns

##' @return
##' @author Shir Dekel
##' @export
get_parameters_anecdotes_2 <- function() {
  parameters_anecdotes_2 <-
    get_display_setup() %>%
    mutate(
      target = case_when_target(anecdote_within, anecdote_between, data),
      anecdote = get_anecdote(data) %>%
        list(),
      follow_up = get_follow_up(
        anecdote_within, data
      )
    ) %>%
    unnest(data) %>%
    rowwise() %>%
    mutate(
      instructions = get_instructions_specific(
        anecdote_within,
        anecdote_between
      ),
      display = get_display_anecdotes_2(
        instructions, anecdote_within, target,
        anecdote
      )
    ) %>%
    ungroup()
  parameters_anecdotes_2
}
