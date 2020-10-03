get_projects_alignment_8 <- function() {
  projects <-
    get_project_detail_alignment_8() %>%
    nest_by(alignment, reliability_amount, reliability_type, project_variation) %>%
    mutate(
      project_table = list(
        get_project_table(data) %>%
          htmlTable(
            rnames = FALSE,
            align = "l",
            label = "allocation_task",
            useViewer = FALSE
          )
      )
    ) %>%
    ungroup() %>%
    select(-data) %>%
    nest(data = c(reliability_amount, project_table))

  return(projects)
}
