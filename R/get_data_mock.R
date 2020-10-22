##' @title Get mock data
##'
##' Remove data files under `data/` and generate the specified amount.
##' Dependent on the `experiment.js` generation

##' @return
##' @author Shir Dekel
##' @export
##' @param thesis_project
##' @param experiment
##' @param n
get_data_mock <- function(thesis_project, experiment_number, n = 1) {
  experiment <-
    str_c("experiment", experiment_number)

  phantom_js <-
    run_phantomjs()

  session <-
    Session$new(port = phantom_js$port)

  path <-
    here("inst", "jspsych", thesis_project, "testing", experiment)

  url <-
    file.path(path, "experiment", "index.html")

  data_folder <-
    here("inst", "jspsych", thesis_project, experiment, "data")

  data_folder %>%
    list.files(full.names = TRUE) %>%
    file.remove()

  seq_len(n) %>%
    walk(
      ~ run_data_mock(
        url,
        session,
        data_folder
      )
    )

  session$delete()
}
