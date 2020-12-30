##' @title Get value for anecdotes 2

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
    as.integer() %>%
    c(value_string)
}
