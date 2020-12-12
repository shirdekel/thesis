##' @title Anecdotes 2 location

##' @return
##' @author Shir Dekel
##' @export
get_location_anecdotes_2 <- function() {
  list(
    list(
      ## national newspaper
      list(
        c(
          "Wellington, New Zealand",
          "Mexico City, Mexico"
        ),
        "Sydney, Australia"
      ),
      ## pharmaceutical
      list(
        c(
          "Moscow, Russia",
          "Jakarta, Indonesia"
        ),
        "St Petersburg, Russia"
      )
    ),
    list(
      ## railway
      list(
        c(
          "Daqing, China",
          "Belo Horizonte, Brazil"
        ),
        "Guangzhou, China"
      ),
      ## high-rise construction
      list(
        c(
          "Manchester, UK",
          "Dhahran, Saudi Arabia"
        ),
        "London, UK"
      )
    ),
    list(
      ## software
      list(
        c(
          "California, USA",
          "Mumbai, India"
        ),
        "Austin, USA"
      ),
      ## oil well
      list(
        c(
          "New Mexico, USA",
          "Omsk, Siberia"
        ),
        "Houston, USA"
      )
    ),
    list(
      ## microchip
      list(
        c(
          "Montreal, Canada",
          "Abu Dhabi, UAE"
        ),
        "Toronto, Canada"
      ),
      ## shipping logistics
      list(
        c(
          "Seberang Perai, Malaysia",
          "Basra, Iraq"
        ),
        "Kuala Lumpur, Malaysia"
      )
    ),
    list(
      ## restaurant chain
      list(
        c(
          "Milan, Italy",
          "Lagos, Nigera"
        ),
        "Rome, Italy"
      ),
      ## record label
      list(
        c(
          "Gothenburg, Sweden",
          "Cape Town, South Africa"
        ),
        "Stokholm, Sweden"
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
    ) %>%
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
