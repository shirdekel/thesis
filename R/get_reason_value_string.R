##' @title Reason for string value

##' @return
##' @author Shir Dekel
##' @export
get_reason_value_string <- function() {

  low_alignment <-
      list(
          list(
              c("advertising_reason", "subscription_reason"),
              c("over-the-counter_reason", "prescription_reason")
          ),
          list(
              c("intracity_reason", "intercity_reason"),
              c("commercial_reason", "residential_reason")
          ),
          list(
              c("enterprise_reason", "consumer_reason"),
              c("offshore_reason", "onshore_reason")
          ),
          list(
              c("digital_reason", "analogue_reason"),
              c("parcel_reason", "freight_reason")
          ),
          list(
              c("fast food_reason", "casual sit-down dining_reason"),
              c("rock_reason", "pop_reason")
          )
      )

  high_alignment <-
      low_alignment %>%
      map_depth(
          2,
          ~ .x %>%
              .[[1]] %>%
              rep(2)
      )

  list(
      high_alignment,
      low_alignment
  ) %>%
    rep(each = 2) %>%
    c(NA)

}
