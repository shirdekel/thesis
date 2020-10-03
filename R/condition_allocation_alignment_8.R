##' @title Parse condition allocation JS code for Alignment 8

##' @return
##' @author Shir Dekel
##' @export
condition_allocation_alignment_8 <- function() {
  1:5 %>%
    str_c(collapse = ", ") %>%
    str_c(
      "project_variation_condition = jsPsych.randomization.sampleWithReplacement([",
      .,
      "], 1)"
    ) %>%
    c(
      "alignment_condition = jsPsych.randomization.sampleWithoutReplacement(['low', 'high'], 1)[0]",
      "reliability_type_condition = jsPsych.randomization.sampleWithoutReplacement(['implicit', 'explicit'], 1)[0]",
      "urlvar = jsPsych.data.urlVariables()",
      "if typeof urlvar.project_variation != 'undefined' then project_variation_condition = urlvar.project_variation;",
      "if typeof urlvar.alignment != 'undefined' then alignment_condition = urlvar.alignment;",
      "if typeof urlvar.reliability_type != 'undefined' then reliability_type_condition = urlvar.reliability_type;"
    ) %>%
    coffee_compile(bare = TRUE)
}
