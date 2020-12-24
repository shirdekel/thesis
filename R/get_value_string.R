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
        c("advertising", "subscription"),
        c("over-the-counter", "prescription-only")
      ),
      list(
        c("intracity", "intercity"),
        c("mixed office-retail", "apartment")
      ),
      list(
        c("enterprise", "ordinary consumers"),
        c("offshore", "onshore")
      ),
      list(
        c("Reduced Instruction Set Computing", "Complex Instruction Set Computing"),
        c("parcel", "freight")
      ),
      list(
        c("fast food", "casual sit-down dining"),
        c("rock", "pop")
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
