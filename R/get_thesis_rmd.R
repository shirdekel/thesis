##' @title Get vector of thesis Rmd paths
##'
##' For use in `render_with_deps()`

##' @return
##' @author Shir Dekel
##' @export
get_thesis_rmd <- function() {
  file.path("doc", "thesis", "_bookdown.yml") %>%
    read_yaml() %>%
    pluck("rmd_files")
}
