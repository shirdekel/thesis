##' @title Get follow-up trials
##'
##' For anecdote displays
##'
##' @param anecdote_within
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_follow_up <- function(anecdote_within, data, valence, similarity) {
  button_continue <-
    "Press the button below to continue." %>%
    div()

  case_when(
    anecdote_within == "statistics_only" ~ button_continue %>%
      as.character(),
    anecdote_within == "anecdote" ~ get_follow_up_html(
      data, button_continue, anecdote_within, valence, similarity
    ) %>%
      as.character()
  )
}
