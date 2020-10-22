##' @title Get mock data
##'
##' Remove data files under `data/` and generate the specified amount.
##' Dependent on the `experiment.js` generation

##' @return
##' @author Shir Dekel
##' @export
##' @param testing_directory
##' @param n
##' @param test
get_data_mock <- function(testing_directory, n = 1, test = TRUE) {
  if (test) {
    phantom_js <-
      run_phantomjs()

    session <-
      Session$new(port = phantom_js$port)

    url <-
      file.path(testing_directory, "index.html")

    data_folder <-
      testing_directory %>%
      dirname() %>%
      file.path("data")

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
  } else {
    return(NA)
  }
}
