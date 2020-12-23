##' @title Get success description
##'
##' Varies by valence condition

##' @return
##' @author Shir Dekel
##' @export
get_success <- function() {
  list(
    c(
      ## negative
      "struggled to establish itself",
      "make up for these issues"
    ),
    ## positive
    c(
      "performed really well",
      "take advantage of these benefits"
    )
  ) %>%
    rep(2) %>%
        ## statistics only
        append(
            list("" %>%
                rep(2))
        )
}
