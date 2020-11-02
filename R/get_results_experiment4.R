##' @title Experiment 4 results

##' @param data
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_experiment4 <- function(data, iv, dv) {
  choice <-
    data %>%
    nest_by(id, awareness, choice, project_order) %>%
    fit_glmer(
      choice ~ awareness + (1 | id),
      family = binomial,
      data = .
    ) %>%
    apa_print()

  awareness_project_order <-
    data %>%
    nest_by(id, awareness, choice, project_order) %>%
    fit_glmer(
      choice ~ awareness * project_order + (1 | id),
      family = binomial,
      data = .
    ) %>%
    apa_print()

  proportion <-
    data %>%
    nest_by(id, awareness, proportion) %>%
    ungroup() %>%
    get_ttest_apa(
      iv = "awareness",
      dv = "proportion"
    )

  project_expectation <-
    data %>%
    nest_by(id, awareness, project_expectation) %>%
    ungroup() %>%
    get_ttest_apa(
      iv = "awareness",
      dv = "project_expectation"
    )

  portfolio_binary <-
    fit_glmer(portfolio_binary ~ awareness + (1 | id),
      family = binomial,
      data = data %>%
        nest_by(id, awareness, portfolio_binary)
    ) %>%
    apa_print()

  portfolio_number <-
    data %>%
    nest_by(id, awareness, portfolio_number) %>%
    ungroup() %>%
    get_ttest_apa(
      iv = "awareness",
      dv = "portfolio_number"
    )

  results_experiment4 <-
    lst(
      choice,
      awareness_project_order,
      proportion,
      project_expectation,
      portfolio_binary,
      portfolio_number
    )

  return(results_experiment4)
}
