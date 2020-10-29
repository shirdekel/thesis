##' @title Get random correlated vector
##' @param base_vector
##' @param target_correlation
##' @param tol
##' @param ... to rand_vect

##' @return
##' @author Shir Dekel
##' @export
rand_vect_correlated <- function(base_vector, target_correlation, tol = 0.1, ...) {
  correlation_approximate <- FALSE
  while (!correlation_approximate) {
    target_vector <- rand_vect(...)
    correlation <- suppressWarnings(cor(base_vector, target_vector))
    if (is.na(correlation)) correlation <- 0
    correlation_approximate <-
      correlation %>%
      near(target_correlation, tol = tol)
  }
  return(target_vector)
}
