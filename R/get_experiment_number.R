##' @title Get experiment number

##' @return
##' @author Shir Dekel
##' @export
get_experiment_number <- function() {
  experiment_number <-
    c(
      c(2:4),
      c(1:3, 7, 8),
      seq_len(2)
    )
  return(experiment_number)
}
