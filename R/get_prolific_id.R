##' @title Write Prolific IDs to file
##'
##' To use for copying to Prolific for approval
##'
##' @param prolific_filter
##' @param prolific_filter_label
##' @param data
##'
##' @return
##' @author Shir Dekel
##' @export
get_prolific_id <- function(data, prolific_filter, prolific_filter_label) {

  file_name <-
    str_c(
      str_c(
        "prolific_id",
        unique(data$thesis_project),
        unique(data$experiment),
        prolific_filter_label,
        sep = "_"),
      ".txt"
    )

  data %>%
    filter_by_string(prolific_filter) %>%
    pull(prolific) %>%
    unique() %>%
    write_lines(here("inst", "extdata", file_name))

}
