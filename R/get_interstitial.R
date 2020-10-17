##' @title Get interstitial 1 for alignment 8

##' @return
##' @author Shir Dekel
##' @export
##' @param interstitial_number
get_interstitial <- function(interstitial_number) {
  interstitial_name <-
    str_c(
      "interstitial",
      interstitial_number,
      sep = "_"
    )

  interstitial_html <-
    withTags(
      p(
        str_c(
          "You will now see the",
          ordinal(interstitial_number),
          "project display. It is important that you pay attention. Click the following checkbox before continuing on to the next page: ",
          sep = " "
        ),
        label(
          `for` = interstitial_name,
          "I will read through and complete the next task carefully."
        ),
        input(
          type = "checkbox",
          name = interstitial_name,
          id = "pass",
        )
      )
    ) %>%
    as.character()

  return(interstitial_html)
}
