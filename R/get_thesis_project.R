##' @title Get thesis project

##' @return
##' @author Shir Dekel
##' @export
get_thesis_project <- function() {
  thesis_project <-
    c(
      c("aggregation") %>%
        rep(4),
      "alignment" %>%
        rep(8),
      "anecdotes" %>%
        rep(2)
    )
  return(thesis_project)
}
