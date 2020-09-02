##' @title Generate select input mock data
##'
##' @param session
##' @param screenshot
##'
##' @return
##' @author Shir Dekel
##' @export
mock_data_select <- function(session, screenshot) {

  select <-
    session$findElements("select")

  select %>%
    map(~ .x$findElements("option") %>%
          map_chr(~ .x$getValue()) %>%
          .[!. %in% ""] %>%  # Remove empty selection from possible options
          sample(1) %>%
          str_c("[value='", ., "']") %>%
          navigate_webdriver(session)
    )

  if(screenshot) session$takeScreenshot()

}
