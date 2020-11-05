##' @title Recode age variable
##'
##' The max is 1976, so I'm assuming the participant entered his year of birth. Subsequent experiments restricted age values over 100.

##' @param age
##'
##' @return
##' @author Shir Dekel
##' @export
recode_age <- function(age) {

  age %>%
    recode("1976" = "43")

}
