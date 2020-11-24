##' @title Get values transposed

##' @return
##' @author Shir Dekel
##' @export
##' @param anecdote_presence
##' @param val
get_val_trans <- function(anecdote_presence, val) {
  if (anecdote_presence) {
    val_trans <-
      val %>%
      as.list() %>%
      set_names("rate", "maintenance", "prob")
  } else {
    val_trans <- ""
  }
  return(val_trans)
}
