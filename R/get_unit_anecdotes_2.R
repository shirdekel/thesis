##' @title Get units

##' @return
##' @author Shir Dekel
##' @export
get_unit_anecdotes_2 <- function() {
  list(
    list(
      ## national newspaper
      c(
        " a day",
        "",
        "L a day"
      ),
      ## pharmaceutical
      c(
        " an hour",
        " months",
        "%"
      )
    ),
    list(
      ## railway
      c(
        " a decade",
        "",
        " years"
      ),
      ## high-rise construction
      c(
        " a year",
        "%",
        ""
      )
    ),
    list(
      ## software
      c(
        " lines a day",
        "%",
        " million"
      ),
      ## oil well
      c(
        "L an hour",
        " years",
        "%"
      )
    ),
    list(
      ## microchip
      c(
        " an hour",
        "%",
        "%"
      ),
      ## shipping logistics
      c(
        " a week",
        " a day",
        "%"
      )
    ),
    list(
      ## restaurant chain
      c(
        " a year",
        "",
        " a month"
      ),
      ## record label
      c(
        " a year",
        " million",
        ""
      )
    )
  ) %>%
    map_depth(
      2,
      ~ c(.x, "")
    )
}
