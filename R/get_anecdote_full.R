##' @title Get full anecdote description
##'
##' analysis + anecdote

##' @return
##' @author Shir Dekel
##' @export
get_anecdote_full <- function(analysis, anecdote_raw) {
  if (anecdote_raw == "") {
    anecdote_full <- anecdote_raw
  } else {
    anecdote_full <-
      str_c(analysis, anecdote_raw) %>%
      HTML() %>%
      tags$fieldset(tags$legend("Case study")) %>%
      as.character()
  }
  return(anecdote_full)
}
