##' @title Busines names anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_business_name_anecdotes_2 <- function() {
  list(
    c(
      "Microxy",
      "microchip2"
     ),
    c(
      "Enfuel",
      "Refinera"
     )
  ) %>%
    transpose() %>%
    map(unlist)
}
