#' Get number-type survey question
#'
#'
#' @param label_text
#' @param name
#' @param min
#' @param max
#' @param width
#' @param prefix
#' @param suffix
#' @param class
#' @return
#' @export
#'
#' @examples
get_survey_number <- function(label_text, name, min = 0, max = 100, width = 70, prefix = "", suffix = "", class = NULL) {
  survey_number <- withTags(
    p(
      p(
        label(
          `for` = name,
          label_text
        )
      ),
      prefix,
      input(
        type = "number",
        class = class,
        id = name,
        name = name,
        min = min,
        max = max,
        required = NA,
        style = str_c("width:", width, "px")
      ),
      suffix
    )
  )

  return(survey_number)
}
