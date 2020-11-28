##' .. content for \description{} (no empty lines) ..
##'
##' .. content for \details{} ..
##'
##' @title

##' @return
##' @author Shir Dekel
##' @export
##' @param value_numeric
##' @param multiplier
##' @param value_string
get_value <- function(
                      value_numeric,
                      multiplier,
                      value_string) {
  round(value_numeric * multiplier) %>%
    c(value_string)
}
