##' @title Generate positive probability sequence

##' @return
##' @author Shir Dekel
##' @export
get_prob_positive_seq <- function() {

  prob_positive_seq <- seq(from = 0.05, to = 0.95, by = 0.05) %>%
    .[!. %in% 0.5]

  return(prob_positive_seq)

}
