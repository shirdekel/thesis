##' @title Get raw simulated data
##' For looping
##'
##' Naming scheme: where the effect is, what effect is being compared

##' @return
##' @author Shir Dekel
##' @export
##' @param data 
get_data_simulation_results <- function(data, pb) {
  pb$tick()

  model <-
    data %>%
    lm(
    allocation ~
    npv_amount * reliability_amount * alignment * reliability_type ,
      data = .
    )

  four_way <-
    model %>%
    tidy() %>%
    filter(term == "npv_amount:reliability_amount1:alignment1:reliability_type1")

  emm_full <-
    emtrends(model, c("reliability_amount", "reliability_type", "alignment"),
             var = "npv_amount"
             )

  emm_partial <-
    model %>%
    emtrends(c("reliability_type", "alignment"), var = "npv_amount")

  ## High alignment: NPV amount x reliability amount x reliability type

  alignment_high_three_way <-
    emm_full %>%
    contrast(interaction = "pairwise", by = "alignment") %>%
    tidy() %>%
    filter(alignment == "high")

  ## Explicit reliability: NPV amount x reliability amount x alignment

  reliability_type_explicit_three_way <-
    emm_full %>%
    contrast(interaction = "pairwise", by = "reliability_type") %>%
    tidy() %>%
    filter(reliability_type == "explicit")

  ## Low alignment: NPV amount x reliability type

  alignment_low_two_way <-
    emm_partial %>%
    contrast(interaction = "pairwise", by = "alignment") %>%
    tidy() %>%
    filter(alignment == "low")

  ## High alignment explicit reliability: low vs high reliability

  alignment_high_reliability_type_explicit_reliability_amount <-
    emm_full %>%
    pairs(by = c("alignment", "reliability_type")) %>%
    tidy() %>%
    filter(alignment == "high", reliability_type == "explicit")

  ## Low explicit reliability: low vs high alignment

  reliability_type_explicit_reliability_amount_low_alignment <-
    emm_full %>%
    pairs(by = c("reliability_amount", "reliability_type")) %>%
    tidy() %>%
    filter(reliability_amount == "low", reliability_type == "explicit")

  ## Low alignment: implicit vs explicit reliability (averaged over reliability amount)

  alignment_low_reliability_type <-
    emm_partial %>%
    pairs(by = "alignment") %>%
    tidy() %>%
    filter(alignment == "low")

  ## Implicit reliability: low vs high alignment (averaged over reliability amount)

  reliability_type_implicit_alignment_null <-
    emm_partial %>%
    pairs(by = "reliability_type") %>%
    tidy(side = "equivalence", delta = 0.022) %>%
    filter(reliability_type == "implicit")

  ## Low and high alignment implicit reliability: low vs high reliability amount

  alignment_reliability_type_implicit_reliability_amount_null <-
    emm_full %>%
    pairs(by = c("alignment", "reliability_type")) %>%
    tidy(side = "equivalence", delta = 0.022) %>%
    filter(reliability_type == "implicit")

  alignment_high_reliability_type_implicit_reliability_amount_null <-
    alignment_reliability_type_implicit_reliability_amount_null %>%
    filter(alignment == "high")

  alignment_low_reliability_type_implicit_reliability_amount_null <-
    alignment_reliability_type_implicit_reliability_amount_null %>%
    filter(alignment == "low")

  effect_names <-
    c(
      four_way = "Alignment x reliability type x reliability amount x NPV amount",
      alignment_high_three_way = "High alignment: reliability type x reliability amount x NPV amount",
      reliability_type_explicit_three_way = "Explicit reliability: alignment x reliability amount x NPV amount",
      alignment_low_two_way = "Low alignment: reliability type x NPV amount",
      alignment_high_reliability_type_explicit_reliability_amount = "High alignment, explicit reliability: low vs high reliability",
      reliability_type_explicit_reliability_amount_low_alignment = "Low explicit reliability: low vs high alignment",
      alignment_low_reliability_type = "Low alignment: implicit vs explicit reliability",
      reliability_type_implicit_alignment_null = "Implicit reliability: low vs high alignment",
      alignment_low_reliability_type_implicit_reliability_amount_null = "Low alignment, implicit reliability: low vs high reliability",
      alignment_high_reliability_type_implicit_reliability_amount_null = "High alignment, implicit reliability: low vs high reliability"
    )

  data_simulation_results <-
    bind_rows(
      four_way = four_way,
      alignment_high_three_way = alignment_high_three_way,
      reliability_type_explicit_three_way = reliability_type_explicit_three_way,
      alignment_low_two_way = alignment_low_two_way,
      alignment_high_reliability_type_explicit_reliability_amount = alignment_high_reliability_type_explicit_reliability_amount,
      reliability_type_explicit_reliability_amount_low_alignment = reliability_type_explicit_reliability_amount_low_alignment,
      alignment_low_reliability_type = alignment_low_reliability_type,
      reliability_type_implicit_alignment_null = reliability_type_implicit_alignment_null,
      alignment_low_reliability_type_implicit_reliability_amount_null = alignment_low_reliability_type_implicit_reliability_amount_null,
      alignment_high_reliability_type_implicit_reliability_amount_null = alignment_high_reliability_type_implicit_reliability_amount_null,
      .id = "effect"
    ) %>%
    mutate(
      effect_type = case_when(
        str_detect(effect, "four_way") ~ "four_way_interaction",
        str_detect(effect, "three_way") ~ "three_way_interaction",
        str_detect(effect, "two_way") ~ "two_way_interaction",
        str_detect(effect, "null") ~ "simple_effect_null",
        TRUE ~ "simple_effect"
      ) %>%
        fct_relevel(
          c(
            "four_way_interaction",
            "three_way_interaction",
            "two_way_interaction",
            "simple_effect",
            "simple_effect_null"
          )
        ),
      across(
        effect,
        ~ .x %>%
          recode(!!!effect_names)
      )
    )

  return(data_simulation_results)
}
