get_business_name <- function() {
  # names generated from namelix.com

  business_name <-
    list(
      str_c("Pressbloom", 1:5),
      str_c("Pharmacore", 1:5),
      str_c("Railmont", 1:5),
      str_c("Erectic", 1:5),
      c(
        "Cweb",
        "Codeck",
        "Digics",
        "Techip",
        "Zenix"
      )
    )

  return(business_name)
}
