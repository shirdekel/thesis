##' @title Get cutoff value
##' @param val_trans

##' @return
##' @author Shir Dekel
##' @export
##' @param value_numeric
##' @param multiplier_cutoff
get_cutoff <- function(value_numeric, multiplier_cutoff) {
    round(value_numeric * multiplier_cutoff)
}
