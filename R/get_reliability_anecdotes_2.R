##' @title Reliability anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_reliability_anecdotes_2 <- function() {
  list(
    seq(from = 91, to = 95),
    seq(from = 81, to = 85)
  ) %>%
    transpose() %>%
    map(
      ~ .x %>%
        unlist() %>%
        as.character()
    )
}
