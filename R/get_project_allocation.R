##' @title Get project allocation

##' @return
##' @author Shir Dekel
##' @export
get_project_allocation <- function(projects) {
  trial_projects <-
    trial_generic(
      "survey-html-form4",
      html = insert_variable("allocation_table"),
      data = insert_property(stage = "project_allocation")
    ) %>%
    build_timeline() %>%
    set_variables(allocation_table = projects$data[[1]]$project_table) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        reliability_type == !!projects$reliability_type
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        project_variation == !!projects$project_variation
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        alignment == !!projects$alignment
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        business_name_variation == !!projects$business_name_variation
      )
    ) %>%
    build_timeline() %>%
    display_if(
      fn_data_condition(
        column_order_variation == !!projects$column_order_variation
      )
    )

  return(trial_projects)
}
