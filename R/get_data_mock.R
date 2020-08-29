##' @title

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
