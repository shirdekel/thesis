##' @title Get alignment 5 results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_alignment_5 <- function(data_clean, iv, dv) {
    results_alignment_5 <-
        data_clean %>%
        nest_by(id, forecast_mean, npv_amount, reliability_amount, alignment) %>%
        aov_4(
            forecast_mean ~
            alignment * reliability_amount + (npv_amount | id),
            data = .,
            print.formula = T
        ) %>%
        apa_print()

    return(results_alignment_5)
}
