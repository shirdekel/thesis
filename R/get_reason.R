##' @title Get anecdote reason

##' @return
##' @author Shir Dekel
##' @export
get_reason <- function() {
  list(
    list(
      list(
        c(
          "reason_microchip_1_1",
          "reason_microchip_1_2"
        ),
        c(
          "reason_microchip_2_1",
          "reason_microchip_2_2"
        ),
        c(
          "reason_microchip_3_1",
          "reason_microchip_3_2"
        )
      ),
      list(
        c(
          "communication across relevant business units was",
          "key operational decisions were"
        ),
        c(
          "other well sites due to a drain on the collective resources",
          "retail sites due to miscalculations of petrol supply"
        ),
        c(
          "difficult to construct",
          "susceptible to crude oil price changes"
        )
      )
    ),
    list(
      list(
        c(
          "reason_project3_1_1",
          "reason_project3_1_2"
        ),
        c(
          "reason_project3_2_1",
          "reason_project3_2_2"
        ),
        c(
          "reason_project3_3_1",
          "reason_project3_3_2"
        )
      ),
      list(
        c(
          "reason_project4_1_1",
          "reason_project4_1_2"
        ),
        c(
          "reason_project4_2_1",
          "reason_project4_2_2"
        ),
        c(
          "reason_project4_3_1",
          "reason_project4_3_2"
        )
      )
    )
  ) %>%
    map_depth(2, ~ .x %>%
      transpose() %>%
      map(
        ~ .x %>%
          set_names("structure", "integration", "type")
      )) %>%
    map(transpose)
}
