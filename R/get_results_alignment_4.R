##' @title Get alignment 4 results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_alignment_4 <- function(data_clean, iv, dv) {
    results_alignment_4 <-
        data_clean %>%
        nest_by(id, forecastMean, project.npv, npvReliability, alignment) %>%
        aov_4(
            forecastMean ~
            alignment * npvReliability + (project.npv | id),
            data = .,
            print.formula = T
        ) %>%
        apa_print()

    return(results_alignment_4)
}
