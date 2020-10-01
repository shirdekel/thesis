##' @title Get project allocation

##' @return
##' @author Shir Dekel
##' @export
get_project_allocation <- function(project_detail) {
  trial_projects <-
    trial_generic(
      "survey-html-form2",
      html = project_detail$project_table,
      data = insert_property(stage = "project_allocation")
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        alignment == !!project_detail$alignment
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        reliability_type == !!project_detail$reliability_type
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        project_variation == !!project_detail$project_variation
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        reliability_amount == !!project_detail$reliability_amount
      )
    )

  return(trial_projects)
}
