##' @title Convert responses from JSON and pivot

##' @return
##' @author Shir Dekel
##' @export
##' @param data_raw_jspsych_columns_unselected
clean_project_allocation <- function(data_raw_jspsych_columns_unselected) {
  names_to <-
    c(
      "business_name",
      "project_type",
      "npv_amount",
      "detail_1_description",
      "detail_1_value",
      "detail_2_description",
      "detail_2_value",
      "detail_3_description",
      "detail_3_value",
      "intrinsic_feature_rank",
      "reliability_amount",
      "dv"
    )
  data_raw_project_allocation_cleaned <-
    data_raw_jspsych_columns_unselected %>%
    filter(stage == "project_allocation") %>%
    rowwise() %>%
    mutate(
      across(
        responses,
        ~ .x %>%
          map_dfc(fromJSON) %>%
          pivot_longer(
            cols = everything(),
            names_to = names_to,
            names_sep = "_",
          ) %>%
          list()
      )
    ) %>%
    unnest(responses)
  return(data_raw_project_allocation_cleaned)
}
