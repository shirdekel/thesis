##' @title Parse condition allocation JS code for E3

##' @return
##' @author Shir Dekel
##' @export
condition_allocation_experiment3 <- function() {

  c(
    "similarity_condition = jsPsych.randomization.sampleWithoutReplacement(['low', 'high'], 1)[0]",
  ) %>%
    coffee_compile(bare = TRUE)

}
