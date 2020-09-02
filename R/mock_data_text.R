##' @title Input mock text

##' @param screenshot
##'
##' @param session
##'
##' @return
##' @author Shir Dekel
##' @export
mock_data_text <- function(session, screenshot) {

  text <-
    session$findElements("input[type='text']")

  hidden <-
    text %>%
    map_lgl(~ .x$getAttribute("style") %>%
              str_detect("display: none"))

  text <-
    text[!hidden]

  text_value <-
    str_c(
      "test1234", # For later filtering
      sample(1:9, 16, replace = TRUE) %>% # To get a valid prolific ID (24 alphanumerics)
        str_c(collapse = "")
    )

  text %>%
    map(~.x$setValue(text_value))

  if(screenshot) session$takeScreenshot()

}
