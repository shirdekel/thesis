##' @title Get multipliers for anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_multiplier <- function() {
  list(
    c(0.1, 0.2),
    c(0.3, 0.4),
    c(0.5, 0.6),
    c(0.7, 0.8),
    c(1.1, 1.2)
  ) %>%
    map(~ .x %>%
          list(c(1,1), .))
}
