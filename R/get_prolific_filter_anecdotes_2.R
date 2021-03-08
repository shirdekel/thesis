##' @title Get anecdotes 2 filters

##' @return
##' @author Shir Dekel
##' @export
get_prolific_filter_anecdotes_2 <- function() {
  list(
    c(
      "datetime < '2021-03-08 12:00'"
    ),
    c(
      "datetime > '2021-03-08 12:00'",
      "anecdote_between == \"anecdote_only\""
    ),
    c(
      "datetime > '2021-03-08 12:00'",
      "anecdote_between == \"combined\""
    )
  )
}
