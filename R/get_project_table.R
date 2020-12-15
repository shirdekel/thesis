##' @title Get project table

##' @return
##' @author Shir Dekel
##' @export
##' @param data
##' @param reliability_amount
get_project_table <- function(data, reliability_amount) {
  project_table <-
    data %>%
    rowwise() %>%
    mutate(
      input_id = str_c(
        business_name %>%
          str_replace_all(" ", "-"),
        project_type %>%
          str_replace_all(" ", "-"),
        npv_raw,
        data$input_id_component %>%
          str_c(collapse = "_") %>%
          str_remove_all(","),
        intrinsic_feature_rank,
        sep = "_"
      ),
      input_allocation = get_survey_number(
        label_text = "Allocation: ",
        name = input_id %>%
          str_c(
            reliability_amount,
            "allocation",
            sep = "_"
          ),
        class = "allocation"
      ) %>%
        as.character(),
      input_ranking = get_survey_number(
        label_text = "Ranking: ",
        name = input_id %>%
          str_c(
            reliability_amount,
            "ranking",
            sep = "_"
          ),
        min = 1,
        max = 5,
        class = "ranking"
      ) %>%
        as.character(),
      project_type_underlined = project_type %>%
        tags$u() %>%
        as.character()
    ) %>%
    select(
      "Project ranking" = input_ranking,
      "Project allocation (%)" = input_allocation,
      "Business name" = business_name,
      "Project type" = project_type_underlined,
      "Predicted project features" = html,
      "NPV ($)" = npv
    )

  project_details <-
    project_table %>%
    as.list() %>%
    unname() %>%
    transpose()

  row_names <-
    project_table %>%
    names()

  header_row <-
    c(
      "Relevant information",
      str_c("Project", 1:5, sep = " ")
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
