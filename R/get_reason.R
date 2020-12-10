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
    ),
    list(
      list(
        c(
          "reason_project5_1_1",
          "reason_project5_1_2"
        ),
        c(
          "reason_project5_2_1",
          "reason_project5_2_2"
        ),
        c(
          "reason_project5_3_1",
          "reason_project5_3_2"
        )
      ),
      list(
        c(
          "reason_project6_1_1",
          "reason_project6_1_2"
        ),
        c(
          "reason_project6_2_1",
          "reason_project6_2_2"
        ),
        c(
          "reason_project6_3_1",
          "reason_project6_3_2"
        )
      )
    ),
    list(
      list(
        c(
          "reason_project7_1_1",
          "reason_project7_1_2"
        ),
        c(
          "reason_project7_2_1",
          "reason_project7_2_2"
        ),
        c(
          "reason_project7_3_1",
          "reason_project7_3_2"
        )
      ),
      list(
        c(
          "reason_project8_1_1",
          "reason_project8_1_2"
        ),
        c(
          "reason_project8_2_1",
          "reason_project8_2_2"
        ),
        c(
          "reason_project8_3_1",
          "reason_project8_3_2"
        )
      )
    ),
    list(
      list(
        c(
          "reason_project9_1_1",
          "reason_project9_1_2"
        ),
        c(
          "reason_project9_2_1",
          "reason_project9_2_2"
        ),
        c(
          "reason_project9_3_1",
          "reason_project9_3_2"
        )
      ),
      list(
        c(
          "reason_project10_1_1",
          "reason_project10_1_2"
        ),
        c(
          "reason_project10_2_1",
          "reason_project10_2_2"
        ),
        c(
          "reason_project10_3_1",
          "reason_project10_3_2"
        )
      )
    )
  ) %>%
    map_depth(2, ~ .x %>%
      transpose() %>%
      map(
        ~ .x %>%
          set_names("structure", "integration", "type")
      ))
}
