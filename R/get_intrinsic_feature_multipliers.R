##' @title Get intrinsic feature multipliers

##' @return
##' @author Shir Dekel
##' @export
get_intrinsic_feature_multipliers <- function() {

  intrinsic_feature_multipliers <-
    list(
      list(c(1, 1, 1), c(10, 10, 10)),
      list(c(1, 1, 1), c(10, 10, 10)),
      list(c(1, 1, 1), c(10, 10, 10)),
      list(c(1, 1, 1), c(10, 10, 10)),
      list(c(2, 1.1, 3), c(5, 1.6, 8))
    ) %>%
    map(
      ~ .x %>%
        pmap(
          function(from, to) {
            seq(from = from, to = to, length.out = 5)
          }
        )
    )

  return(intrinsic_feature_multipliers)

}
