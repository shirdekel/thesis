##' @title Get old seeds

##' @return
##' @author Shir Dekel
##' @export
get_old_seed <- function() {

  restricted_values <-
    diagnose(restricted_values)$seed

  gambles <-
    diagnose(gambles)$seed

  old_seed <-
    lst(
      restricted_values,
      gambles
    )

}
