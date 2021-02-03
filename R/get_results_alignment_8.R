##' @title Get alignment results
##'
##' @param data_clean
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_alignment_8 <- function(data_clean, iv, dv) {
  set_sum_contrasts()
  model <-
    data_clean %>%
    nest_by(
      id, npv_amount, reliability_amount, alignment, reliability_type,
      allocation
    ) %>%
    lm(
      allocation ~
      npv_amount * reliability_amount * alignment * reliability_type,
      data = .
    )

  four_way <-
    model %>%
    apa_print(digits = 4) %>%
    pluck("full_result", "npv_amount_reliability_amount1_alignment1_reliability_type1")

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
    apa_print() %>%
    pluck("full_result", "high_low_explicit_implicit_high")

  ## Explicit reliability: NPV amount x reliability amount x alignment

  reliability_type_explicit_three_way <-
    emm_full %>%
    contrast(interaction = "pairwise", by = "reliability_type") %>%
    apa_print() %>%
    pluck("full_result", "high_low_high_low_explicit")


  ## Low alignment: NPV amount x reliability type

  alignment_low_two_way <-
    emm_partial %>%
    contrast(interaction = "pairwise", by = "alignment") %>%
    apa_print() %>%
    pluck("full_result", "explicit_implicit_low")

  ## High alignment explicit reliability: low vs high reliability

  alignment_high_reliability_type_explicit_reliability_amount <-
    emm_full %>%
    pairs(by = c("alignment", "reliability_type")) %>%
    apa_print() %>%
    pluck("full_result", "high_explicit_high_low")

  ## Low explicit reliability: low vs high alignment

  reliability_type_explicit_reliability_amount_low_alignment <-
    emm_full %>%
    pairs(by = c("reliability_amount", "reliability_type")) %>%
    apa_print() %>%
    pluck("full_result", "low_explicit_high_low")

  ## Low alignment: implicit vs explicit reliability (averaged over reliability amount)

  alignment_low_reliability_type <-
    emm_partial %>%
    pairs(by = "alignment") %>%
    apa_print() %>%
    pluck("full_result", "low_explicit_implicit")

  ## Implicit reliability: low vs high alignment (averaged over reliability
  ## amount) - null

  reliability_type_implicit_alignment_null <-
    emm_partial %>%
    pairs(by = "reliability_type") %>%
    test(delta = 0.022, adjust = "none") %>%
    apa_print() %>%
    pluck("full_result", "implicit_high_low")

  ## Implicit reliability: low vs high alignment (averaged over reliability
  ## amount)

  reliability_type_implicit_alignment <-
    emm_partial %>%
    pairs(by = "reliability_type", adjust = "bonferroni") %>%
    apa_print() %>%
    pluck("full_result", "implicit_high_low")

  ## Low and high alignment implicit reliability: low vs high reliability amount
  ## - null

  alignment_low_reliability_type_implicit_reliability_amount_null <-
    emm_full %>%
    pairs(by = c("alignment", "reliability_type")) %>%
    test(delta = 0.022, adjust = "none") %>%
    apa_print() %>%
    pluck("full_result", "low_implicit_high_low")

  alignment_high_reliability_type_implicit_reliability_amount_null <-
    emm_full %>%
    pairs(by = c("alignment", "reliability_type")) %>%
    test(delta = 0.022, adjust = "none") %>%
    apa_print() %>%
    pluck("full_result", "high_implicit_high_low")

  ## Post hoc

  ## NPV amount x reliability amount

  two_way_level <-
    list(
      c(
        "explicit",
        "implicit"
      ) %>%
        rep(each = 2),
      c(
        "high",
        "low"
      ) %>%
        rep(2)
    )

  two_way_name <-
    two_way_level %>%
    pmap(
      ~ str_c(
        "reliability_type",
        .x,
        "alignment",
        .y,
        sep = "_"
      )
    )

  two_way <-
    two_way_level %>%
    pmap(
      ~ data_clean %>%
        nest_by(
          id,
          reliability_amount,
          npv_amount,
          allocation,
          alignment,
          reliability_type
        ) %>%
        filter(
          reliability_type == .x,
          alignment == .y
        ) %>%
        lm(
          allocation ~
          npv_amount * reliability_amount,
          data = .
        ) %>%
        standardize() %>%
        apa_print(standardized = TRUE, digits = 3) %>%
        pluck("full_result", "npv_amount_reliability_amount1") %>%
        str_remove_all("\\\\")
    ) %>%
    set_names(two_way_name)

  three_way_name <- c("explicit", "implicit")

  three_way <-

    three_way_name %>%
    map(
      ~ data_clean %>%
        nest_by(
          id, npv_amount, reliability_amount, alignment, reliability_type,
          allocation
        ) %>%
        filter(reliability_type == .x) %>%
        lm(
          allocation ~
          npv_amount * reliability_amount * alignment,
          data = .
        ) %>%
        standardize() %>%
        apa_print(standardized = TRUE, digits = 3) %>%
        pluck("full_result", "npv_amount_reliability_amount1_alignment1") %>%
        str_remove_all("\\\\")
    ) %>%
    set_names(three_way_name)

  lst(
    four_way,
    alignment_high_three_way,
    reliability_type_explicit_three_way,
    alignment_low_two_way,
    alignment_high_reliability_type_explicit_reliability_amount,
    reliability_type_explicit_reliability_amount_low_alignment,
    alignment_low_reliability_type,
    reliability_type_implicit_alignment_null,
    reliability_type_implicit_alignment,
    alignment_low_reliability_type_implicit_reliability_amount_null,
    alignment_high_reliability_type_implicit_reliability_amount_null,
    two_way,
    three_way
  )
}
