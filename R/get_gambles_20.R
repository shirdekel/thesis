##' @title Get a set of 20 gambles with restrictions

##' @param prob_positive_seq
##'
##' @param outcome_positive_seq
##'
##' @return
##' @author Shir Dekel
##' @export
get_gambles_20 <- function(prob_positive_seq,
                           outcome_positive_seq) {

  restricted_values <-
    get_restricted_values(
      prob_positive_seq,
      outcome_positive_seq
    )

  gambles_20 <-
    get_gambles(restricted_values, 20)

  return(gambles_20)

}
