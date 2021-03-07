##' @title Get aggregation 1 results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_aggregation_1 <- function(data_clean, iv, dv) {
  omnibus <-
    aov_ez(
      data = data_clean,
      dv = "proportion",
      id = "id",
      between = c("alignment", "awareness"),
      within = c("presentation"),
      anova_table = "pes",
      type = 2
    ) %>%
    apa_print(es = "pes", mse = FALSE)

  neg_sum_apa <-
    data_clean %>%
    nest_by(id, choice_neg_1, choice_neg_2) %>%
    mutate(neg_sum = sum(choice_neg_1, choice_neg_2)) %>%
    pull(neg_sum) %>%
    sum() %>%
    as.integer() %>%
    printnum(numerals = FALSE)

  lst(
    omnibus,
    neg_sum_apa
  )
}
