##' @title Import with datetime
##'
##' For Anecdotes 2
##'
##' File name has the datetime
##' @param file_path
##' @return
##' @author Shir Dekel
##' @export
import_with_datetime <- function(file_path) {
  datetime <-
    file_path %>%
    str_match("Data_(.*)-\\d{6}.csv") %>%
    .[, 2]

  file_path %>%
    read_csv(col_types = cols()) %>%
    mutate(
      dateCreated = datetime
    )
}
