##' @title Get restriction logicals
##'
##' @param gain_loss_ratio_restriction
##' @param restriction_values
##'
##' @return
##' @author Shir Dekel
##' @export
get_restriction <- function(restriction_values, gain_loss_ratio_restriction) {

  restriction <- (restriction_values$expected_value > 0) & (restriction_values$gain_loss_ratio < gain_loss_ratio_restriction)

  return(restriction)

}
