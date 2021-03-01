##' @title Get alignment results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_alignment_1 <- function(data_clean, iv, dv) {
  set_sum_contrasts()
  model <-
    data_clean %>%
    nest_by(
      id, npv_amount, reliability_amount, alignment,
      allocation
    ) %>%
    lm(
      allocation ~
      npv_amount * reliability_amount * alignment,
      data = .
    )

    model %>%
    apa_print() %>%
    pluck("full_result")

}
