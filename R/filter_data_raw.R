##' @title Filter raw data
##'
##' Take the full csv from the server and split it up according to the relevant
##' experiment.
##'
##' Previously, downloading new data meant that every experiment reran data
##' cleaning
##'
##' @param data_raw
##' @param thesis_project
##' @param experiment_number
##' @return
##' @author Shir Dekel
##' @export
filter_data_raw <- function(data_raw, thesis_project, experiment_number) {
  if (experiment_number == 8) experiment_number <- 4

  experiment <- str_c("experiment", experiment_number)

  if (experiment == "experiment2") {
    data_raw <-
      data_raw %>%
      rowwise() %>%
      mutate(
        across(c(experiment, sample, stage), ~ .x %>%
          map_if(validate, fromJSON) %>%
          unlist()),
        across(experiment, ~ .x %>%
          recode("aggregation_exp2" = "experiment2")),
        thesis_project = "aggregation",
        similarity = "high"
      ) %>%
      ungroup()
  }

  data_raw_filtered <-
    data_raw %>%
    # Filtering the experiment object in this case seem to require unquoting
    filter(
      experiment == !!experiment,
      thesis_project == "aggregation"
    )

  return(data_raw_filtered)
}
