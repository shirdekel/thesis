#' Get number-type survey question
#'
#' @param question_text
#' @param question_name
#' @param question_max
#' @param question_min
#'
#' @return
#' @export
#'
#' @examples
get_survey_number <- function(question_text, question_name, question_min = "0", question_max = "100") {

  survey_number <- withTags(
    p(
      label(`for` = question_name,
            question_text),
      input(type = "number",
            id = question_name,
            name = question_name,
            min = question_min,
            max = question_max,
            required = NA)
    )
  )

  return(survey_number)
}
