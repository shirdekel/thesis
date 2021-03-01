#' Clean Experiment 3
#'
#' @param data_raw
#'
#' @return A dataframe.
#'
clean_data_alignment_3 <- function(data_raw,
                                   experiment_number,
                                   data_clean_test,
                                   prolific_filter,
                                   prolific_filter_label) {

  reference_doc <-
    get_reference_doc()

  reference_doc_split <-
    get_reference_doc_split(reference_doc)

  dv_match <-
    get_dv_match(reference_doc_split)

  data_clean <-
    data_raw %>%
    filter_masters() %>%
    rename_masters(dv_match) %>%
    pivot_masters() %>%
    select(
      recorded_date,
      response_id,
      duration_in_seconds,
      business_edu,
      business_edu_other,
      business_exp,
      order_b:npv_knowledge
    ) %>%
    mutate(
      across(business_edu, recode_business_edu),
      across(business_exp, recode_business_exp),
      across(reliability_amount, recode_reliability_masters),
      across(where(check_numeric), as.numeric),
      project = recode_project_masters(project, order),
      npv_amount = get_npv_amount(project),
      across(c(product, project, alignment, reliability_amount), as.factor),
      sample = "masters"
    ) %>%
    add_id_column(response_id) %>%
    get_npv_allocation_correlation() %>%
    get_max_min_difference(npv_amount, alignment, reliability_amount, phase)

  return(data_clean)
}
