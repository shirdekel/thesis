##' @title Recode reliability

##' @return
##' @author Shir Dekel
##' @export
recode_reliability <- function(reliability) {

  reliability %>%
    recode(
    "1" = "high",
    "2" = "low",
    "3" = "noNPV"
  )

}
