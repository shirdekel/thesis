##' @title Anecdotes 2 location

##' @return
##' @author Shir Dekel
##' @export
get_location_anecdotes_2 <- function() {
  list(
    list(
      c(
        "microchip_anecdote",
        "microchip_target"
      ),
      c(
        "oil_anecdote",
        "oil_target"
      )
    ),
    list(
      c(
        "location3_anecdote",
        "location3_target"
      ),
      c(
        "location4_anecdote",
        "location4_target"
      )
    ),
    list(
      c(
        "location5_anecdote",
        "location5_target"
      ),
      c(
        "location6_anecdote",
        "location6_target"
      )
    ),
    list(
      c(
        "location7_anecdote",
        "location7_target"
      ),
      c(
        "location8_anecdote",
        "location8_target"
      )
    ),
    list(
      c(
        "location9_anecdote",
        "location9_target"
      ),
      c(
        "location10_anecdote",
        "location10_target"
      )
    )
  ) %>%
    map(
      ~ .x %>%
        transpose() %>%
        simplify_all()
    ) %>%
    transpose()
}
