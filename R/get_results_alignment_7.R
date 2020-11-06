##' @title Get alignment results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_alignment_7 <- function(data_clean, iv, dv) {
  results_alignment_7 <-
    c("low", "high") %>%
    map(
      ~ data_clean %>%
        nest_by(
          id, allocation, npv_cond, reliability_amount, reliability_type,
          alignment, project
        ) %>%
        group_by(
          id, npv_cond, reliability_amount, reliability_type,
          alignment
        ) %>%
        mutate(
          project_variation = seq_len(2)
        ) %>%
        ungroup() %>%
        filter(alignment == .x) %>%
        aov_4(
          allocation ~
            1 + (reliability_type * reliability_amount * npv_cond *
                 project_variation | id),
          data = .
        ) %>%
        apa_print()
    ) %>%
    set_names("alignment_low", "alignment_high")

  return(results_alignment_7)
}
