##' @title Get urlvar

##' @return
##' @author Shir Dekel
##' @export
##' @param condition_name
get_urlvar <- function(condition_name) {
  conditional <-
    str_c(
      "if typeof urlvar.",
      condition_name,
      " != 'undefined' then ",
      condition_name,
      "_condition = urlvar.",
      condition_name,
      ";"
    )

  urlvar <-
    c(
      "urlvar = jsPsych.data.urlVariables()",
      conditional
    )

  return(urlvar)
}
