##' @title Get distribution preamble
##' @param preamble_distribution_absent
##' @return
##' @author Shir Dekel
##' @export
get_preamble_distribution_present <- function(preamble_distribution_absent) {

  preamble_distribution_present <- preamble_distribution_absent %>%
    str_c(
      p("Below is the probability distribution of final outcomes if all gambles were chosen.") %>%
        as.character(),
      div(
        img(src = insert_resource("distribution.png"),
            width = "600",
            height = "400"),
        .noWS = "inside"
      ) %>%
        as.character())

  return(preamble_distribution_present)

}
