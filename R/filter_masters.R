##' @title Filter Masters data

##' @param data_raw
##'
##' @return
##' @author Shir Dekel
##' @export
filter_masters <- function(data_raw) {

  masters_filtered <-
    data_raw %>%
    filter(
      .data$Status == "IP Address", # As opposed to 'Survey Test'
      .data$Finished == "True",
      str_detect(.data$StartDate, "2018-10-31")
    )

  return(masters_filtered)

}
