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
  # For some reason passing an empty argument into pmap leads to an empty list and the function isn't evaluated. So we're passing NAs and converting to empty here so that the file_name doesn't have the extra label if it isn't needed.
  if (is.na(prolific_filter_label)) prolific_filter_label<- character(0)

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
