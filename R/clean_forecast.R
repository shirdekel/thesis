##' @title Clean forecasts

##' @param data
##'
##' @return
##' @author Shir Dekel
##' @export
clean_forecast <- function(data) {

  forecast_clean <-
    data %>%
    rowwise(id) %>%
    mutate(
      weighted_forecast = list(
        na.omit(weighting) %>%
          rep(na.omit(forecast))
      )
    ) %>%
    group_by(id, project) %>%
    mutate(
      forecast_mean = weighted_forecast %>%
        unlist() %>%
        mean(),
      forecast_sd = weighted_forecast %>%
        unlist() %>%
        sd()
    ) %>%
    ungroup()

  return(forecast_clean)

}
