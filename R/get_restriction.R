##' @title Get restriction logicals
##' @param restriction_values
##' @return
##' @author Shir Dekel
##' @export
get_restriction <- function(restriction_values) {

  restriction <- (restriction_values$expected_value > 0) & (restriction_values$gain_loss_ratio < 2)

  return(restriction)

}
