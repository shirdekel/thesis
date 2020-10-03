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
    get_intrinsic_feature_multipliers()

  project_number <- 1:5 %>%
    as.numeric()

  project_detail <-
    tibble(
      project_detail_feature,
      project_value_base,
      project_unit,
      business_name,
      project_type,
      alignment_high = project_number,
      intrinsic_feature_multipliers
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
      alignment_low = list(project_number)
    ) %>%
    unnest(
      c(
        intrinsic_feature_multipliers,
        intrinsic_feature_rank,
        business_name,
        alignment_low
      )
    ) %>%
    rowwise() %>%
    mutate(
      project_value = project_value_base * intrinsic_feature_multipliers,
      combined = str_c(
        project_detail_feature, ": ", project_value, project_unit
      )
    ) %>%
    ungroup() %>%
    nest_by(business_name, project_type, intrinsic_feature_rank, alignment_low, alignment_high) %>%
    mutate(
      html = multi_list(data$combined)
    ) %>%
    pivot_longer(
      starts_with("alignment"),
      names_to = "alignment",
      names_prefix = "alignment_",
      values_to = "project_variation"
    ) %>%
    group_by(alignment, project_variation) %>%
    mutate(
      npv_raw = npv %>%
        rev()
    ) %>%
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
    )

  return(project_detail)
}
