##' @title Alignment 2 estimates

##' @return
##' @author Shir Dekel
##' @export
get_estimates_alignment_2 <- function() {

model_alignment_2 <-
    get_model_alignment_2()

fixed_effects <-
    model_alignment_2 %>%
    filter(effect == "fixed") %>%
    pull(estimate)

estimates <-
    list(
        fixed_effects = fixed_effects,
        random_effects = model_alignment_2 %>%
            filter(term == "sd__(Intercept)") %>%
            pull(estimate),
        residual_sd = model_alignment_2 %>%
            filter(term == "sd__Observation") %>%
            pull(estimate)
    )

  return(estimates)
}
