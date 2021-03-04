##' @title Import data
##'
##' For anecdotes 2
##' Needed because doesn't export datetime

##' @return
##' @author Shir Dekel
##' @export
##' @param data_directory
import_data_local_anecdotes_2 <- function(data_directory) {
  file_path <-
    data_directory %>%
    list.files(full.names = TRUE)

  file_path %>%
    map_df(import_with_datetime)
}
