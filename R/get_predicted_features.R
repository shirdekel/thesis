##' .. content for \description{} (no empty lines) ..
##'
##' .. content for \details{} ..
##'
##' @title
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
