##' @title Get aggregation 1 results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_aggregation_1 <- function(data_clean, iv, dv) {
  model <-
    aov_ez(
      data = data_clean,
      dv = "proportion",
      id = "id",
      between = c("alignment", "awareness"),
      within = c("presentation"),
      anova_table = "pes",
      type = 2
    )

  anova <-
    model %>%
    apa_print(es = "pes", mse = FALSE) %>%
    pluck("full_result")

  simple_effects <-
    model %>%
    emmeans(~ alignment * presentation) %>%
    pairs(adjust = "none") %>%
    apa_print() %>%
    pluck("full_result")

  simple_effects_all <-
    model %>%
    emmeans(~ alignment * presentation * awareness) %>%
    pairs(adjust = "none") %>%
    apa_print() %>%
    pluck("full_result")

  neg_sum_apa <-
    data_clean %>%
    nest_by(id, choice_neg_1, choice_neg_2) %>%
    mutate(neg_sum = sum(choice_neg_1, choice_neg_2)) %>%
    pull(neg_sum) %>%
    sum() %>%
    as.integer() %>%
    printnum(numerals = FALSE)

  aggregated_values_samuelson <-
    get_aggregated_values(
      outcome_positive = 200 %>%
        rep(10),
      prob_positive = 0.5 %>%
        rep(10),
      300
    )

  loss_prob_samuelson <-
    get_loss_prob(
      aggregated_values_samuelson$outcome_aggregated,
      aggregated_values_samuelson$prob_aggregated
    )

  data_individual <-
    data_clean %>%
    nest_by(id, presentation, proportion)

  gambles_individual <-
    c("separate", "joint") %>%
    map(~ data_individual %>%
      filter(presentation == .x) %>%
      pull(proportion))

  gambles_aggregated <-
    data_clean %>%
    nest_by(id, choice_aggregated) %>%
    pull(choice_aggregated)

  individual_aggregated <-
    gambles_individual %>%
    map(~ t_print(gambles_aggregated, .x, paired = TRUE)) %>%
    set_names("separate", "joint")

  lst(
    neg_sum_apa,
    loss_prob_samuelson,
    individual_aggregated
  ) %>%
    append(anova) %>%
    append(simple_effects) %>%
    append(simple_effects_all)
}
