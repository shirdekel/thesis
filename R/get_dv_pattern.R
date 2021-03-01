##' @title Get DV pattern

##' @param dv_id
##'
##' @param dv_pattern_suffix
##'
##' @return
##' @author Shir Dekel
##' @export
get_dv_pattern <- function(dv_id, dv_pattern_suffix) {

  str_c(
    dv_id,
    dv_pattern_suffix,
    sep = "_"
  )

}
