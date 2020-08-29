##' @title Navigate webdriver

##' @param css
##'
##' @param session
##'
##' @return
##' @author Shir Dekel
##' @export
navigate_webdriver <- function(css, session) {

  search <- session$findElement(css)
  search$click()

}
