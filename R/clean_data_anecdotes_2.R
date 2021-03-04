##' @title Clean data for anecdotes 2

##' @param data_raw_filtered
##' @param experiment_number
##' @param test
##' @param prolific_filter
##' @param prolific_filter_label
##' @return
##' @author Shir Dekel
##' @export
clean_data_anecdotes_2 <- function(data_raw_filtered, experiment_number, test,
                                   prolific_filter, prolific_filter_label) {
  names_to_allocation <-
    c(
      "anecdote_within",
      "similarity",
      "valence",
      "business_name",
      "type",
      "npv_amount",
      "reliability",
      "detail_1_description",
      "detail_1_value",
      "detail_2_description",
      "detail_2_value",
      "detail_3_description",
      "detail_3_value",
      "detail_4_description",
      "detail_4_value",
      "project_type"
    )

  data_allocation <-
    data_raw_filtered %>%
    filter(stage == "project_allocation") %>%
    rowwise() %>%
    mutate(
      across(
        responses,
        ~ .x %>%
          map_dfc(fromJSON) %>%
          pivot_longer(
            cols = everything(),
            names_to = names_to_allocation,
            names_sep = "_",
            values_to = "allocation"
          ) %>%
          list()
      )
    ) %>%
    unnest(responses) %>%
    filter(project_type == "target")

  names_to_follow_up <-
    c(
      "anecdote_within",
      "valence",
      "similarity",
      "question_type",
      "question_name"
    )

  data_follow_up <-
    data_raw_filtered %>%
    select(subject, responses) %>%
    filter(responses %>% str_detect("follow-up")) %>%
    rowwise() %>%
    mutate(
      across(
        responses,
        ~ .x %>%
          map_dfc(fromJSON) %>%
          pivot_longer(
            cols = everything(),
            names_to = names_to_follow_up,
            names_sep = "_",
            names_prefix = "follow-up_"
          ) %>%
          list()
      )
    ) %>%
    unnest(responses) %>%
    select(-question_type) %>%
    mutate(
      across(question_name, ~ .x %>%
        str_replace_all("-", "_"))
    ) %>%
    pivot_wider(names_from = question_name)

  data_combined <-
    data_raw_filtered %>%
    drop_na(responses) %>%
    filter(!stage %in% c("project_allocation", "follow_up")) %>%
    nest_by(subject) %>%
    mutate(other = data %>%
      pull(responses) %>%
      map_dfc(fromJSON) %>%
      list()) %>%
    unnest(other) %>%
    ungroup() %>%
    select(-data) %>%
    inner_join(data_allocation, by = "subject") %>%
    full_join(data_follow_up, by = c(
      "subject", "anecdote_within", "similarity",
      "valence"
    ))

  data <-
    data_combined %>%
    mutate(
      datetime = dateCreated %>%
        ymd_hms(tz = "Australia/Sydney"),
      total_time = max(time_elapsed) / 60000, # Milliseconds to minutes
      across(where(check_numeric), as.numeric)
    ) %>%
    select(-c(
      view_history,
      rt,
      trial_type,
      trial_index,
      time_elapsed,
      internal_node_id,
      dateCreated
    )) %>%
    clean_data_finalise_with_tests(
      test, prolific_filter,
      prolific_filter_label,
      instructions_test,
      "anecdotes",
      "5"
    )

  return(data)
}
