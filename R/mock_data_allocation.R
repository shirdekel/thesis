##' @title Enter allocation data
##'
##' Get max of the input, generate a vector of values with length of the number
##' of inputs, that sum to the max.
##'
##' @param session
##' @param screenshot
##' @return
##' @author Shir Dekel
##' @export
mock_data_allocation <- function(session, screenshot) {
  allocation <-
    session$findElements(".allocation")

  allocation_max <-
    allocation[[1]]$getAttribute("max") %>%
    as.numeric()

  allocation_length <-
    allocation %>%
    length()

  allocation_sample <-
    allocation_length %>%
    rand_vect(allocation_max, sd = 10) %>%
    as.character()

  list(allocation, allocation_sample) %>%
    pmap(
      function(allocation_element, allocation_sample_value) {
        allocation_sample_value %>%
          allocation_element$setValue()
      }
    )

  if (screenshot) session$takeScreenshot()
}
