##' @title String comparison value
##'
##' from Anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_value_string <- function() {
  list(
    list(
      c("digital", "analogue"),
      c("offshore", "onshore")
    ),
    list(
      c("value_string_3_1", "value_string_3_2"),
      c("value_string_4_1", "value_string_4_2")
    )
  ) %>%
    map(~ .x %>%
      transpose() %>%
      map(unlist))
}
