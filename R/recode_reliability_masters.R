##' @title Recode reliability_amount for masters sample
##'
##' Change high and low because originally coded as `variance`, which has opposite coding to `reliability_amount`. For instance, high variance implies low reliability.

##' @return
##' @author Shir Dekel
##' @export
recode_reliability_masters <- function(reliability_amount) {

  reliability_amount %>%
    recode("high" = "low",
           "low" = "high")

}
