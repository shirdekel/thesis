##' @title Get prolific ID rejections
##' @param data_check
##' @return
##' @author Shir Dekel
##' @export
get_prolific_id_reject <- function(data_check, prolific_filter, prolific_filter_label) {
  if (is.na(prolific_filter_label)) prolific_filter_label <- character(0)
  file_name <-
    str_c(
      str_c(
        "prolific_id_reject",
        unique(data_check$thesis_project),
        unique(data_check$experiment),
        prolific_filter_label,
        sep = "_"
      ),
      ".txt"
    )

  data_check %>%
    filter_by_string(prolific_filter) %>%
    filter(reject) %>%
    pull(prolific) %>%
    unique() %>%
    write_lines(here("inst", "extdata", "prolific_id", file_name))
}
