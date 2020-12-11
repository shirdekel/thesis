##' @title String comparison value
##'
##' from Anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_value_string <- function() {
  low_alignment <-
    list(
      list(
        c("digital", "analogue"),
        c("offshore", "onshore")
      ),
      list(
        c("value_string_3_1", "value_string_3_2"),
        c("value_string_4_1", "value_string_4_2")
      ),
      list(
        c("value_string_5_1", "value_string_5_2"),
        c("value_string_6_1", "value_string_6_2")
      ),
      list(
        c("value_string_7_1", "value_string_7_2"),
        c("value_string_8_1", "value_string_8_2")
      ),
      list(
        c("value_string_9_1", "value_string_9_2"),
        c("value_string_10_1", "value_string_10_2")
      )
    )

  high_alignment <-
    low_alignment %>%
    map_depth(
      2,
      ~ .x %>%
        .[[1]] %>%
        rep(2)
    )

  list(
    low_alignment,
    high_alignment
  ) %>%
    set_names("low", "high")
}
