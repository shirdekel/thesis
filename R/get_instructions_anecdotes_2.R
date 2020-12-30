##' @title Instructions anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_instructions_anecdotes_2 <- function() {
  introduction <-
    c(
      str_c(
        "Imagine you are an executive in a multi-business company and that you",
        "are presented with two projects to potentially invest in. Your job is",
        "to decide how to allocate the capital available in your budget",
        "between these two projects.",
        sep = " "
      ),
      str_c(
        "In total, you will see five of these project pairs (across five",
        "separate web pages). Each page will also contain relevant information",
        "about the projects.",
        sep = " "
      )
    ) %>%
    map(p)

  instructions_test <-
    str_c(
      "Test yourself on the above instructions",
      "How many pairs of projects will you see?",
      sep = ". "
    ) %>%
    get_survey_number(
      name = "instructions_test",
      suffix = " projects"
    )

  instructions_html <-
    tags$fieldset(
      introduction,
      instructions_test,
      tags$legend("Instructions")
    ) %>%
    as.character()

  instructions <-
    trial_generic(
      "survey-html-form",
      html = instructions_html,
      data = insert_property(stage = "instructions")
    )

  return(instructions)
}
