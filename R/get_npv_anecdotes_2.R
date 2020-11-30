##' @title NPV anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_npv_anecdotes_2 <- function() {
  list(
    c(900, 101),
    c(901, 100)
  ) %>%
    map(as.character) %>%
        list() %>%
        rep(2)

}
