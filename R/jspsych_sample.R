##' @title Generate jsPsych sample with replacement

##' @return
##' @author Shir Dekel
##' @export
jspsych_sample <- function(conditions, condition_name) {

  conditions %>%
      str_c(collapse = ", ") %>%
      str_c(
        condition_name,
          " = jsPsych.randomization.sampleWithReplacement([",
          .,
          "], 1)[0]"
      )

}
