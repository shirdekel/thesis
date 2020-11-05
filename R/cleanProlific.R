#' Clean Prolific data
#'
#' @param data a dataframe.
#'
#' @return A dataframe.
#'
#' @examples
#' \dontrun{
#' cleanProlific(data)
#' }
cleanProlific <- function(data) {
  idLocation <- data[1, ] %>%
    str_which("Prolific") %>%
    as.numeric()
  idVector <- data[idLocation] %>%
    pull()
  data %>%
    filter(str_length(idVector) > 20 & .data$Finished == "True")
}
