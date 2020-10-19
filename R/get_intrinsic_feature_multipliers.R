##' @title Get intrinsic feature multipliers

##' @return
##' @author Shir Dekel
##' @export
##' @param npv
get_intrinsic_feature_multipliers <- function(npv) {
  max_min_ratio <-
    npv %>%
    map(
      ~ .x %>%
        max(.) / min(.)
    )

  intrinsic_feature_multipliers <-
    list(
      list(
        c(max_min_ratio[1], max_min_ratio[1], max_min_ratio[1]),
        c(max_min_ratio[1], max_min_ratio[1], 1.1),
        c(max_min_ratio[1], max_min_ratio[1], max_min_ratio[1]),
        c(max_min_ratio[1], 1.3, max_min_ratio[1]),
        c(max_min_ratio[1], 1.6, max_min_ratio[1])
      ),
      list(
        c(max_min_ratio[2], max_min_ratio[2], 1.1),
        c(max_min_ratio[2], 1.2, 1.1),
        c(max_min_ratio[2], max_min_ratio[2], 1.05),
        c(max_min_ratio[2], max_min_ratio[2], max_min_ratio[2]),
        c(max_min_ratio[2], max_min_ratio[2], max_min_ratio[2])
      )
    ) %>%
    map_depth(
      3,
      ~ seq(from = 1, to = .x, length.out = 5)
    )

  return(intrinsic_feature_multipliers)
}
