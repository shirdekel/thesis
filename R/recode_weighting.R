##' @title Recode weighting

##' @param weighting
##'
##' @return
##' @author Shir Dekel
##' @export
recode_weighting <- function(weighting) {

  weighting_replacement <-
    c(0.1, 0.08, 0.06, 0.04, 0.02, -0.02, -0.06, -0.08, -0.1) %>%
    set_names(c(1, 2, 3, 6, 7, 4, 5, 8, 9)) # Because of the weird way Qualtrics coded the questions originally. Can check in the correspondence of the actual questions and the question ID.

  weighting_recoded <-
    weighting %>%
    recode(!!!weighting_replacement)

  return(weighting_recoded)

}
