##' @title Generate regex to match product names
##'
##' We need product data for each project for later analysis, because there was an error in the way the materials were entered into Qualtrics
##' This isn't otherwise available for each product, so we need to scrape the product names that exist for each block, and assign them the vector 1:5.

##' @return
##' @author Shir Dekel
##' @export
get_product_regex <- function() {

  product <-
    c(
      "shampoo",
      "laundry",
      "bike",
      "laptop",
      "backpack",
      "earphones",
      "watch",
      "treadmill",
      "couch",
      "perfume",
      "boots",
      "smartphone"
    )

  product_regex <-
    rx() %>%
    # Match any of the products
    rx_either_of(product) %>%
    # Match any case (in the table products are title case)
    rx_with_any_case() %>%
    as.character()

  return(product_regex)

}
