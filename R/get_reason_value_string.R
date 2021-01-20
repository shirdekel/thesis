##' @title Reason for string value

##' @return
##' @author Shir Dekel
##' @export
get_reason_value_string <- function() {
  low_similarity <-
    list(
      get_reason_value_string_negative(),
      get_reason_value_string_positive()
    )

  high_similarity <-
    low_similarity %>%
    map_depth(
      3,
      ~ .x %>%
        .[[1]] %>%
        rep(2)
    )

  c(
    high_similarity,
    low_similarity,
    NA
  )
}
