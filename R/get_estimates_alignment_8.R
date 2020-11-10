##' @title Get estimates

##' @return
##' @author Shir Dekel
##' @export
##' @param df
get_estimates_alignment_8 <- function(df) {
  data_simulation_hypotheses <-
    get_data_simulation_hypotheses(df)

  model_alignment_2 <-
    get_model_alignment_2()

  model_alignment_7 <-
    get_model_alignment_7()

  combined_value <-
    list(
      "(Intercept)",
      "sd__(Intercept)",
      "sd__Observation"
    ) %>%
    map(
      function(term_value) {
        list(
          model_alignment_2,
          model_alignment_7
        ) %>%
          map_dbl(
            ~ .x %>%
              filter(term == term_value) %>%
              pull(estimate)
          ) %>%
          mean()
      }
    ) %>%
    set_names(
      "intercept",
      "random_intercept_sd",
      "residual_sd"
    )

  estimate_label_alignment_2 <-
    c(
      "npv_amount",
      "alignment1",
      "alignment1:npv_amount",
      "reliability_amount1",
      "reliability_amount1:npv_amount",
      "alignment1:reliability_amount1",
      "alignment1:reliability_amount1:npv_amount"
    )

  estimate_alignment_2 <-
    estimate_label_alignment_2 %>%
    map(
      ~ model_alignment_2 %>%
        filter(term == .x) %>%
        pull(estimate)
    ) %>%
    set_names(
      "npv_amount",
      "alignment",
      "npv_amount_alignment",
      "reliability_amount",
      "reliability_amount_npv_amount",
      "alignment_reliability_amount",
      "alignment_reliability_amount_npv_amount"
    )

  estimate_alignment_7 <-
    c(
      "reliability_type1",
      "reliability_amount1:reliability_type1",
      "reliability_amount1:reliability_type1:npv_amount",
      "reliability_type1:npv_amount"
    ) %>%
    map(
      ~ model_alignment_7 %>%
        filter(term == .x) %>%
        pull(estimate)
    ) %>%
    set_names(
      "reliability_type",
      "reliability_amount_reliability_type",
      "reliability_amount_reliability_type_npv_amount",
      "reliability_type_npv_amount"
    )

  fixed_effects <-
    c(
      combined_value$intercept,
      estimate_alignment_2$npv_amount,
      estimate_alignment_2$alignment,
      estimate_alignment_2$reliability_amount,
      estimate_alignment_7$reliability_type,
      ## 0,
      estimate_alignment_2$npv_amount_alignment,
      estimate_alignment_2$reliability_amount_npv_amount,
      estimate_alignment_2$alignment_reliability_amount,
      estimate_alignment_7$reliability_type_npv_amount,
      ## 0,
      ## alignment1:reliability_type1
      1,
      estimate_alignment_7$reliability_amount_reliability_type,
      ## 0,
      estimate_alignment_2$alignment_reliability_amount_npv_amount,
      ## npv_amount:alignment1:reliability_type1
      -0.01,
      estimate_alignment_7$reliability_amount_reliability_type_npv_amount,
      ## 0,
      ## alignment1:reliability_amount1:reliability_type1
      -1,
      0.01
    )

  estimates_alignment_8 <-
    list(
      fixed_effects = fixed_effects,
      random_effects = combined_value$random_intercept_sd,
      residual_sd = combined_value$residual_sd
    )
}
