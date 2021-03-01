##' @title Get DV ID

##' @param dv_id_match
##'
##' @return
##' @author Shir Dekel
##' @export
get_dv_id <- function(dv_id_match) {

  list(
    dv_id_match %>%
      .[,2]
  )

}
