##' @title Get dv match regex
##'
##' Generate regex that will be used to extract question IDs
##' The idea is to match a DV pattern and then go back and find the question ID associated with it (at the beginning of that block)

##' @param dv_match_pattern
##'
##' @return
##' @author Shir Dekel
##' @export
get_dv_match_regex <- function(dv_match_pattern) {

  dv_match_regex <-
    rx() %>%
    rx_begin_capture() %>%
    # Make sure you don't capture the "low" in "below"
    rx_word_edge() %>%
    # Capture either question IDs (e.g., Q321) or initially coded IDs (e.g., lowrank)
    rx_any_of("Ql") %>%
    rx_word() %>%
    rx_end_capture() %>%
    # Allow for eval_highAhighV2_o2 edge case (doesn't match without the space and linebreak)
    rx_find(" ") %>%
    rx_maybe(rx_line_break()) %>%
    rx_anything() %>%
    rx_either_of(dv_match_pattern) %>%
    as.character()

  return(dv_match_regex)
}
