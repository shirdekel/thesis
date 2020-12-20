##' @title Get integration reason
##'
##' Varies by valence
##'
##' vertical, horizontal

##' @return
##' @author Shir Dekel
##' @export
get_reason_integration <- function() {
  list(
    list(
      ## national newspaper
      list(
        c(
          str_c(
            "newspaper",
            "vertical negative",
            sep = " "
          ),
          str_c(
            "newspaper",
            "vertical positive",
            sep = " "
          )
        ),
        c(
          str_c(
            "newspaper",
            "horizontal negative",
            sep = " "
          ),
          str_c(
            "newspaper",
            "horizontal positive",
            sep = " "
          )
        )
      ),
      ## pharmaceutical
      list(
        c(
          str_c(
            "pharmaceutical",
            "vertical negative",
            sep = " "
          ),
          str_c(
            "pharmaceutical",
            "vertical positive",
            sep = " "
          )
        ),
        c(
          str_c(
            "pharmaceutical",
            "horizontal negative",
            sep = " "
          ),
          str_c(
            "pharmaceutical",
            "horizontal positive",
            sep = " "
          )
        )
      )
    ),
    list(
      ## railway
      list(
        c(
          str_c(
            "railway",
            "vertical negative",
            sep = " "
          ),
          str_c(
            "railway",
            "vertical positive",
            sep = " "
          )
        ),
        c(
          str_c(
            "railway",
            "horizontal negative",
            sep = " "
          ),
          str_c(
            "railway",
            "horizontal positive",
            sep = " "
          )
        )
      ),
      ## high-rise construction
      list(
        c(
          str_c(
            "construction",
            "vertical negative",
            sep = " "
          ),
          str_c(
            "construction",
            "vertical positive",
            sep = " "
          )
        ),
        c(
          str_c(
            "construction",
            "horizontal negative",
            sep = " "
          ),
          str_c(
            "construction",
            "horizontal positive",
            sep = " "
          )
        )
      )
    ),
    list(
      ## software
      list(
        c(
          str_c(
            "software",
            "vertical negative",
            sep = " "
          ),
          str_c(
            "software",
            "vertical positive",
            sep = " "
          )
        ),
        c(
          str_c(
            "software",
            "horizontal negative",
            sep = " "
          ),
          str_c(
            "software",
            "horizontal positive",
            sep = " "
          )
        )
      ),
      ## oil well
      list(
        c(
          str_c(
            "petrol supply miscalculations led to",
            "losses at the retail sites",
            sep = " "
          ),
          str_c(
            "there was less reliance on other (under-performing)",
            "suppliers that competitors had to use",
            sep = " "
          )
        ),
        c(
          str_c(
            "this drain on the collective resources",
            "led to losses at other well sites",
            sep = " "
          ),
          str_c(
            "these benefits were distributed",
            "across the other well sites",
            sep = " "
          )
        )
      )
    ),
    list(
      ## microchip
      list(
        c(
          str_c(
            "microchip",
            "vertical negative",
            sep = " "
          ),
          str_c(
            "microchip",
            "vertical positive",
            sep = " "
          )
        ),
        c(
          str_c(
            "microchip",
            "horizontal negative",
            sep = " "
          ),
          str_c(
            "microchip",
            "horizontal positive",
            sep = " "
          )
        )
      ),
      ## shipping logistics
      list(
        c(
          str_c(
            "logistics",
            "vertical negative",
            sep = " "
          ),
          str_c(
            "logistics",
            "vertical positive",
            sep = " "
          )
        ),
        c(
          str_c(
            "logistics",
            "horizontal negative",
            sep = " "
          ),
          str_c(
            "logistics",
            "horizontal positive",
            sep = " "
          )
        )
      )
    ),
    list(
      ## restaurant chain
      list(
        c(
          str_c(
            "restaurant",
            "vertical negative",
            sep = " "
          ),
          str_c(
            "restaurant",
            "vertical positive",
            sep = " "
          )
        ),
        c(
          str_c(
            "restaurant",
            "horizontal negative",
            sep = " "
          ),
          str_c(
            "restaurant",
            "horizontal positive",
            sep = " "
          )
        )
      ),
      ## record label
      list(
        c(
          str_c(
            "label",
            "vertical negative",
            sep = " "
          ),
          str_c(
            "label",
            "vertical positive",
            sep = " "
          )
        ),
        c(
          str_c(
            "label",
            "horizontal negative",
            sep = " "
          ),
          str_c(
            "label",
            "horizontal positive",
            sep = " "
          )
        )
      )
    )
  ) %>%
    map_depth(2, ~ .x %>%
      transpose() %>%
      simplify_all()) %>%
    map(transpose) %>%
    transpose() %>%
    map_depth(2, ~ .x %>%
      map_at(2, rev)) %>%
    set_names("negative", "positive")
}
