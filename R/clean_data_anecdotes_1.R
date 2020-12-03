##' @title Clean data for anecdotes 1

##' @param data_raw_filtered
##' @param experiment_number
##' @param test
##' @param prolific_filter
##' @param prolific_filter_label
##' @return
##' @author Shir Dekel
##' @export
clean_data_anecdotes_1 <- function(data_raw_filtered, experiment_number, test, prolific_filter, prolific_filter_label) {
  names_to <- c("task", "question")
  names_pattern <- "(.*)_q_(.*)"

  data_clean <-
    data_raw_filtered %>%
    group_by(subject, align_condition, anecdote_condition, dateCreated) %>%
    nest() %>%
    mutate(
      df = map(data, getresponses, names_to, names_pattern),
      total_time = map_dbl(data, gettime),
      data = NULL
    ) %>%
    unnest(df) %>%
    filter(!str_detect(sona, "test")) %>%
    ungroup() %>%
    pivot_wider(
      names_from = c("task", "question"),
      values_from = "value"
    ) %>%
    mutate(
      across(
        align_condition,
        ~ .x %>%
          recode(
            "lowA" = "low",
            "highA" = "high"
          )
      ),
      align_condition = case_when(
        (align_condition == "low" | align_condition == "high") &
          anecdote_condition == "statistics" ~ "NA",
        TRUE ~ align_condition
      ),
      across(
        c(
          align_condition,
          anecdote_condition
        ),
        as.factor
      ),
      # Milliseconds to minutes
      across(total_time, ~ .x / 60000),
      across(where(check_numeric), as.numeric),
      # Rename participants with name typos
      across(
        sona,
        ~ .x %>%
          recode(
            "zimou yaun" = "zimou Yuan",
            "zimou yuan" = "zimou Yuan",
            "ccro0304" = "Cecilia Croguennec",
            "sharri" = "sharri sarraj"
          ) %>%
          str_to_lower()
      )
    ) %>%
    rename(
      "alignment" = align_condition,
      "anecdote" = anecdote_condition,
      "datetime" = dateCreated
    ) %>%
    # Remove duplicates, retaining earliest copy, then removing participant
    # names and emails.
    group_by(sona) %>%
    mutate(date_rank = dense_rank(datetime)) %>%
    filter(date_rank == 1) %>%
    ungroup()  %>%
    add_id_column(sona) %>%
    select(-c(address, sona))

  data_clean
}
