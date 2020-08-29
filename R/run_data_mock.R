##' @title Run mock data
##'
##' If instructions, click next
##' If html button, pick on randomly and click next (accounts also for single button pages)
##' If multi choice, then click one of every two pair of radios randomly
##' If survey number input, then enter random number between minimum and maximum values
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

  instructions_next_id <-
    "#jspsych-instructions-next"

  html_button_class <-
    ".jspsych-html-button-response-button"

  multi_choice_class <-
    ".jspsych-survey-multi-choice-question"

  multi_choice_id <-
    "#jspsych-survey-multi-choice-next"

  survey_html_id <-
    "#jspsych-survey-html-form-next"

  button_text <- ""

  while(button_text != "End experiment") {

    if(!is_empty(session$findElements(instructions_next_id))) {
      navigate_webdriver(instructions_next_id, session)
      if(screenshot) session$takeScreenshot()
    } else if(!is_empty(session$findElements(html_button_class))) {
      html_button <-
        session$findElements(html_button_class)

      html_button_sample <-
        html_button %>%
        map_chr(
          ~ .x$getAttribute("id")
        ) %>%
        sample(1)

      navigate_webdriver(str_c("#", html_button_sample), session)
      if(screenshot) session$takeScreenshot()
    } else if(!is_empty(session$findElements(multi_choice_class))) {
      session$findElements(multi_choice_class) %>%
        map(
          ~ {
            radio <-
              .x$findElements("input[type='radio']")

            multi_choice_sample <-
              radio %>%
              map_chr(
                ~ .x$getAttribute("id")
              ) %>%
              sample(1)

            navigate_webdriver(str_c("#", multi_choice_sample), session)
          }
        )
      navigate_webdriver(multi_choice_id, session)
      if(screenshot) session$takeScreenshot()
    } else if(!is_empty(session$findElements(survey_html_id))) {
      input_number <-
        session$findElement("input[type=number]")

      input_number_value <-
        c("min", "max") %>%
        map(~input_number$getAttribute(.x) %>%
              as.numeric()) %>%
        pmap(~ seq(.x, .y)) %>%
        unlist() %>%
        sample(1) %>%
        as.character()

      input_number$setValue(input_number_value)
      navigate_webdriver(survey_html_id, session)
      if(screenshot) session$takeScreenshot()
    }

    if(!is_empty(session$findElements(html_button_class))) {
      html_button_1 <-
        session$findElements(html_button_class) %>%
        .[[1]]

      button <-
        html_button_1$findElement("button")

      button_text <-
        button$getText()
    }
  }

  save_data_mock(session, data_folder)

}
