##' @title Parse condition allocation JS code for Alignment 8

##' @return
##' @author Shir Dekel
##' @export
get_condition_allocation_alignment_8 <- function() {
  list(
    seq_len(5) %>%
      list() %>%
    rep(2)%>%
    append(list(seq_len(2))),
    list(
      "project_variation_condition",
      "business_name_variation_condition",
      "display_variation_condition"
    )
  ) %>%
    pmap_chr(
      ~ jspsych_sample(.x, .y)
    ) %>%
    c(
      "alignment_condition = jsPsych.randomization.sampleWithoutReplacement(['low', 'high'], 1)[0]",
      "reliability_type_condition = jsPsych.randomization.sampleWithoutReplacement(['implicit', 'explicit'], 1)[0]",
      "urlvar = jsPsych.data.urlVariables()",
      "if typeof urlvar.project_variation != 'undefined' then project_variation_condition = urlvar.project_variation;",
      "if typeof urlvar.business_name_variation != 'undefined' then business_name_variation_condition = urlvar.business_name_variation;",
      "if typeof urlvar.display_variation != 'undefined' then display_variation_condition = urlvar.display_variation;",
      "if typeof urlvar.alignment != 'undefined' then alignment_condition = urlvar.alignment;",
      "if typeof urlvar.reliability_type != 'undefined' then reliability_type_condition = urlvar.reliability_type;"
    ) %>%
    coffee_compile(bare = TRUE)
}
