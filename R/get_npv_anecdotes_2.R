##' @title NPV anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_npv_anecdotes_2 <- function() {
  list(
    c(900, 100),
    c(905, 105)
  ) %>%
    pmap(
      ~ runif(n = 5, min = .x, max = .y) %>%
        round()
    ) %>%
    transpose() %>%
    simplify_all() %>%
    map(as.character)
}
