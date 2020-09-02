##' @title Run mock data
##'
##' Loop until last end experiment page
##'
##' @param session
##' @param data_folder
##' @param url
##'
##' @return
##' @author Shir Dekel
##' @export
run_data_mock <- function(url, session, data_folder, screenshot = FALSE) {

  session$go(url)

  button_text <- ""

  while(button_text != "End experiment") {

    navigate_webdriver_aggregation(session, screenshot)

    if(!is_empty(session$findElements(".jspsych-html-button-response-button"))) {
      html_button_1 <-
        session$findElements(".jspsych-html-button-response-button") %>%
        .[[1]]

      button <-
        html_button_1$findElement("button")

      button_text <-
        button$getText()

    }

  }

  save_data_mock(session, data_folder)

}
