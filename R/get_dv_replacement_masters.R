##' @title Get DV replacement for masters Experiment
##'
##' @param block
##' @param phase
##' @param dv_id_name
##' @param dv_replacement_suffix
##' @param product
##'
##' @return
##' @author Shir Dekel
##' @export
get_dv_replacement_masters <- function(
  block,
  dv_id_name,
  phase,
  product,
  dv_replacement_suffix
) {

  str_c(
    block %>%
      str_remove("eval_"),
    dv_id_name,
    phase,
    product,
    dv_replacement_suffix,
    sep = "_"
  )

}
