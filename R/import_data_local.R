##' @title Import data
##' @param data_directory
##'
##' @return
##' @author Shir Dekel
##' @export
import_data_local <- function(data_directory) {

  data_raw_local <-
    data_directory %>%
    list.files(full.names = TRUE) %>%
    map_dfr(~ .x %>%
              read_csv(col_types = cols()))

  return(data_raw_local)

}
