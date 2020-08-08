##' @title Write Prolific IDs to file
##'
##' To use for copying to Prolific for approval
##'
##' @param data
##' @param from_date
##'
##' @return
##' @author Shir Dekel
##' @export
get_prolific_id <- function(data, from_date = "2020-07-28") {

  data %>%
    filter(datetime > from_date) %>%
    pull(prolific) %>%
    unique() %>%
    write_lines(here("inst", "extdata", "prolific_id.txt"))

}
