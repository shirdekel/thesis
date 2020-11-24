##' @title Get anecdotes 2 projects

##' @return
##' @author Shir Dekel
##' @export
##' @param allocation_display
get_projects_anecdotes_2 <- function(allocation_display) {
  projects <-
    trial_generic(
      "survey-html-form3",
      html = insert_variable("allocation_table"),
      data = insert_property(stage = "project_allocation")
    ) %>%
    build_timeline() %>%
    set_variables(
      allocation_display = allocation_display$html
    )

  return(projects)
}
