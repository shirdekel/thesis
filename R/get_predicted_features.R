##' @title Get predicted features
##'
##' Anecdotes 2
##' @param value
##' @param feature
##' @param unit
##' @return
##' @author Shir Dekel
##' @export
get_predicted_features <- function(value, feature, unit) {
  str_c(feature, ": ", value, unit) %>%
    list() %>%
    get_html_list()
}
