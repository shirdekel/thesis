##' @title Alignment 8 model

##' @return
##' @author Shir Dekel
##' @export
##' @param df
##' @param formula
get_model_alignment_8 <- function(df, formula) {
  estimates_explicit <-
    get_estimates_alignment_2()

  formula_alignment_2 <-
    allocation ~
    alignment * reliability_amount * npv_amount +
      (1 | id)

  data_simulation_explicit <-
    get_data_simulation_raw(df, estimates_explicit, formula_alignment_2) %>%
    mutate(reliability_type = "explicit")

  estimates_implicit <-
    get_estimates_implicit()

  data_simulation_implicit <-
    get_data_simulation_raw(df, estimates_implicit, formula_alignment_2) %>%
    mutate(reliability_type = "implicit")

  data_simulation_raw <-
    data_simulation_implicit %>%
    bind_rows(data_simulation_explicit) %>%
    mutate(
      across(reliability_type, ~ .x %>%
             fct_relevel(c("implicit", "explicit")))
    )

  model <-
    get_mixed_model(
      formula,
      data_simulation_raw
    )

  return(model)
}
