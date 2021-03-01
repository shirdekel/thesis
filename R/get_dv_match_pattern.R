##' @title Get DV match pattern
##'
##' For matching DVs in the reference doc (to then find out the corresponding question ID)

##' @return
##' @author Shir Dekel
##' @export
get_dv_match_pattern <- function() {

  dv_match_pattern <-
    c(
      "allocat",
      "Rank",
      "How confident",
      "Justify",
      "undergraduate",
      "experience",
      "your knowledge of Net"
    )

  return(dv_match_pattern)

}
