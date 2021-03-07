##' @title Clean data for aggregation 1
##'
##' A lot of weird and probably redundant data cleaning here. Somewhat because
##' of the different experiment back end changes (e.g., ID naming differences)
##' and somewhat because I decided to include all the DVs in the one dataframe.

##' @param data_raw_filtered_aggregation_1
##' @param experiment_number
##' @param test
##' @param prolific_filter
##' @param prolific_filter_label
##' @return
##' @author Shir Dekel
##' @export
clean_data_aggregation_1 <- function(data_raw_filtered_aggregation_1, experiment_number, test, prolific_filter, prolific_filter_label) {
  names_to <- c("condition", "project", "pos", "dif", "prob")
  names_pattern <- "(.*)_cond_(.*)_(.*)_(.*)_(.*)"

  data_prep <- data_raw_filtered_aggregation_1 %>%
    rename(
      alignment = alignment_cond,
      awareness = awareness_cond
    ) %>%
    group_by(subject, alignment, awareness) %>%
    nest()

  data_combined <- data_prep %>%
    mutate(
      df = map(data, extract_data, names_to, names_pattern),
      total_time = map_dbl(data, shiR::gettime),
      data = NULL
    )

  data_combined %>%
    unnest(df) %>%
    mutate_at(c("prolific"), as.character) %>%
    filter(
      !is.na(prolific),
      !str_detect(prolific, "test"),
      !str_detect(prolific, "asdfasdf"),
      !str_detect(prolific, "12341234"),
      age >= 18
    ) %>%
    nest() %>%
    rowid_to_column("id") %>%
    unnest(data) %>%
    ungroup() %>%
    mutate(
      alignment = recode(alignment, lowA = "low", highA = "high"),
      awareness = awareness %>% str_to_title(),
      value = as.double(as.character(recode(value, "Yes" = 1, "No" = 0))),
      id = as.factor(id),
      condition = replace_na(condition, "check_aggregated"),
      condition = case_when(
        dif == "250" & pos == "100" ~ "check_neg_1",
        dif == "250" & pos == "50" ~ "check_neg_2",
        condition == "check_redelmeier" & prob == "0.5" ~ "check_redelmeier-single",
        condition == "check_redelmeier" & prob == "0.5.1" ~ "check_redelmeier-multiple",
        condition == "check_redelmeier" & prob == "0.5.2" ~ "check_redelmeier-aggregated",
        condition == "check_samuelson" & prob == "0.5" ~ "check_samuelson-single",
        condition == "check_samuelson" & prob == "0.5.1" ~ "check_samuelson-multiple",
        condition == "check_samuelson" & prob == "0.5.2" ~ "check_samuelson-aggregated",
        condition == "check_samuelson_original" & prob == "0.5" ~ "check_samuelson-original-single",
        condition == "check_samuelson_original" & prob == "0.5.1" ~ "check_samuelson-original-multiple",
        condition == "check_samuelson_original" & prob == "0.5.2" ~ "check_samuelson-original-aggregated",
        condition == "check" & (project == "no.project" | project == "no-project") & dif == "3000" & prob == "0.5" ~ "check_redelmeier-single",
        condition == "check" & (project == "no.project" | project == "no-project") & dif == "3000" & prob == "0.5.1" ~ "check_redelmeier-multiple",
        condition == "check" & (project == "no.project" | project == "no-project") & dif == "3000" & prob == "0.5.2" ~ "check_redelmeier-aggregated",
        condition == "check" & (project == "oil.well" | project == "oil-well") & dif == "300" & prob == "0.5" ~ "check_samuelson-single",
        condition == "check" & (project == "oil.well" | project == "oil-well") & dif == "300" & prob == "0.5.1" ~ "check_samuelson-multiple",
        condition == "check" & (project == "oil.well" | project == "oil-well") & dif == "300" & prob == "0.5.2" ~ "check_samuelson-aggregated",
        condition == "check" & (project == "no.project" | project == "no-project") & dif == "300" & prob == "0.5" ~ "check_samuelson-original-single",
        condition == "check" & (project == "no.project" | project == "no-project") & dif == "300" & prob == "0.5.1" ~ "check_samuelson-original-multiple",
        condition == "check" & (project == "no.project" | project == "no-project") & dif == "300" & prob == "0.5.2" ~ "check_samuelson-original-aggregated",
        condition == "check" & (project == "oil.well" | project == "oil-well") & dif == "250" ~ "check_neg",
        condition == "presentation_separate" ~ "separate",
        condition == "presentation_joint" ~ "joint",
        TRUE ~ as.character(condition)
      ),
      across(
        condition,
        ~ .x %>%
          str_replace_all("_", "-") %>%
          str_replace("check-|rep-", "follow_up_")
      )
    ) %>%
    nest_by(id) %>%
    mutate(across(data, ~ .x %>%
      pivot_aggregation_1() %>%
      list())) %>%
    unnest(data) %>%
    rename_with(~ .x %>%
      str_remove("follow_up_") %>%
      str_replace_all("-", "_")) %>%
    group_by(subject, presentation) %>%
    nest() %>%
    mutate(proportion = map_dbl(data, get_risk)) %>%
    unnest(data) %>%
    ungroup() %>%
    mutate(awareness = awareness %>%
      recode("naive" = "not aware")) %>%
    mutate_at(c("alignment", "awareness", "presentation"), as.factor)
}
