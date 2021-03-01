##' @title Get dv match variables
##'
##' Used for subsequent renaming of column names using `dv_match$dv_pattern` and `dv_match$dv_replacement` in `rename_masters()`

##' @param reference_doc_split
##'
##' @return
##' @author Shir Dekel
##' @export
get_dv_match <- function(reference_doc_split) {

  dv_match <-
    reference_doc_split %>%
    clean_and_filter_reference_doc_split() %>%
    get_dv_match_components() %>%
    mutate(
      dv_pattern = get_dv_pattern(dv_id, dv_pattern_suffix),
      dv_replacement = get_dv_replacement_masters(
        block,
        dv_id_name,
        phase,
        product,
        dv_replacement_suffix
      )
    )

  return(dv_match)

}
