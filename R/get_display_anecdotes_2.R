##' @title Get anecdotes 2 display
##'
##' Statistics only condition only sees the target project display, whereas
##' those in the anecdotes conditions (anecdote_only and combined) see both
##' target and anecdote description.

##' @return
##' @author Shir Dekel
##' @export
##' @param instructions
##' @param anecdote_within
##' @param target
##' @param anecdote
get_display_anecdotes_2 <- function(instructions, anecdote_within, target, anecdote) {
  case_when(
    anecdote_within == "statistics_only" ~
    div(instructions, target) %>%
      as.character(),
    anecdote_within == "anecdote" ~
    div(instructions, anecdote, target) %>%
      as.character()
  )
}
