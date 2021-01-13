##' @title Get old seeds

##' @return
##' @author Shir Dekel
##' @export
get_old_seed <- function() {

  restricted_values <- 2068659205
    ## diagnose(restricted_values)$seed

  gambles <- 336030447
    ## diagnose(gambles)$seed

  experiment4 <- 1827196820
    ## diagnose(experiment4)$seed

  old_seed <-
    lst(
      restricted_values,
      gambles,
      experiment4
    )

  return(old_seed)

}
