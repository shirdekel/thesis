##' Try run phantomjs and retry if it errors.
##'
##' This is needed because of (this webdriver
##' issue)[https://github.com/rstudio/webdriver/issues/59]
##'
##' From https://stackoverflow.com/a/20770711/13945974
##' 
##' @title Try run_phantom_js()

##' @return
##' @author Shir Dekel
##' @export
try_run_phantomjs <- function(max_attempt = 3) {
  phantom_js <- NULL
  attempt <- 0
  while (is.null(phantom_js) && attempt <= max_attempt) {
    attempt <- attempt + 1
    try(
      phantom_js <-
        run_phantomjs()
    )
  }
  return(phantom_js)
}
