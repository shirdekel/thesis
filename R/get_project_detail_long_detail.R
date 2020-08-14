##' @title Get detail line
##' @return
##' @author Shir Dekel
##' @export
get_project_detail_long_detail <- function() {

  well_type <-
    c(
      "onshore",
      "offshore"
    ) %>%
    rep(5)

  oil_location <-
    c(
      "Houston, US",
      "Kuala Lumpur, Malaysia",
      "Daqing, China",
      "Abu Dhabi, UAE",
      "Dhahran, Saudi Arabia",
      "Basra, Iraq",
      "Stavanger, Norway",
      "Calgary, Canada",
      "Omsk, Siberia",
      "Aberdeen, UK"
    )

  oil <-
    str_c(
      "establish an exploration site at an",
      well_type,
      " location in",
      oil_location,
      " in order to see if the hydrocarbon supply is sufficient to establish a more permanent well",
      sep = " "
    )

  microchip_market <-
    c(
      "personal computer",
      "smartphone",
      "microwave",
      "car controls",
      "DSLR camera",
      "gaming console",
      "military communication",
      "aerospace",
      "medical imaging machine",
      "GPS tracking device"
    )

  microchip <-
    str_c(
      "develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current",
      microchip_market,
      "market",
      sep = " "
    )

  music_market <-
    c(
      "hip hop",
      "classical",
      "R&B",
      "soul",
      "indie rock",
      "heavy metal",
      "pop",
      "folk",
      "electronic",
      "latin"
    )

  record_deal <-
    str_c(
      "sign a new recording artist for their",
      music_market,
      "music market",
      sep = " "
    )

  export_market <-
    c(
      "motorbike",
      "wheat",
      "kitchenware",
      "liquor",
      "power tools",
      "wrist watch",
      "artwork",
      "steel",
      "flat-screen TV",
      "wool"
    )

  shipping_logistics <-
    str_c(
      "develop a new shipping route for a",
      export_market,
      "export market.",
      sep = " "
    )

  restaurant_type <-
    c(
      "italian",
      "burger",
      "mexican",
      "thai",
      "chinese",
      "barbeque",
      "sushi",
      "greek",
      "seafood",
      "buffet"
    )

  restaurant_chain <-
    str_c(
      "develop a new franchise of",
      restaurant_type,
      "restaurants",
      sep = " "
    )

  newspaper_topic <-
    c(
      "electronics",
      "politics",
      "fashion",
      "Christian topics",
      "business",
      "science",
      "sport",
      "celebrity gossip",
      "current affairs",
      "foreign affairs"
    )

  national_newspaper <-
    str_c(
      "develop a new nationally-distributed newspaper about",
      newspaper_topic,
      sep = " "
    )

  disease <-
    c(
      "leukaemia",
      "anaemia",
      "Sickle-cell disease",
      "Hunter syndrome",
      "immune dysregulation",
      "hypertension",
      "pneumonia",
      "angina",
      "Chronic lower respiratory disease",
      "Chronic kidney disease"
    )

  pharmaceutical <-
    str_c(
      "develop a new pharmaceutical drug to help treat",
      disease,
      sep = " "
    )

  railway_location <-
    c(
      "Guangdong, China",
      "Uttar Pradesh, India",
      "California, USA",
      "West Java, Indonesia",
      "Punjab, Pakistan",
      "Minas Gerais, Brazil",
      "Kano State, Nigera",
      "Dhaka Division, Bangladesh",
      "Krasnodar Krai, Russia",
      "Oaxaca, Mexico"
    )

  railway <-
    str_c(
      "develop a new railway line in",
      railway_location,
      sep = " "
    )

  gmo_product <-
    c(
      "potato crop enriched with Vitamin A",
      "tomato crop that induces a Hepatitis B immune response",
      "trout with increased growth rate",
      "corn crop with faster maturation",
      "animal feed with enzymes to enhance digestion",
      "herbicide tolerant melon",
      "insect resistant mango",
      "virus resistant orange",
      "sunflower oil with healthier fatty acid composition",
      "bacteria for clean fuel development"
    )

  gmo <-
    str_c(
      "develop a new genetically modified",
      gmo_product,
      sep = " "
    )

  storeys <-
    seq(from = 10,
        to = 55,
        by = 5)

  structural_system <-
    c(
      "coupled wall",
      "flat plate and flat slab",
      "rigid frame",
      "infilled frame",
      "braced frame",
      "shear wall",
      "wall-frame",
      "core and outrigger",
      "hybrid",
      "tube"
    )

  high_rise_construction <-
    str_c(
      "develop a new",
      str_c(
        storeys,
        "-storey high-rise with a"
      ),
      structural_system,
      "structural system",
      sep = " "
    )

  project_detail_long_detail <-
    list(
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

  return(project_detail_long_detail)

}
