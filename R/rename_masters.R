##' @title Rename Masters data
##'
##' @param masters_filtered
##' @param dv_match
##'
##' @return
##' @author Shir Dekel
##' @export
rename_masters <- function(masters_filtered, dv_match) {

  masters_renamed <-
    masters_filtered %>%
    rename_with(
      ~ .x %>%
        # Replace old values with new, but make sure replacement only happens once (str_replace_all() does not do this).
        # Specifically, `Q420` was replaced with `pre_lowAhighV1_o2_allocation`, and then that instance of `lowAhighV1_o2` was replaced with `pre_lowAhighV1_o2_ranking`
        mgsub(
          dv_match$dv_pattern,
          dv_match$dv_replacement,
          # Turn on perl to use lookahead
          perl = TRUE
        )
    ) %>%
    rename_with(
      ~ .x %>%
        mgsub(pattern = c("demographics_", "7_TEXT"),
              replacement = c("", "other"))
    )

  return(masters_renamed)

}
