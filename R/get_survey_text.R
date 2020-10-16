##' @title Get survey text

##' @return
##' @author Shir Dekel
##' @export
get_survey_text <- function(label_text, name, minlength = NULL, maxlength = NULL, required = NULL, size = NULL, prefix = NULL, suffix = NULL) {
  survey_text <-
    withTags(
      p(
        label(
          `for` = name,
          label_text
        ),
        prefix,
        input(
          type = "text",
          id = name,
          name = name,
          minlength = minlength,
          maxlength = maxlength,
          required = required,
          size = size,
        ),
        suffix
      )
    )

  return(survey_text)
}
