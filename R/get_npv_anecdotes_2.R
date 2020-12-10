##' @title NPV anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_npv_anecdotes_2 <- function() {
  list(
    c(901, 101),
    c(902, 102),
    c(903, 103),
    c(904, 104),
    c(905, 105)
  ) %>%
    map(as.character)
}
