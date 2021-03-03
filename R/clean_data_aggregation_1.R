##' @title Clean data for aggregation 1

##' @param data_raw_filtered
##' @param experiment_number
##' @param test
##' @param prolific_filter
##' @param prolific_filter_label
##' @return
##' @author Shir Dekel
##' @export
clean_data_aggregation_1 <- function(data_raw_filtered, experiment_number, test, prolific_filter, prolific_filter_label) {
  names_to <- c("condition", "project", "pos", "dif", "prob")
  names_pattern <- "(.*)_cond_(.*)_(.*)_(.*)_(.*)"

  data_prep <- data_raw_filtered %>%
    rename(
      Alignment = alignment_cond,
      Awareness = awareness_cond
    ) %>%
    group_by(subject, Alignment, Awareness) %>%
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
      Alignment = recode(Alignment, lowA = "Low", highA = "High"),
      Awareness = Awareness %>% str_to_title(),
      value = as.double(as.character(recode(value, "Yes" = 1, "No" = 0))),
      id = as.factor(id),
      condition = replace_na(condition, "rep_aggregated"),
      condition = case_when(
        dif == "250" ~ "check_neg",
        condition == "check_redelmeier" & prob == "0.5" ~ "check_redelmeier_single",
        condition == "check_redelmeier" & prob == "0.5.1" ~ "check_redelmeier_multiple",
        condition == "check_redelmeier" & prob == "0.5.2" ~ "check_redelmeier_aggregated",
        condition == "check_samuelson" & prob == "0.5" ~ "check_samuelson_single",
        condition == "check_samuelson" & prob == "0.5.1" ~ "check_samuelson_multiple",
        condition == "check_samuelson" & prob == "0.5.2" ~ "check_samuelson_aggregated",
        condition == "check_samuelson_original" & prob == "0.5" ~ "check_samuelson_original_single",
        condition == "check_samuelson_original" & prob == "0.5.1" ~ "check_samuelson_original_multiple",
        condition == "check_samuelson_original" & prob == "0.5.2" ~ "check_samuelson_original_aggregated",
        condition == "check" & project == "no.project" & dif == "3000" & prob == "0.5" ~ "check_redelmeier_single",
        condition == "check" & project == "no.project" & dif == "3000" & prob == "0.5.1" ~ "check_redelmeier_multiple",
        condition == "check" & project == "no.project" & dif == "3000" & prob == "0.5.2" ~ "check_redelmeier_aggregated",
        condition == "check" & project == "oil.well" & dif == "300" & prob == "0.5" ~ "check_samuelson_single",
        condition == "check" & project == "oil.well" & dif == "300" & prob == "0.5.1" ~ "check_samuelson_multiple",
        condition == "check" & project == "oil.well" & dif == "300" & prob == "0.5.2" ~ "check_samuelson_aggregated",
        condition == "check" & project == "no.project" & dif == "300" & prob == "0.5" ~ "check_samuelson_original_single",
        condition == "check" & project == "no.project" & dif == "300" & prob == "0.5.1" ~ "check_samuelson_original_multiple",
        condition == "check" & project == "no.project" & dif == "300" & prob == "0.5.2" ~ "check_samuelson_original_aggregated",
        condition == "check" & project == "oil.well" & dif == "250" ~ "check_neg",
        condition == "separate" ~ "presentation_separate",
        condition == "joint" ~ "presentation_joint",
        TRUE ~ as.character(condition)
      )
    ) %>%
    filter(str_detect(condition, "presentation")) %>%
    separate(condition, c("condition", "Presentation")) %>%
    group_by(subject, Presentation) %>%
    nest() %>%
    mutate(risk = map_dbl(data, shiR::getrisk)) %>%
    unnest(data) %>%
    ungroup() %>%
    mutate_at("Presentation", str_to_title) %>%
    mutate(Awareness = Awareness %>%
      recode("Naive" = "Not aware")) %>%
    mutate_at(c("Alignment", "Awareness", "Presentation"), as.factor) %>%
    group_by(id, Presentation, Alignment, Awareness, risk) %>%
    nest() %>%
    ungroup() %>%
    mutate(data = NULL)
}
