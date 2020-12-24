##' @title Reasons for string value - negative valence

##' @return
##' @author Shir Dekel
##' @export
get_reason_value_string_negative <- function() {
  list(
    list(
      # newspaper
      c(
        ## advertising
        "costs for marketing",
        ## subscription
        "losses of casual readers"
      ) %>%
        str_c(
          "paper incurred heavy",
          .,
          "due to the reliance on",
          sep = " "
        ),
      # pharmaceutical
      c(
        ## over-the-counter
        "did not have such high profit margins",
        ## prescription
        "took a long time to be approved for sale"
      ) %>%
        str_c(
          "drug",
          .,
          "due to it being",
          sep = " "
        )
    ),
    list(
      # railway
      c(
        ## intracity
        "difficult to construct among other city activity",
        ## intercity
        "struggled to compete against the available air travel options"
      ) %>%
        str_c(
          "railway was",
          .,
          "due to it operating",
          sep = " "
        ),
      # high-rise
      c(
        ## mixed office-retail
        "stricter zoning regulations",
        ## apartment
        "higher maintenance costs and shorter leases"
      ) %>%
        str_c(
          "building had",
          .,
          "due to it being",
          sep = " "
        )
    ),
    list(
      # software
      c(
        ## enterprise
        "slow to solve because of the lack of large-scale quantitative data",
        ## consumer
        "unclear from user feedback so took time to solve"
      ) %>%
        str_c(
          "problems in the application were",
          .,
          "due to it being for",
          sep = " "
        ),
      # oil well
      c(
        ## offshore
        "difficult to construct",
        ## onshore
        "susceptible to crude oil price changes"
      ) %>%
        str_c(
          "well was quite",
          .,
          "due to it being",
          sep = " "
        )
    ),
    list(
      # microchip
      c(
        ## Reduced Instruction Set Computing
        "less current software support",
        ## Complex Instruction Set Computing
        "a higher power consumption"
      ) %>%
        str_c(
          "chip has",
          .,
          "due to it operating",
          sep = " "
        ),
      # shipping logistics
      c(
        ## parcel
        "offers lower profit margins",
        ## freight
        "is more likely to experience unexpected delays"
      ) %>%
        str_c(
          "shipping type",
          .,
          "due to it being",
          sep = " "
        )
    ),
    list(
      # restaurant
      c(
        ## fast food
        "did not have many offerings for the recent health trend",
        ## casual sit-down
        "had to source a relatively large amount of fresh ingredients"
      ) %>%
        str_c(
          "restaurant",
          .,
          "due to it operating",
          sep = " "
        ),
      # record
      c(
        ## rock
        "the record was less popular with the younger demographic",
        ## pop
        "the artists had more bargaining power"
      ) %>%
        str_c(
          .,
          "due to the genre being",
          sep = " "
        )
    )
  )
}
