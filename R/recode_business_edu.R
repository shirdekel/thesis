##' @title Recode business_edu

##' @return
##' @author Shir Dekel
##' @export
recode_business_edu <- function(business_edu) {

  business_edu %>%
    recode(
      "Yes" = 1,
      "No (please specify)" = 0
    )

}
