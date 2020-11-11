##' @title Get mixed model tidy
##' @param formula
##' @param data
##' @param method

##' @return
##' @author Shir Dekel
##' @export
get_mixed_model <- function(formula, data, method = "S") {
  model <-
    data %>%
    mixed(
      formula,
      data = .,
      method = method
    ) %>%
    .[["full_model"]] %>%
    tidy()

  return(model)
}
