##' @title Get anecdote analysis
##' @return
##' @author Shir Dekel
##' @export
##' @param business_name
##' @param success
##' @param reason_location
##' @param location
##' @param structure
##' @param reason_structure
##' @param integration
##' @param reason_integration
##' @param reason_cutoff
##' @param value_string
##' @param reason_value_string
##' @param value_numeric
##' @param cutoff
##' @param unit
get_analysis <- function(business_name, success, reason_location, location,
                         structure, reason_structure, integration,
                         reason_integration, reason_cutoff, value_string,
                         reason_value_string, value_numeric, cutoff, unit) {
  str_c(
    business_name,
    success,
    "in the regional market because of",
    reason_location,
    "in the",
    location %>%
      str_replace(", (.*)", ""),
    "area. A",
    structure,
    "organisational structure meant that",
    str_c(
      reason_structure,
      ". Being"
    ),
    str_c(
      integration,
      "ly integrated meant that"
    ),
    str_c(
      reason_integration,
      ". A post hoc analysis concluded that"
    ),
    reason_cutoff[[1]],
    str_c(
      cutoff[[1]],
      unit[[1]]
    ),
    reason_cutoff[[2]],
    str_c(
      cutoff[[2]],
      unit[[2]]
    ),
    ". Further,",
    reason_cutoff[[3]],
    cutoff[[3]],
    unit[[3]],
    ". Further,",
    reason_value_string,
    value_string,
    ".",
    sep = " "
  )
}
