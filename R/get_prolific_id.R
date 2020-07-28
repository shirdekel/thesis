##' @title Write Prolific IDs to file
##'
##' To use for copying to Prolific for approval
##'
##' @param prolific
##' @param data
##'
##' @return
##' @author Shir Dekel
##' @export
get_prolific_id <- function(data, prolific) {

  data$prolific %>%
    unique() %>%
    write_lines(here("inst", "extdata", "prolific_id.txt"))

}
