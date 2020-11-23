##' @title Get anecdote reason

##' @return
##' @author Shir Dekel
##' @export
get_reason <- function() {
  reason <-
    list(
      structure = c(
        "communication across relevant business units was",
        "key operational decisions were"
      ),
      integration = c(
        "other well sites due to a drain on the collective resources",
        "retail sites due to miscalculations of petrol supply"
      ),
      type = c(
        "difficult to construct",
        "susceptible to crude oil price changes"
      )
    ) %>%
    transpose()
  return(reason)
}
