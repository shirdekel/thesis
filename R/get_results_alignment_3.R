##' @title Get alignment 3 results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_alignment_3 <- function(data_clean, iv, dv) {
    results_alignment_3 <-
        data_clean %>%
        nest_by(id, allocation, npv_amount, reliability_amount, alignment) %>%
        aov_4(
            allocation ~
             (npv_amount * alignment * reliability_amount | id),
            data = .,
            print.formula = T
        ) %>%
        apa_print()

    return(results_alignment_3)
}
