##' @title Parse condition allocation JS code for E3a

##' @return
##' @author Shir Dekel
##' @export
condition_allocation_experiment3a <- function() {

  1:10 %>%
    str_c(collapse = ", ") %>%
    str_c(
      "project_variation_condition = jsPsych.randomization.sampleWithReplacement([",
      .,
      "], 1)"
    ) %>%
    c(
    "similarity_condition = jsPsych.randomization.sampleWithoutReplacement(['low', 'high'], 1)[0]",
    "urlvar = jsPsych.data.urlVariables()",
    "if urlvar then similarity_condition = urlvar.similarity; project_variation_condition = urlvar.project_variation;"
  ) %>%
    coffee_compile(bare = TRUE)

}
