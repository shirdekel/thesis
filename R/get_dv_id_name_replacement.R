##' @title Get DV ID name replacement
##'
##' Prepare a named vector for subsequent recoding at `get_dv_id_name()`
##'
##' @param dv_match_pattern
##' @return
##' @author Shir Dekel
##' @export
get_dv_id_name_replacement <- function(dv_match_pattern) {

  dv <-
    c(
      "allocation",
      "ranking",
      "confidence",
      "justification",
      "edu",
      "exp",
      "npv_knowledge"
    )

  dv_id_name_replacement <-
    dv %>%
    set_names(dv_match_pattern)

  return(dv_id_name_replacement)

}
