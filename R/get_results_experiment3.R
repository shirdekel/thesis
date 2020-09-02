##' @title Experiment 3 results

##' @param data
##'
##' @return
##' @author Shir Dekel
##' @export
get_results_experiment3 <- function(data) {

  choice <-
    fit_glmer(
      choice ~ similarity + (1 | id),
      family = binomial,
      data = data
    ) %>%
    apa_print()

  proportion <-
    data %>%
    nest_by(id, similarity, proportion) %>%
    ungroup() %>%
    get_ttest_apa(
      iv = "similarity",
      dv = "proportion"
    )

  project_expectation <-
    data %>%
    nest_by(id, similarity, project_expectation) %>%
    ungroup() %>%
    get_ttest_apa(
      iv = "similarity",
      dv = "project_expectation"
    )

  portfolio_binary <-
    fit_glmer(
      portfolio_binary ~ similarity + (1 | id),
      family = binomial,
      data = data %>%
        nest_by(id, similarity, portfolio_binary)
    ) %>%
    apa_print()

  portfolio_number <-
    data %>%
    nest_by(id, similarity, portfolio_number) %>%
    ungroup() %>%
    get_ttest_apa(
      iv = "similarity",
      dv = "portfolio_number"
    )

  results_experiment3 <-
    lst(
      choice,
      proportion,
      project_expectation,
      portfolio_binary,
      portfolio_number
    )

  return(results_experiment3)

}
