##' @title Anecdotes 2 location

##' @return
##' @author Shir Dekel
##' @export
get_location_anecdotes_2 <- function() {

  list(
    list(
      list(
        c(
          "microchip_anecdote_high_similarity",
          "microchip_anecdote_low_similarity"
        ),
        "microchip_target"
      ),
      list(
        c(
          "oil_anecdote_high_similarity",
          "oil_anecdote_low_similarity"
        ),
        "oil_target"
      )
    ),
    list(
      list(
        c(
          "location3_anecdote_high_similarity",
          "location3_anecdote_low_similarity"
        ),
        "location3_target"
      ),
      list(
        c(
          "location4_anecdote_high_similarity",
          "location4_anecdote_low_similarity"
        ),
        "location4_target"
      )
    ),
    list(
      list(
        c(
          "location5_anecdote_high_similarity",
          "location5_anecdote_low_similarity"
        ),
        "location5_target"
      ),
      list(
        c(
          "location6_anecdote_high_similarity",
          "location6_anecdote_low_similarity"
        ),
        "location6_target"
      )
    ),
    list(
      list(
        c(
          "location7_anecdote_high_similarity",
          "location7_anecdote_low_similarity"
        ),
        "location7_target"
      ),
      list(
        c(
          "location8_anecdote_high_similarity",
          "location8_anecdote_low_similarity"
        ),
        "location8_target"
      )
    ),
    list(
      list(
        c(
          "location9_anecdote_high_similarity",
          "location9_anecdote_low_similarity"
        ),
        "location9_target"
      ),
      list(
        c(
          "location10_anecdote_high_similarity",
          "location10_anecdote_low_similarity"
        ),
        "location10_target"
      )
    )
  ) %>%
    map(
      ~ .x %>%
        map(
          ~ .x %>%
            map_if(
              ~ length(.x) == 1,
              ~ .x %>% rep(2)
            ) %>%
            transpose()
        ) %>%
        transpose()
    )  %>%
    map(
      ~ .x %>%
      map(
        ~ .x %>%
          transpose()
      ) %>%
        transpose()
      ) %>%
    transpose() %>%
    map(transpose) %>%
    transpose() %>%
    set_names("high", "low")

}
