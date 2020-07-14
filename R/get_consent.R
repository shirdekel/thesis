##' .. content for \description{} (no empty lines) ..
##'
##' .. content for \details{} ..
##'
##' @title

##' @return
##' @author Shir Dekel
##' @export
get_consent <- function() {

  trial_generic(
    "external-html",
    url = insert_resource("consent.html"),
    cont_btn = "start",
    check_fn = insert_javascript("check_consent")
  )

}
