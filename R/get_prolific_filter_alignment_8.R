##' @title Prolific filters for alignment 8

##' @return
##' @author Shir Dekel
##' @export
get_prolific_filter_alignment_8 <- function() {

  ## Initial batch had incorrect input IDs
  list(
    c(
      "datetime > '2020-07-28'",
      "datetime < '2020-12-14'"
    ),
    # Fixed
    c(
      "datetime > '2020-12-14'",
      "datetime < '2021-01-12'"
    ),
    # Fixed - high explicit top up
    c(
      "datetime > '2021-01-12'",
      "alignment == 'high'",
      "reliability_type == 'explicit'"
    ),
    # Fixed - high implicit top up
    c(
      "datetime > '2021-01-12'",
      "alignment == 'high'",
      "reliability_type == 'implicit'"
    )
  )
}
