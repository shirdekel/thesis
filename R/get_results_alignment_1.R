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
        mutate(across(project, as.numeric)) %>%
    nest_by(
      id, project, npvReliability, alignment,
      allocation
    ) %>%
    lm(
      allocation ~
      project * npvReliability * alignment,
      data = .
    )

    model %>%
    apa_print() %>%
    pluck("full_result")

}
