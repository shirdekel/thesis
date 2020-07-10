##' @title Get loss aversion coefficient
##'
##' @param expected_value_positive
##'
##' @param expected_value_negative
##'
##' @return
##' @author Shir Dekel
##' @export
get_gain_loss_ratio <- function(expected_value_positive, expected_value_negative) {

  gain_loss_ratio <- expected_value_positive/expected_value_negative

  return(gain_loss_ratio)

}
