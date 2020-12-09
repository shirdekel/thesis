##' @title Get alignment 8 project details

##' @return
##' @author Shir Dekel
##' @export
get_project_detail_alignment_8 <- function() {
  business_name <-
    get_business_name()

  project_type <-
    get_project_name()

  project_name_underlined <-
    get_project_name_underlined(project_type)

  npv <-
    get_npv()

  project_detail_feature <-
    get_project_detail_feature()

  project_value_base <-
    get_project_value_high()

  project_unit <-
    get_project_unit()

  intrinsic_feature_multipliers <-
    get_intrinsic_feature_multipliers(npv)

  project_number <-
    1:5 %>%
    as.numeric()

  project_detail_alignment_8 <-
    tibble(
      project_detail_feature,
      project_value_base,
      project_unit,
      business_name,
      project_type,
      alignment_high_project_variation = project_number %>%
        list() %>%
        rep(2),
      alignment_low_npv_raw = npv %>%
        map(rev),
      intrinsic_feature_multipliers,
      display_set = seq_len(2) %>%
        as.numeric()
    ) %>%
    unnest(
      c(
        project_detail_feature,
        project_value_base,
        project_unit,
        business_name,
        project_type,
        alignment_high_project_variation,
        alignment_low_npv_raw,
        intrinsic_feature_multipliers
      )
    ) %>%
    unnest(
      c(
        project_detail_feature,
        project_value_base,
        project_unit,
        intrinsic_feature_multipliers
      )
    ) %>%
    mutate(
      intrinsic_feature_rank = list(seq(from = 5, to = 1)),
      alignment_low_project_variation = list(project_number),
      alignment_high_npv_raw = npv %>%
        map(rev) %>%
        rep(each = 15)
    ) %>%
    unnest(
      c(
        intrinsic_feature_multipliers,
        intrinsic_feature_rank,
        business_name,
        alignment_low_project_variation,
        alignment_high_npv_raw
      )
    ) %>%
    rowwise() %>%
    mutate(
      project_value = project_value_base %>%
        prod(intrinsic_feature_multipliers) %>%
        signif(digits = 3) %>%
        # Prevent scientific notation
        as.integer() %>%
        format(big.mark = ","),
      combined = str_c(
        project_detail_feature, ": ", project_value, project_unit
      ),
      input_id_component = str_c(
        project_detail_feature %>%
          str_replace_all(" ", "-"),
        project_value,
        sep = "_"
      )
    ) %>%
    ungroup() %>%
    nest_by(
      business_name,
      project_type,
      intrinsic_feature_rank,
      alignment_low_project_variation,
      alignment_high_project_variation,
      alignment_low_npv_raw,
      alignment_high_npv_raw,
      display_set
    ) %>%
    mutate(
      html = multi_list(data$combined)
    ) %>%
    pivot_longer(
      starts_with("alignment"),
      names_to = c("alignment", "name"),
      names_pattern = "alignment_(\\w+?)_(.*)",
    ) %>%
    pivot_wider() %>%
    rowwise() %>%
    mutate(
      reliability_explicit = list(get_reliability_explicit(npv_raw)),
      reliability_implicit = list(get_reliability_implicit(npv_raw)),
      reliability_amount = list(c("low", "high"))
    ) %>%
    unnest(
      c(
        reliability_explicit,
        reliability_implicit,
        reliability_amount
      )
    ) %>%
    ungroup() %>%
    pivot_longer(
      c(reliability_explicit, reliability_implicit),
      names_to = "reliability_type",
      names_prefix = "reliability_",
      values_to = "npv"
    ) %>%
    rowwise() %>%
    get_display()
  return(project_detail_alignment_8)
}
