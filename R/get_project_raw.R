##' @title Get raw project details
##' @param business_name_target
##' @param investment_target
##' @param location_target
##' @param integration_target
##' @param structure_target
##' @param predicted_project_features_target
##' @param reliability
##' @param npv
##' @return
##' @author Shir Dekel
##' @export
get_project_raw <- function(business_name_target, investment_target,
                            location_target, integration_target,
                            structure_target, predicted_project_features_target,
                            reliability, npv) {
  project_raw_wide <-
    tibble(
      `Business name` = business_name_target,
      Investment = investment_target,
      Location = location_target,
      Integration = integration_target,
      Structure = structure_target,
      `Predicted project features` = predicted_project_features_target,
      project_label = c("Project B", "Project A")
    )
  if (!any(is.na(reliability))) {
    project_raw_wide <-
      project_raw_wide %>%
      mutate(
        `Overall reliability rating (%)` = reliability,
        `NPV ($)` = npv
      )
  }


  project_raw <-
    project_raw_wide %>%
    pivot_longer(
      cols = -project_label,
      names_to = "Relevant information"
    ) %>%
    pivot_wider(
      names_from = project_label,
      values_from = value
    )

  return(project_raw)
}
