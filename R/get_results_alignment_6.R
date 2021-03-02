##' @title Get alignment 6 results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_alignment_6 <- function(data_clean, iv, dv) {
    results_alignment_6 <-
        data_clean %>%
        nest_by(id, allocation, npv_amount, variance, hint) %>%
        aov_4(
            allocation ~
            hint * variance + (npv_amount | id),
            data = .,
            print.formula = T
        ) %>%
        apa_print()

    return(results_alignment_6)
}
