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
    str_c(
      "\"",
      instructions,
      "<fieldset class = 'target'>",
      str_c(
        "Allocate your budget between the following two projects using",
        "percentage values (the two values should sum to 100):",
        sep = " "
      ) %>%
        p() %>%
        as.character(),
      "\" + ",
      target,
      " + \"<legend>Target projects</legend></fieldset>\""
    ) %>%
      insert_javascript() %>%
      list(),
    anecdote_within == "anecdote" ~
    str_c(
      "\"",
      instructions,
      anecdote,
      "<fieldset class = 'target'>",
      str_c(
        "Allocate your budget between the following two projects using",
        "percentage values (the two values should sum to 100):",
        sep = " "
      ) %>%
        p() %>%
        as.character(),
      "\" + ",
      target,
      " + \"<legend>Target projects</legend></fieldset>\""
    ) %>%
      insert_javascript() %>%
      list()
  )
}
