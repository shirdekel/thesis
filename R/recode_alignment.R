##' @title Recode alignment

##' @param alignment
##'
##' @return
##' @author Shir Dekel
##' @export
recode_alignment <- function(alignment) {

  alignment %>%
    recode(
      "1" = "low",
      "2" = "high"
    )

}
