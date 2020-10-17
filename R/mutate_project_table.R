##' @title Mutate project table

##' @return
##' @author Shir Dekel
##' @export
mutate_project_table <- function(projects_business_name_latin) {
  projects_project_table <-
    projects_business_name_latin %>%
    rowwise() %>%
    mutate(
      project_table = list(
        get_project_table(business_name_latin_table, reliability_amount)
      )
    ) %>%
    ungroup()
  return(projects_project_table)
}
