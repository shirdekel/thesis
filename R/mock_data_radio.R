##' @title Select mock radio data

##' @param screenshot
##'
##' @param session
##'
##' @return
##' @author Shir Dekel
##' @export
mock_data_radio <- function(session, screenshot) {

  radio <-
    session$findElements("input[type='radio']")

  radio_name <-
    radio %>%
    map_chr(~.x$getAttribute("name")) %>%
    unique() %>%
    str_c(
      "input[name='",
      .,
      "']"
    ) %>%
    map(
      ~ session$findElements(.x)
    )

  radio_name %>%
    map(
      ~.x %>%
        map_chr(
          ~ .x$getAttribute("id")
        ) %>%
        sample(1) %>%
        str_c("#", .) %>%
      navigate_webdriver(session)
    )

  if(screenshot) session$takeScreenshot()

}
