##' @title Get project table

##' @return
##' @author Shir Dekel
##' @export
get_project_table <- function(data) {
  project_table <-
    data %>%
    select(
      input_ranking,
      input_allocation,
      business_name,
      project_type,
      html,
      npv
    )

  project_details <-
    project_table %>%
    as.list() %>%
    unname()%>%
    transpose()

  row_names <-
    project_table %>%
    names()

  header_row <-
    c(
      "Relevant information",
      str_c("Project", 1:5)
    )

  table_generation <-
    list(
      project_details,
      row_names,
      header_row
    ) %>%
    map(toJSON) %>%
    str_c(collapse = ", ") %>%
    str_c(
      "generate_alignment_8_table(",
      .,
      ")"
    ) %>%
    insert_javascript()

  return(table_generation)
}
