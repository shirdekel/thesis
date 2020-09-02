##' @title Mock number data

##' @param screenshot
##'
##' @param session
##'
##' @return
##' @author Shir Dekel
##' @export
mock_data_number <- function(session, screenshot) {

  input_number <-
    session$findElements("input[type=number]")

  input_number %>%
    map(
      function(input_number_element) c("min", "max") %>%
        map(~ input_number_element$getAttribute(.x) %>%
              as.numeric()) %>%
        pmap(~ seq(.x, .y)) %>%
        unlist() %>%
        sample(1) %>%
        as.character() %>%
        input_number_element$setValue()
    )

  if(screenshot) session$takeScreenshot()

}
