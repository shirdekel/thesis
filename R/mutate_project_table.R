##' @title Mutate project table

##' @return
##' @author Shir Dekel
##' @export
mutate_project_table <- function(projects_column_order_latin) {
  projects_project_table <-
    projects_column_order_latin %>%
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
    ungroup()
  return(projects_project_table)
}
