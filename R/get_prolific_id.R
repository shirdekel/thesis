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

  file_name <-
    str_c(
      str_c(
        "prolific_id",
        unique(data$thesis_project),
        unique(data$experiment),
        sep = "_"),
      ".txt"
    )

  data %>%
    filter(datetime > from_date) %>%
    pull(prolific) %>%
    unique() %>%
    write_lines(here("inst", "extdata", file_name))

}
