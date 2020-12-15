##' @title Rename interstitial
##'
##' Fixes multiple interstitial_1 issue
##'
##' If repeated, replace the second iteration of interstitial_1 with
##' interstitial_2

##' @return
##' @author Shir Dekel
##' @export
rename_interstitial <- function(data_other) {
  interstitial_1_find <-
    data_other %>%
    str_which("interstitial_1")

  if (length(interstitial_1_find) > 1) {
    data_other[interstitial_1_find[2]] <-
      data_other[interstitial_1_find[2]] %>%
      str_replace("interstitial_1", "interstitial_2")

    data_other
  } else {
    data_other
  }
}
