##' @title Get aggregation 1 results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_aggregation_1 <- function(data_clean, iv, dv) {
  aov_ez(
    data = data_clean,
    dv = "risk",
    id = "id",
    between = c("Alignment", "Awareness"),
    within = c("Presentation"),
    anova_table = "pes",
    type = 2
  ) %>%
    apa_print(es = "pes", mse = FALSE)
}
