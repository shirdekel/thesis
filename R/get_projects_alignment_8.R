get_projects_alignment_8 <- function() {
  projects <-
    get_project_detail_alignment_8() %>%
    nest_by(
      alignment,
      reliability_amount,
      reliability_type,
      project_variation
    ) %>%
    mutate(
      business_name_latin = data$business_name %>%
        latin_list() %>%
        list(),
      npv_latin = data$npv %>%
        latin_list() %>%
        list(),
      table_latin = case_when(
        # Shuffle business names for high alignment because npv needs to stay connected to intrinsic features
        alignment == "high" ~ get_table_latin(data, business_name_latin, business_name),
        # Shuffle npv for low alignment because business names need to stay connected to intrinsic features
        alignment == "low" ~ get_table_latin(data, npv_latin, npv)
      ),
      latin_variation = seq_len(5) %>%
        as.numeric() %>%
        list()
    ) %>%
    unnest(c(table_latin, latin_variation)) %>%
    rowwise() %>%
    mutate(
      project_table = list(
        get_project_table(table_latin) %>%
          htmlTable(
            rnames = FALSE,
            align = "l",
            label = "allocation_task",
            useViewer = FALSE
          )
      )
    ) %>%
    ungroup() %>%
    select(-c(data, table_latin, business_name_latin, npv_latin)) %>%
    nest(data = c(reliability_amount, project_table))

  return(projects)
}
