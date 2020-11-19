##' @title Alignment 8 model
##'
##' Get model with regression coefficients of Experiment 2 for the explicit
##' condition, no effects for the implicit condition, and the intercept and
##' residual variance of Experiment 2.
##' @return
##' @author Shir Dekel
##' @export
##' @param df
##' @param formula
get_model_alignment_8 <- function(n = 8, npv_amount) {
  df <-
    get_df_alignment_8(n, npv_amount)

  loadd(data_clean_alignment_2)

  model_alignment_2 <-
    data_clean_alignment_2 %>%
    filter(reliability_amount != "noNPV") %>%
    droplevels() %>%
    nest_by(id, allocation, alignment, reliability_amount, npv_amount) %>%
    lm(
      allocation ~ alignment * reliability_amount * npv_amount,
      data = .
    )

  y_explicit <-
    predict(model_alignment_2, newdata = df)

  data_simulation_explicit <-
    df %>%
    mutate(
      allocation = y_explicit,
      reliability_type = "explicit"
    )

  intercept_alignment_2 <-
    model_alignment_2 %>%
    tidy() %>%
    filter(term == "(Intercept)") %>%
    pull(estimate)

  residual_sd_alignment_2 <-
    model_alignment_2 %>%
    glance() %>%
    pull(sigma)

  data_simulation_implicit <-
    df %>%
    mutate(
      allocation = intercept_alignment_2
    ) %>%
    mutate(reliability_type = "implicit")

  data_simulation_raw <-
    data_simulation_implicit %>%
    bind_rows(data_simulation_explicit) %>%
    mutate(
      across(reliability_type, ~ .x %>%
        fct_relevel(c("implicit", "explicit")))
    )

  model <-
    lm(
      allocation ~
      npv_amount * reliability_amount * alignment * reliability_type,
      data = data_simulation_raw,
    )

  return(model)
}
