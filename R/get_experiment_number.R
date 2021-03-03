##' @title Get experiment number

##' @return
##' @author Shir Dekel
##' @export
get_experiment_number <- function() {
  experiment_number <-
    c(
      seq_len(4),
      seq_len(8),
      seq_len(2)
    ) %>%
    as.numeric()

  return(experiment_number)
}
