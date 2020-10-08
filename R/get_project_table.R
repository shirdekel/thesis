##' @title Get project table

##' @return
##' @author Shir Dekel
##' @export
get_project_table <- function(data) {
  project_table <-
    data %>%
    select(-c(data, npv_raw, intrinsic_feature_rank)) %>%
    mutate(project_label = str_c("Project", 1:5)) %>%
    pivot_longer(
      c(
        business_name,
        project_type,
        html,
        npv
      )
    ) %>%
    pivot_wider(
      names_from = project_label,
      values_from = value
    )

  return(project_table)
}
