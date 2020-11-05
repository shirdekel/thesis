##' @title Get mock data
##'
##' Remove data files under `data/` and generate the specified amount.
##' Dependent on the `experiment.js` generation
##'
##' Don't generate data if not designated a test (as a side effect, this also
##' won't generate data for old qualtrics experiments)

##' @return
##' @author Shir Dekel
##' @export
##' @param testing_directory
##' @param data_directory_server
##' @param n
##' @param test
get_data_mock <- function(testing_directory, data_directory_server, n = 1, test = TRUE) {
  if (test) {
    phantom_js <-
      run_phantomjs()

    session <-
      Session$new(port = phantom_js$port)

    url <-
      file.path(testing_directory, "index.html")

    data_directory_mock <-
      testing_directory %>%
      dirname() %>%
      file.path("data")

    data_directory_mock %>%
      list.files(full.names = TRUE) %>%
      file.remove()

    seq_len(n) %>%
      walk(
        ~ run_data_mock(
          url,
          session,
          data_directory_mock
        )
      )

    session$delete()

    return(data_directory_mock)
  } else {
    return(data_directory_server)
  }
}
