##' @title Get DV ID name
##'
##' Recode

##' @param dv_id_match
##'
##' @return
##' @author Shir Dekel
##' @export
get_dv_id_name <- function(dv_id_match) {

  dv_match_pattern <-
    get_dv_match_pattern()

  dv_id_name_replacement <-
    get_dv_id_name_replacement(dv_match_pattern)

  list(
    dv_id_match %>%
      last() %>%
      recode(
        !!!dv_id_name_replacement
      )
  )

}
