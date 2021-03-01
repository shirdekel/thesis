##' @title Get NPV x allocation correlation

##' @param data_clean
##'
##' @return
##' @author Shir Dekel
##' @export
get_npv_allocation_correlation <- function(data_clean) {

  npv_allocation_correlation <-
    data_clean %>%
    group_by(id, phase, alignment, reliability_amount) %>%
    mutate(
      npv_allocation_correlation = cor(npv_amount, allocation)
    ) %>%
    ungroup()

  return(npv_allocation_correlation)

}
