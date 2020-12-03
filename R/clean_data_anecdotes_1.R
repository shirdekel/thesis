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

  dat_clean <-
    data_raw_filtered %>%
    group_by(subject, align_condition, anecdote_condition, dateCreated) %>%
    nest() %>%
    mutate(
      df = map(data, shiR::getresponses, names_to, names_pattern),
      total_time = map_dbl(data, shiR::gettime),
      data = NULL
    ) %>%
    unnest(df) %>%
    filter(!str_detect(sona, "test")) %>%
    nest() %>%
    rowid_to_column("id") %>%
    unnest(data) %>%
    ungroup() %>%
    mutate(
      align_condition = recode(align_condition,
        "lowA" = "Low",
        "highA" = "High"
      ),
      anecdote_condition = anecdote_condition %>%
        str_to_sentence(),
      align_condition = case_when(
        (align_condition == "Low" | align_condition == "High") & anecdote_condition == "Statistics" ~ "NA",
        TRUE ~ align_condition
      )
    ) %>%
    mutate_at(c(
      "id",
      "align_condition",
      "anecdote_condition",
      "question"
    ), as.factor) %>%
    mutate_at(c(
      "age",
      "business_edu",
      "business_exp"
    ), as.numeric) %>%
    rename("Similarity" = align_condition, "Evidence" = anecdote_condition)

  # Rename participants with name typos
  dat_clean <- dat_clean %>%
    mutate(sona = sona %>%
      recode(
        "zimou yaun" = "zimou Yuan",
        "zimou yuan" = "zimou Yuan",
        "ccro0304" = "Cecilia Croguennec",
        "sharri" = "sharri sarraj"
      ))
  # Remove duplicates, retaining earliest copy, then removing participant names and emails.
  dat_clean <- dat_clean %>%
    mutate_at("sona", str_to_lower) %>%
    group_by(sona) %>%
    mutate(date_rank = dense_rank(dateCreated)) %>%
    filter(date_rank == 1)

  data_clean <-
    dat_clean %>%
    ungroup() %>%
    select(-(address:sona)) %>%
    pivot_wider(
      names_from = c("task", "question"),
      values_from = "value"
    )

  data_clean
}
