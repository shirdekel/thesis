#' Get mean and SD of forecasts
#'
#' @param data a dataframe.
#' @param forecastName name of relevant DV.
#' @param weightings distribution forecast weightings.
#' @param fun
#'
#' @return A dataframe.
#'
#' @examples
#' \dontrun{
#' getforecast(data, forecastName, weightings)
#' }
getforecast <- function(data, forecastName, fun, weightings) {
  data %>%
    group_by(.data$reliability_amount, .data$alignment, .data$id, .data$project, .data$sex, .data$age, .data$npv_amount) %>%
    nest() %>%
    mutate(!!forecastName := map_dbl(data, get(fun), weightings), data = NULL) %>%
    ungroup()
}
