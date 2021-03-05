##' @title Get vector of thesis Rmd paths
##'
##' For use in `render_with_deps()`

##' @return
##' @author Shir Dekel
##' @export
get_thesis_rmd <- function() {
  c(
    "doc/thesis/rmd/aggregation/introduction.Rmd",
    "doc/thesis/rmd/aggregation/experiment_1/introduction.Rmd"
  )
}
