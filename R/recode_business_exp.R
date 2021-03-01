##' @title Recode business experience variable
##'
##' Originally coded as `None`, `1`, `2`, `3` ...

##' @param business_exp
##'
##' @return
##' @author Shir Dekel
##' @export
recode_business_exp <- function(business_exp) {

  business_exp %>%
    recode("None" = "0")

}
