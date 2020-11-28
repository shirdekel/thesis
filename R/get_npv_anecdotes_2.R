##' @title NPV anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_npv_anecdotes_2 <- function() {
  list(
    c(900, 101),
    c(100, 901)
  ) %>%
    map(as.character)
}
