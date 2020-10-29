##' @title Pivot DVs
##' @param data_raw_intrinsic_features_pivoted

##' @return
##' @author Shir Dekel
##' @export
pivot_dv <- function(data_raw_intrinsic_features_pivoted) {
  data_allocation <-
    data_raw_intrinsic_features_pivoted %>%
    pivot_wider(
      names_from = dv,
      values_from = value
    )
  return(data_allocation)
}
