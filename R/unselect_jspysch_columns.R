##' @title Unselect unnecessary jspsych columns

##' @return
##' @author Shir Dekel
##' @export
##' @param data_raw_filtered
unselect_jspysch_columns <- function(data_raw_filtered) {
  data_raw_jspsych_columns_unselected <-
    data_raw_filtered %>%
    select(
      -c(
        view_history
      )
    )
  return(data_raw_jspsych_columns_unselected)
}
