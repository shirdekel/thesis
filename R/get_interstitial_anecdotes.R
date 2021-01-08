##' @title Get interstitial 1 for anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
##' @param interstitial_number
get_interstitial_anecdotes <- function(interstitial_number) {
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
            "It is important that you pay attention and read through the task",
            "carefully. To show that you are reading and paying attention,",
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
      str_c(
        str_c(
          "You will now see project display #' + jsPsych.data.",
          "getLastTrialData().select('current_project_display_order').values[0]"
        ),
        " + '. Please consider this display independently from all the other",
        "displays. That is, your allocation should be informed only by the",
        "instructions and project descriptions that are on the same webpage.",
        sep = " "
      )
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
