get_reliability_implicit <- function(npv) {
  range <-
    npv %>%
    map2_chr(
      c(0.85, 0.05), # low reliability, high reliability, to keep consistent
                     # with explicit reliability
      ~ getrange(.x, .y)
    )

  reliability_implicit <-
    str_c(
      range,
      " million.<br>(Midpoint: ",
      npv,
      ".)"
    )

  return(reliability_implicit)
}
