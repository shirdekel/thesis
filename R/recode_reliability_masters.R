##' @title Recode reliability for masters sample
##'
##' Change high and low because originally coded as `variance`, which has opposite coding to `reliability`. For instance, high variance implies low reliability.

##' @return
##' @author Shir Dekel
##' @export
recode_reliability_masters <- function(reliability) {

  reliability %>%
    recode("high" = "low",
           "low" = "high")

}
