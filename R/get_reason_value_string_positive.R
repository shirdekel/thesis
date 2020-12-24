##' @title Reasons for string value - positive valence

##' @return
##' @author Shir Dekel
##' @export
get_reason_value_string_positive <- function() {
  list(
    list(
      # newspaper
      c(
        ## advertising
        "incurred a surge of casual visitors",
        ## subscription
        "gained higher revenue consistency"
      ) %>%
        str_c(
          "paper",
          .,
          "due to the reliance on",
          sep = " "
        ),
      # pharmaceutical
      c(
        ## over-the-counter
        "was quick to be approved for sale",
        ## prescription
        "was able to retain large profit margins"
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
        "did not have much competition from other modes of transport",
        ## intercity
        "had minimal obstacles during construction in largely empty terrain"
      ) %>%
        str_c(
          "railway",
          .,
          "due to it operating",
          sep = " "
        ),
      # high-rise
      c(
        ## mixed office-retail
        "low maintenance costs and longer leases",
        ## apartment
        "loose zoning regulations"
      ) %>%
        str_c(
          "building had relatively",
          .,
          "due to it being",
          sep = " "
        )
    ),
    list(
      # software
      c(
        ## enterprise
        "relatively clear from user feedback so were quick to solve",
        ## consumer
        "quick to solve because of the availability of quantitative data"
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
        "not very susceptible to crude oil price changes",
        ## onshore
        "relatively easy to construct"
      ) %>%
        str_c(
          "well was",
          .,
          "due to it being",
          sep = " "
        )
    ),
    list(
      # microchip
      c(
        ## Reduced Instruction Set Computing
        "has a relatively low power consumption",
        ## Complex Instruction Set Computing
        "optimised for most current software"
      ) %>%
        str_c(

          "chip",
          .,
          "due to it operating",
          sep = " "
        ),
      # shipping logistics
      c(
        ## parcel
        "experienced a relatively low amount of unexpected delays",
        ## freight
        "offered higher profit margins"
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
        "to source only relatively cheap ingredients",
        ## casual sit-down
        "many offerings for the recent health trend"
      ) %>%
        str_c(
          "restaurant had",
          .,
          "due to it operating",
          sep = " "
        ),
      # record
      c(
        ## rock
        "the artists had a relatively low amount of bargaining power",
        ## pop
        "the record was very popular with the younger demographic"
      ) %>%
        str_c(
          .,
          "due to the genre being",
          sep = " "
        )
    )
  )
}
