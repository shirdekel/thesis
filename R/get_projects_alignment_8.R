get_projects_alignment_8 <- function() {
  projects <-
    get_project_detail_alignment_8() %>%
    mutate_business_name_latin() %>%
    mutate_project_table() %>%
    select(
      -c(
        data,
        business_name_latin_table,
        business_name_latin,
        npv_latin
       )
    ) %>%
    nest(data = c(reliability_amount, project_table))

   return(projects)
}
