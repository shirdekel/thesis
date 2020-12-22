##' @title Reason for cutoff 1

##' @return
##' @author Shir Dekel
##' @export
get_reason_cutoff <- function() {

  list(
      list(
          ## national newspaper
          c(
            "reason_newspaper_1",
            "reason_newspaper_2",
            "reason_newspaper_3"
          ),
          ## pharmaceutical
          c(
            "reason_pharmaceutical_1",
            "reason_pharmaceutical_2",
            "reason_pharmaceutical_3"
          )
      ),
      list(
          ## railway
          c(
            "reason_railway_1",
            "reason_railway_2",
            "reason_railway_3"
          ),
          ## high-rise construction
          c(
            "reason_high-rise_1",
            "reason_high-rise_2",
            "reason_high-rise_3"
          )
      ),
      list(
          ## software
          c(
            "reason_software_1",
            "reason_software_2",
            "reason_software_3"
          ),
          ## oil well
          c(
            "reason_oil_1",
            "reason_oil_2",
            "reason_oil_3"
          )
      ),
      list(
          ## microchip
          c(
            "reason_microchip_1",
            "reason_microchip_2",
            "reason_microchip_3"
          ),
          ## shipping logistics
          c(
            "reason_shipping_1",
            "reason_shipping_2",
            "reason_shipping_3"
          )
      ),
      list(
          ## restaurant chain
          c(
            "reason_restaurant_1",
            "reason_restaurant_2",
            "reason_restaurant_3"
          ),
          ## record label
          c(
            "reason_record-label_1",
            "reason_record-label_2",
            "reason_record-label_3"
          )
      )
  )

}
