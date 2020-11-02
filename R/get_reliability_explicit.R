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
        " million. <br>(In this industry, NPV is ",
        .x,
        " predictor of a project's profits.)"
      )
    )

  return(reliability_explicit)
}
