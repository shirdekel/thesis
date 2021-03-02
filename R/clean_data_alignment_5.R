#' Clean Experiment 5
#'
#' Prolific sample
#'
#' @param data_raw
#'
#' @return A dataframe.
#'
clean_data_alignment_5 <- function(data_raw,
                                   experiment_number,
                                   data_clean_test,
                                   prolific_filter,
                                   prolific_filter_label) {

  dvName <- c("forecast_mean", "forecast_sd")

  data_raw_renamed <-
    data_raw %>%
    rename(
      reliability_amount = .data$npvCond,
      alignment = .data$alignCond
    ) %>%
    cleanProlific()

  data_setup <- data_raw_renamed %>%
    select(contains("project"),
           .data$reliability_amount,
           .data$alignment,
           "sex" = "Q79",
           "age" = "Q75"
    ) %>%
    mutate(id = row_number()) %>%
    pivot_longer(
      cols = -(.data$reliability_amount:.data$id),
      names_to = c("project", "forecast"),
      names_pattern = "\\w*(.)_(.*)",
      values_to = "dv",
      values_drop_na = TRUE
    ) %>%
    mutate(
      dv = as.numeric(.data$dv),
      reliability_amount = recode(.data$reliability_amount, "1" = "Absent", "2" = "Present"),
      alignment = recode(.data$alignment, "1" = "low", "2" = "high"),
      age = recode(.data$age, "1984" = "35"),
      npv_amount = case_when(
        project == 1 ~ "700",
        project == 2 ~ "500",
        project == 3 ~ "100",
        project == 4 ~ "900",
        project == 5 ~ "300"
      ),
      npv_amount = as.numeric(.data$npv_amount),
      id = as.factor(.data$id),
      age = as.numeric(.data$age)
    ) %>%
    mutate_if(is.character, as.factor) %>%
    mutate(sex = as.character(.data$sex))

  weightings67 <- c(0.1, 0.08, 0.06, 0.04, 0.02, 0, -0.02, -0.04, -0.06, -0.08, -0.1)

  data_clean <-
    c("forecast_mean", "forecast_sd") %>%
    map2(
      c("getmean", "getsd"),
      ~ getforecast(
        data = data_setup,
        forecastName = .x,
        fun = .y,
        weightings = weightings67
      )
    ) %>%
    reduce(left_join, by = c("reliability_amount", "alignment", "sex", "age", "id", "project", "npv_amount")) %>%
    mutate(sample = "prolific")

  return(data_clean)
}
