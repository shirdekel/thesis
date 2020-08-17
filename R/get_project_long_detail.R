##' @title Get detail line
##' @param project_long_detail_components
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_long_detail <- function(project_long_detail_components) {

  oil <-
    str_c(
      "establish an exploration site at an",
      project_long_detail_components$oil$well_type,
      "location in",
      project_long_detail_components$oil$location,
      "in order to see if the hydrocarbon supply is sufficient to establish a more permanent well",
      sep = " "
    )

  microchip <-
    str_c(
      "develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current",
      project_long_detail_components$microchip,
      "market",
      sep = " "
    )

  record_deal <-
    str_c(
      "sign a new recording artist for their",
      project_long_detail_components$record_deal,
      "music market",
      sep = " "
    )

  shipping_logistics <-
    str_c(
      "develop a new shipping route for a",
      project_long_detail_components$shipping_logistics,
      "export market.",
      sep = " "
    )

  restaurant_chain <-
    str_c(
      "develop a new franchise of",
      project_long_detail_components$restaurant_chain,
      "restaurants",
      sep = " "
    )

  national_newspaper <-
    str_c(
      "develop a new nationally-distributed newspaper about",
      project_long_detail_components$national_newspaper,
      sep = " "
    )

  pharmaceutical <-
    str_c(
      "develop a new pharmaceutical drug to help treat",
      project_long_detail_components$pharmaceutical,
      sep = " "
    )

  railway <-
    str_c(
      "develop a new railway line in",
      project_long_detail_components$railway,
      sep = " "
    )

  gmo <-
    str_c(
      "develop a new genetically modified",
      project_long_detail_components$gmo,
      sep = " "
    )

  high_rise_construction <-
    str_c(
      "develop a new",
      str_c(
        project_long_detail_components$high_rise_construction$storeys,
        "-storey high-rise with a"
      ),
      project_long_detail_components$high_rise_construction$structural_system,
      "structural system",
      sep = " "
    )

  project_long_detail <-
    lst(
      oil,
      microchip,
      record_deal,
      shipping_logistics,
      restaurant_chain,
      national_newspaper,
      pharmaceutical,
      railway,
      gmo,
      high_rise_construction
    )

  return(project_long_detail)

}
