##' @title String comparison value
##'
##' from Anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_value_string <- function() {
  low_similarity <-
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
        c("Reduced Instruction Set Computing",
          "Complex Instruction Set Computing"),
        c("parcel", "freight")
      ),
      list(
        c("fast food", "casual sit-down dining"),
        c("rock", "pop")
      )
    )

  high_similarity <-
    low_similarity %>%
    map_depth(
      2,
      ~ .x %>%
        .[[1]] %>%
        rep(2)
    )

  list(
    low_similarity,
    high_similarity
  ) %>%
    set_names("low", "high")
}
