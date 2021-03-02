##' @title Get thesis project

##' @return
##' @author Shir Dekel
##' @export
get_thesis_project <- function() {
  thesis_project <-
    c(
      c("aggregation") %>%
        rep(3),
      "alignment" %>%
        rep(6),
      "anecdotes" %>%
        rep(2)
    )
  return(thesis_project)
}
