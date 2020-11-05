##' @title Get results
##' @param data
##' @param iv
##' @param dv
##' @return
##' @author Shir Dekel
##' @export
get_results_aggregation_2 <- function(data, iv, dv) {
  data_split <-
    split_data(data)

  choice <-
    get_results_glmer(data_split, "choice")

  proportion <-
    get_results_ttest(data_split, "proportion")

  portfolio_binary <-
    get_results_glmer(data_split, "portfolio_binary")

  portfolio_number <-
    get_results_ttest(data_split, "portfolio_number")

  sample_size <-
    pwr.t.test(d = mean(c(0.47, 0.22)), power = 0.8) %>%
    .[["n"]] %>%
    prod(2) %>%
    ceiling()

  results_experiment2 <-
    lst(
      choice,
      proportion,
      portfolio_binary,
      portfolio_number
    )

  return(results_experiment2)
}
