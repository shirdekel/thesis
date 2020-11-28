##' @title Reliability anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_reliability_anecdotes_2 <- function() {

  list(
      c(95, 87),
      c(88, 96)
  ) %>%
      map(as.character)
}
