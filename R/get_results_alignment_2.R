##' @title Get alignment 2 results
##'
##' fitting with lmer led to singularity even when reduced to just subject level
##' random intercept.
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_alignment_2 <- function(data_clean, iv, dv) {
  results_alignment_2 <-
    data_clean %>%
    nest_by(id, allocation, npv_amount, reliability_amount, alignment) %>%
    aov_4(
      allocation ~
      alignment * reliability_amount + (npv_amount | id),
      data = .,
      print.formula = T
    ) %>%
    apa_print()

  return(results_alignment_2)
}
