##' @title Import psych server data

##' @param data_directory_server
##'
##' @return
##' @author Shir Dekel
##' @export
import_data_server <- function(data_directory_server) {

  file_paths <- data_directory_server %>%
    list.files(full.names = TRUE)

  # Select the most recent data file

  dates <- file_paths %>%
    str_match(".*JSPsychData(.*).csv") %>%
    .[, 2] %>%
    dmy_hm()

  dates_max <- dates %>%
    max() %>%
    as.character()

  file_path <- file_paths[str_which(dates, dates_max)]

  data_server <- file_path %>%
    read_csv(col_types = cols()) %>%
    select(sectionName, sectionValue, time_elapsed, dateCreated) %>%
    pivot_wider(names_from = "sectionName",
                values_from = "sectionValue")

  return(data_server)

}
