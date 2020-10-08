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
      business_name_latin_table = case_when(
        # Shuffle business names for high alignment because npv needs to stay connected to intrinsic features
        alignment == "high" ~ get_table_latin(data, business_name_latin, business_name),
        # Shuffle npv for low alignment because business names need to stay connected to intrinsic features
        alignment == "low" ~ get_table_latin(data, npv_latin, npv)
      ),
      business_name_variation = seq_len(5) %>%
        as.numeric() %>%
        list()
    ) %>%
    unnest(c(business_name_latin_table, business_name_variation)) %>%
    rowwise() %>%
    mutate(
      column_order_latin_table = business_name_latin_table %>%
        latin_rows() %>%
        list(),
      column_order_variation = seq_len(5) %>%
        as.numeric() %>%
        list()
    ) %>%
    unnest(c(column_order_latin_table, column_order_variation)) %>%
    rowwise() %>%
    mutate(
      project_table = list(
        get_project_table(column_order_latin_table) %>%
          htmlTable(
            rnames = FALSE,
            align = "l",
            label = "allocation_task",
            useViewer = FALSE
          )
      )
    ) %>%
    ungroup() %>%
    select(
      -c(
        data,
        business_name_latin_table,
        business_name_latin,
        npv_latin,
        column_order_latin_table
      )
    ) %>%
    nest(data = c(reliability_amount, project_table))

  return(projects)
}
