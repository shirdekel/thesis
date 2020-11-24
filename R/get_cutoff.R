##' @title Get cutoff value
##' @param val_trans

##' @return
##' @author Shir Dekel
##' @export
##' @param val_trans
##' @param multipliers
get_cutoff <- function(anecdote_presence, val_trans, multipliers) {
  if (anecdote_presence) {
    cutoff <-
        val_trans %>%
        map2(multipliers, ~ round(.x * .y))
    return(cutoff)
  } else {
    return("")
  }
}
