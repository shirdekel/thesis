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
filter_data_raw_jspsych <- function(data_raw, thesis_project, experiment_number) {
  experiment <- str_c("experiment", experiment_number)

  if (thesis_project == "aggregation" & experiment == "experiment2") {
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
  } else if (thesis_project == "anecdotes" & experiment == "experiment1") {
    data_raw <-
      data_raw %>%
      mutate(
        experiment = "experiment1",
        thesis_project = "anecdotes"
      )
  }

  data_raw_filtered <-
    data_raw %>%
    # Filtering the experiment object in this case seem to require unquoting
    filter(
      experiment == !!experiment,
      thesis_project == thesis_project
    )

  return(data_raw_filtered)
}
