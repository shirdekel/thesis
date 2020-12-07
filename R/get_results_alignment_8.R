##' @title Get alignment results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_alignment_8 <- function(data_clean, iv, dv) {
  data_clean %>%
    lm(allocation ~ alignment * reliability_amount * npv_amount,
       data = .) %>%
    apa_print()
}
