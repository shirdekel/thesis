##' @title Get max/min NPV difference
##'
##' @param data
##' @param npv_amount
##' @param ...
##' @return
##' @author Shir Dekel
##' @export
get_max_min_difference <- function(data, npv_amount, ...) {
  max_min_difference <-
    data %>%
    nest_by(id, ...) %>%
    mutate(
      max_npv = data %>%
        slice_max({{ npv_amount }}) %>%
        pull(allocation) %>%
        unique(),
      min_npv = data %>%
        slice_min({{ npv_amount }}) %>%
        pull(allocation) %>%
        unique(),
      max_min_difference = max_npv - min_npv
    ) %>%
    unnest(data) %>%
    ungroup()

  return(max_min_difference)
}
