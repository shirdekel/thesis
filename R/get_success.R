##' @title Get success description
##'
##' Varies by valence condition

##' @return
##' @author Shir Dekel
##' @export
get_success <- function() {
  c(
    ## negative
    "struggled to establish itself",
    ## positive
    "performed really well"
  ) %>%
    rep(2) %>%
    ## statistics only
    c("")
}
