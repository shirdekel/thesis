##' @title Get estimates

##' @return
##' @author Shir Dekel
##' @export
##' @param model
get_estimates <- function(model) {
  fixed_effects <-
    model %>%
    filter(effect == "fixed") %>%
    pull(estimate)

  estimates <-
    list(
      fixed_effects = fixed_effects,
      random_effects = model %>%
        filter(term == "sd__(Intercept)") %>%
        pull(estimate),
      residual_sd = model %>%
        filter(term == "sd__Observation") %>%
        pull(estimate)
    )

  return(estimates)
}
