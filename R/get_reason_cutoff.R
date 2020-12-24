##' @title Reason for cutoff 1

##' @return
##' @author Shir Dekel
##' @export
get_reason_cutoff <- function() {

  list(
      list(
          ## national newspaper
          c(
            "newspapers needed to be printed at a rate of",
            "number of weekly advertisers needed to be",
            "amount of undiscarded ink needed to be"
          ),
          ## pharmaceutical
          c(
            "pills needed to be pressed at a rate of",
            "shelf life needed to be",
            "probability of symptom reduction after a week needed to be"
          )
      ),
      list(
          ## railway
          c(
            "railway lines needed to be built at a rate of",
            "number of paying customers at peak hour needed to be",
            "carriages needed to be estimated to last in good shape"
          ),
          ## high-rise construction
          c(
            "high-rises needed to be built at a rate of",
            "probability of on-time completion needed to be",
            "number of tenant EOIs needed to be"
          )
      ),
      list(
          ## software
          c(
            "developers needed to write",
            "the application needed to be certified with a security rating of",
            "number of potential first-year customers needed to be"
          ),
          ## oil well
          c(
            "oil was needed to be extracted at a rate of",
            "machinery needed to function without maintenance for",
            "probability of finding oil needed to be"
          )
      ),
      list(
          ## microchip
          c(
            "microchips needed to be produced at a rate of",
            "semiconductor yield needed to be",
            "percent of compatible devices needed to be"
          ),
          ## shipping logistics
          c(
            "packages needed to be shipped at a rate of",
            "number of orders not in a bottleneck needed to be",
            "average accuracy of shipments needed to be"
          )
      ),
      list(
          ## restaurant chain
          c(
            "restaurants needed to be established at a rate of",
            "number of Saturday night reservations needed to be",
            "number of positive reviews the restaurant needed to have been estimated to get"
          ),
          ## record label
          c(
            "rate of records produced needed to be",
            "national radio listenership needed to be",
            "network connections that management needed to have established"
          )
      )
  )

}
