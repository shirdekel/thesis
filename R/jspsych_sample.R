##' @title Generate jsPsych sample with replacement

##' @return
##' @author Shir Dekel
##' @export
jspsych_sample <- function(condition_level, condition_name) {
  if (!is.numeric(condition_level)) {
    condition_level <-
      condition_level %>%
      map(
        ~ str_c("'", .x, "'")
      )
  }

  condition_level %>%
      str_c(collapse = ", ") %>%
      str_c(
        condition_name,
          " = jsPsych.randomization.sampleWithReplacement([",
          .,
          "], 1)[0]"
      )

}
