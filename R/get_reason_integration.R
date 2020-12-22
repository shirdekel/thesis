##' @title Get integration reason
##'
##' @return
##' @author Shir Dekel
##' @export
get_reason_integration <- function() {
  list(
    c(
      ## negative vertical
      str_c(
        "the project was reliant on in-house manufacturing and so was",
        "slow to adopt the newest technologies used by competitors",
        sep = " "
      ),
      ## negative horizontal
      str_c(
        "there was a greater regulatory scrutiny",
        "on the project, which slowed down some relevant processes",
        sep = " "
      )
    ),
    c(
      ## positive vertical
      str_c(
        "there was less reliance on other (under-performing)",
        "suppliers that competitors had to use",
        sep = " "
      ),
      ## positive horizontal
      str_c(
        "the project can be easily marketed to the customer",
        "base of the other business units in the company",
        sep = " "
      )
    )
  ) %>%
    map(latin_list) %>%
    rep(2) %>%
    c(NA)
}
