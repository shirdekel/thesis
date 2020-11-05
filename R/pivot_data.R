##' @title Pivot data
##'
##' Seems we have to pivot this many times because justification isn't split by project and also because of the way dv_replacement is coded for forecasts

##' @param data
##'
##' @param dv_replacement
##' @param dv_id
##'
##' @return
##' @author Shir Dekel
##' @export
pivot_data <- function(data, dv_replacement, dv_id) {

  data_pivot <-
    data %>%
    cleanProlific() %>%
    pivot_longer(
      -c(StartDate:school, npvReliability, alignment),
      names_to = "dv",
      values_to = "value",
      values_drop_na = TRUE,
    ) %>%
    mutate(across(dv, ~ .x %>%
                    recode(!!!dv_replacement))) %>%
    pivot_wider(
      everything(),
      names_from = dv,
      values_from = value
    ) %>%
    pivot_longer(
      contains(dv_id),
      names_to = "dv",
      values_to = "value",
    ) %>%
    pivot_wider(
      everything(),
      names_from = dv,
      values_from = value
    ) %>%
    pivot_if_forecast() %>%
    pivot_longer(
      contains(dv_id),
      names_to = c("dv", "project"),
      values_to = "value",
      names_pattern = "(.*)_(.)"
    ) %>%
    pivot_wider(
      everything(),
      names_from = dv,
      values_from = value
    )

  return(data_pivot)

}
