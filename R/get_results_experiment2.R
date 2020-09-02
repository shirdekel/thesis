##' @title Get results
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_results_experiment2 <- function(data) {

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


  results_experiment2 <-
    lst(
      choice,
      proportion,
      portfolio_binary,
      portfolio_number
    )

  return(results_experiment2)

}
