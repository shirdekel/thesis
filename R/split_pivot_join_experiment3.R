##' @title Split, pivot, and join Experiment 3 data

##' @return
##' @author Shir Dekel
##' @export
split_pivot_join_experiment3 <- function(data, dv) {

  batch_index <-
    data$StartDate %>%
    str_which("Start Date")

  # Split data by batches (some allocation questions have the same id as forecast questions, e.g., Q70)
  data_raw_split <-
    list(
      batch_index[1]:(batch_index[2]-1),
      batch_index[2]:nrow(data)
    ) %>%
    map(
      ~ data %>%
        slice(.x) %>%
        select_if(~sum(!is.na(.)) > 0) # from https://stackoverflow.com/a/45383054/13945974
    )

  dv_id <-
    dv %>%
    c(str_c("forecast", c(1:5), sep = "_"))

  dv_replacement <-
    data_raw_split %>%
    map(
      ~ get_dv_replacement(.x, dv, dv_id)
    )

  data_pivot <-
    list(
      data_raw_split,
      dv_replacement
    ) %>%
    pmap(
      ~ pivot_data(
        .x,
        .y,
        dv_id %>%
          .[!. %in% "justification"]
      )
    )

  data_combined <-
    data_pivot %>%
    reduce(full_join, by = c("StartDate", "EndDate", "Status", "IPAddress", "Progress", "Duration (in seconds)", "Finished", "RecordedDate", "ResponseId", "RecipientLastName", "RecipientFirstName", "RecipientEmail", "ExternalReference", "LocationLatitude", "LocationLongitude", "DistributionChannel", "UserLanguage", "Q83", "prolific", "sex", "age", "language", "language_other", "country", "school", "reliability_amount", "alignment", "justification", "project", "ranking", "allocation", "confidence"))

  return(data_combined)

}
