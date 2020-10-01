get_reliability_explicit <- function(npv) {
  reliability_explicit_keyword <-
    list(
      "an <b>unreliable</b>",
      "a <b>reliable</b>"
    )

  reliability_explicit <-
    reliability_explicit_keyword %>%
    map_chr(
      ~ str_c(
        npv,
        " million. <br>(In this particular industry, NPV is ",
        .x,
        " predictor of project success.)"
      )
    )

  return(reliability_explicit)
}
