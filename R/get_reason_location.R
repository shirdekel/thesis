##' @title Get location reason
##'
##' Varies by valence

##' @return
##' @author Shir Dekel
##' @export
get_reason_location <- function() {
  list(
    list(
      ## national newspaper
      c("against", "towards") %>%
        str_c(
          "of shifting demographic interest", ., "newspapers",
          sep = " "
        ),
      ## pharmaceutical
      c(
        "pharma_negative",
        "pharma_positive"
      )
    ),
    list(
      ## railway
      c(
        "railway_negative",
        "railway_positive"
      ),
      ## high-rise construction
      c(
        "high-rise_negative",
        "high-rise_positive"
      )
    ),
    list(
      ## software
      c(
        "software_negative",
        "software_positive"
      ),
      ## oil well
      c(
        "of what scientists now know is a hydrocarbon shortage",
        "of what scientists now know is a hydrocarbon surplus"
      )
    ),
    list(
      ## microchip
      c(
        "microchip_negative",
        "microchip_positive"
      ),
      ## shipping logistics
      c(
        "shipping_negative",
        "shipping_positive"
      )
    ),
    list(
      ## restaurant chain
      c(
        "restaurant_negative",
        "restaurant_positive"
      ),
      ## record label
      c(
        "record_negative",
        "record_positive"
      )
    )
  ) %>%
    map(transpose) %>%
    transpose() %>%
    set_names("negative", "positive")
}
