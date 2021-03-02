#' Get SD for forecast data
#'
#' @param df a dataframe.
#' @param weightings distribution forecast weightings.
#'
#' @return forecast SDs.
#'
#' @examples
#' \dontrun{
#' getsd(df, weightings)
#' }
getsd <- function(df, weightings) {
  forecasts.raw <- pull(df, .data$dv)
  map2(weightings, forecasts.raw, ~ rep(.x, .y)) %>%
    unlist() %>%
    sd()
}
