##' @title Get mock data
##'
##' Remove data files under `data/` and generate the specified amount.
##' Dependent on the `experiment.js` generation

##' @return
##' @author Shir Dekel
##' @export
get_data_mock <- function(experiment, n = 1) {

  phantom_js <-
    run_phantomjs()

  session <-
    Session$new(port = phantom_js$port)

  path <-
    here("inst", "jspsych", "testing", experiment)

  url <-
    file.path(path, "experiment", "index.html")

  data_folder <-
    here("inst", "jspsych", experiment, "data")

  data_folder %>%
    list.files(full.names = TRUE) %>%
    file.remove()

  1:n %>%
    walk(
      ~ run_data_mock(
        url,
        session,
        data_folder
      )
    )

  session$delete()

}
