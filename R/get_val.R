##' @title Get val

##' @return
##' @author Shir Dekel
##' @export
##' @param val_1
##' @param multiplier
get_val <- function(val_1, multiplier) {
  val_2 <- round(val_1 * multiplier)
  val <- list(val_2, val_1)
  return(val)
}
