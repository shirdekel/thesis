##' @title Get success description
##'
##' Varies by valence condition
##'
##' 1-3 for anecdote.
##' 4-5 for instructions.

##' @return
##' @author Shir Dekel
##' @export
get_success <- function() {
  list(
    c(
      ## negative
      "struggled to establish itself",
      "make up for these issues",
      "setbacks",
      "failed",
      "will not"
    ),
    ## positive
    c(
      "performed really well",
      "take advantage of these benefits",
      "resilience",
      "successful",
      "will"
    )
  ) %>%
    rep(2) %>%
    ## statistics only
    append(
      list("" %>%
        rep(5))
    )
}
