##' @title Get cutoff value
##' @param val_trans

##' @return
##' @author Shir Dekel
##' @export
##' @param val_trans
##' @param multipliers
get_cutoff <- function(value_numeric) {
  value_numeric %>%
    map(~ round(.x * 1.5))
}
