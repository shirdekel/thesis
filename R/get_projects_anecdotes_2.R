##' @title Get anecdotes 2 projects

##' @return
##' @author Shir Dekel
##' @export
get_projects_anecdotes_2 <- function() {
  allocation_display <-
    get_parameters_anecdotes_2() %>%
    mutate_parameters_anecdotes_2()

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
