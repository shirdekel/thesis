##' @title Get multipliers for anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_multiplier <- function() {
  list(
    c(0.7, 0.9),
    c(1.1, 1.2)
  ) %>%
    map(~ .x %>%
          list(c(1,1), .)) %>%
    transpose()
}
