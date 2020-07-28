##' @title Pase condition allocation JS code

##' @return
##' @author Shir Dekel
##' @export
condition_allocation <- function() {

  c("condition = jsPsych.randomization.sampleWithoutReplacement(['naive_separate_absent', 'naive_separate_present'], 1)[0]",
    "regex_awareness = /(.*)_.*_.*/",
    "regex_presentation = /.*_(.*)_.*/",
    "regex_distribution = /.*_.*_(.*)/") %>%
    coffee_compile(bare = TRUE)

}
