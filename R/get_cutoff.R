##' @title Get cutoff value
##' @param val_trans

##' @return
##' @author Shir Dekel
##' @export
##' @param val_trans
get_cutoff <- function(val_trans) {
  cutoff <-
    val_trans %>%
    map2(c(1.5 %>% rep(2), 1.2), ~ round(.x * .y)) %>%
    transpose()
  return(cutoff)
}
