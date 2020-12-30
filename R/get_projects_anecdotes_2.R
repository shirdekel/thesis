##' @title Get anecdotes 2 projects
##'
##' Parse components as javascript with relevant conditional statements to
##' correspond with the between-subjects conditions.
##' @param project_variation
##' @param anecdote_variation
##' @param anecdote_between
##' @param data

##' @return
##' @author Shir Dekel
##' @export
##' @param allocation_display
get_projects_anecdotes_2 <- function(project_variation,
                                     anecdote_variation,
                                     anecdote_between,
                                     data) {
  trial_generic(
    "survey-html-form3",
    html = insert_variable("allocation_display"),
    data = insert_property(stage = "project_allocation")
  ) %>%
    build_timeline() %>%
    set_variables(
      allocation_display = data$display
    ) %>%
    set_parameters(randomize_order = FALSE) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        project_variation == !!project_variation
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        anecdote_variation == !!anecdote_variation
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        anecdote_between == !!anecdote_between
      )
    )
}
