##' @title Alignment 2 estimates

##' @return
##' @author Shir Dekel
##' @export
get_estimates_implicit <- function() {

model_alignment_2 <-
    get_model_alignment_2()

intercept <-
    model_alignment_2 %>%
    filter(term == "(Intercept)") %>%
    pull(estimate)

estimates <-
    list(
        fixed_effects = c(intercept, rep(0, 7)),
        random_effects = model_alignment_2 %>%
            filter(term == "sd__(Intercept)") %>%
            pull(estimate),
        residual_sd = model_alignment_2 %>%
            filter(term == "sd__Observation") %>%
            pull(estimate)
    )

  return(estimates)
}
