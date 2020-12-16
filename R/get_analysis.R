##' @title Get anecdote analysis
##' @param anecdote_info

##' @return
##' @author Shir Dekel
##' @export
##' @param business_name
##' @param location
##' @param integration
##' @param structure
##' @param value_string
##' @param value_numeric
##' @param reason
##' @param cutoff
get_analysis <- function(business_name, success, reason_location, location, integration,
                         structure, value_string, value_numeric, reason, cutoff) {
  str_c(
    business_name,
    success,
    "in the regional market because",
    reason_location,
    "in the",
    location %>%
      str_replace(", (.*)", ""),
    "area. A",
    structure,
    "organisational structure meant that",
    reason$structure,
    "delayed with what needed to be a timely process. Being",
    str_c(
      integration,
      "ly integrated meant that these delays caused losses at the"
    ),
    str_c(
      reason$integration,
      ". To make up for this, a post hoc analysis concluded that oil was needed to be extracted at a rate of"
    ),
    str_c(
      cutoff[[1]],
      "L an hour and sites have at least a"
    ),
    str_c(
      cutoff[[3]],
      "% probability of finding oil before management approved the project. Further, machinery needed to have thought to last at least"
    ),
    cutoff[[2]],
    "years before requiring maintenance, because maintenance costs further offset the initial investment after the",
    value_numeric[[2]],
    "years of development. Further, the well was quite",
    reason$type,
    "due to it being an",
    value_string,
    "well, and so added additional financial setbacks over the course of the project.",
    sep = " "
  )
}
