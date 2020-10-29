##' @title Pivot intrinsic features
##'

##' @return
##' @author Shir Dekel
##' @export
##' @param data_raw_project_allocation_cleaned
pivot_intrinsic_features <- function(data_raw_project_allocation_cleaned) {
  data_raw_intrinsic_features_pivoted <-
    data_raw_project_allocation_cleaned %>%
    pivot_longer(
      starts_with("detail"),
      names_to = c("intrinsic_feature", "intrinsic_feature_value_name"),
      names_pattern = "detail_(\\d)_(.*)",
      values_to = "intrinsic_feature_value"
    ) %>%
    pivot_wider(
      names_from = intrinsic_feature_value_name,
      values_from = intrinsic_feature_value,
      names_glue = "intrinsic_feature_{intrinsic_feature_value_name}",
    )
  return(data_raw_intrinsic_features_pivoted)
}
