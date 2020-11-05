##' @title Extra pivot if forecast data

##' @return
##' @author Shir Dekel
##' @export
pivot_if_forecast <- function(data){
  if (data %>%
      names() %>%
      str_detect("forecast") %>%
      any()) {
    data %>%
      pivot_longer(
        contains("forecast"),
        names_to = c("dv", "weighting"),
        values_to = "value",
        names_pattern = "(.*)_(.)"
      ) %>%
      pivot_wider(
        everything(),
        names_from = dv,
        values_from = value
      )
  } else {
    return(data)
  }
}
