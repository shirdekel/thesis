##' @title Get interstitial 1 for alignment 8

##' @return
##' @author Shir Dekel
##' @export
##' @param interstitial_number
get_interstitial <- function(interstitial_number) {
  interstitial_name <-
    str_c(
      "interstitial",
      interstitial_number,
      sep = "_"
    )

  interstitial_html <-
    withTags(
      p(
        label(
          `for` = interstitial_name,
          str_c(
            "To show that you are reading and paying attention,",
            "please click on the following checkbox",
            strong("before") %>%
              as.character(),
            "clicking on \"Continue\": ",
            sep = " "
          ) %>%
            HTML()
        ),
        input(
          type = "checkbox",
          name = interstitial_name,
          id = "pass",
        ),
        .noWS = "inside"
      )
    )

  div(
    p(
      "You will now see project display #' +
 jsPsych.data.getLastTrialData().select('current_project_display_order').values[0] +
'. It is important that you pay attention and read through the task carefully."
    ),
    interstitial_html
  ) %>%
    as.character() %>%
    # .noWS didn't work for the newline between the two p tags
    str_remove_all("\\n") %>%
    str_c(
      "function() {
        interstitial = '", ., "'
        return interstitial
        }"
    ) %>%
    insert_javascript()
}
