##' @title Navigate aggregation experiment
##'
##' If instructions, click next
##' If html button, pick one randomly and click next (accounts also for single button pages)
##' If multi choice, then click one of every two pair of radios randomly
##' If survey dropdown, then pick one randomly
##' If survey number input, then enter random number between minimum and maximum values
##' If survey text input, then enter random "test1234" with 16 random numbers (unless it's hidden)
##' If survey radio input, then pick one randomly

##' @param session
##'
##' @param screenshot
##'
##' @return
##' @author Shir Dekel
##' @export
navigate_webdriver_aggregation <- function(session, screenshot) {

  if(screenshot) session$takeScreenshot()

  if(!is_empty(session$findElements("#jspsych-instructions-next"))) {

    navigate_webdriver("#jspsych-instructions-next", session)

    if(screenshot) session$takeScreenshot()

  } else if(!is_empty(session$findElements(".jspsych-html-button-response-button"))) {

    html_button <-
      session$findElements(".jspsych-html-button-response-button")

    html_button_sample <-
      html_button %>%
      map_chr(
        ~ .x$getAttribute("id")
      ) %>%
      sample(1)

    navigate_webdriver(str_c("#", html_button_sample), session)

    if(screenshot) session$takeScreenshot()

  } else if(!is_empty(session$findElements(".ranking")) | !is_empty(session$findElements(".allocation"))) {

    if (!is_empty(session$findElements(".ranking"))) mock_data_ranking(session, screenshot)

    if (!is_empty(session$findElements(".allocation"))) mock_data_allocation(session, screenshot)
   
    navigate_webdriver(".jspsych-btn", session)

    if (screenshot) session$takeScreenshot()

  } else if(!is_empty(session$findElements("input"))) {

    if(!is_empty(session$findElements("select"))) mock_data_select(session, screenshot)

    if(!is_empty(session$findElements("input[type=text]"))) mock_data_text(session, screenshot)

    if(!is_empty(session$findElements("input[type=number]"))) mock_data_number(session, screenshot)

    if(!is_empty(session$findElements("input[type=radio]"))) mock_data_radio(session, screenshot)

    navigate_webdriver(".jspsych-btn", session)

    if(screenshot) session$takeScreenshot()
  }

}
