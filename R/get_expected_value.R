##' @title Get gamble expected value
##' @param expected_value_positive
##'
##' @param expected_value_negative
##'
##' @return
##' @author Shir Dekel
##' @export
get_expected_value <- function(expected_value_positive, expected_value_negative) {

  expected_value <- expected_value_positive-expected_value_negative

  return(expected_value)

}
