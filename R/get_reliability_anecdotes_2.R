##' @title Reliability anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_reliability_anecdotes_2 <- function() {
  list(
    c(91, 86),
    c(95, 90)
  ) %>%
    pmap(
      ~ runif(n = 5, min = .x, max = .y) %>%
        round()
    ) %>%
    transpose() %>%
    map(
      ~ .x %>%
        unlist() %>%
        as.character()
    )
}
