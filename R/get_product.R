##' @title Get product variable
##'
##' We need product data for each project for later analysis, because there was an error in the way the materials were entered into Qualtrics
##' This isn't otherwise available for each product, so we need to scrape the product names that exist for each block, and assign them the vector 1:5.
##'
##' Uses `product_regex` from `get_product_regex()`

##' @param content
##'
##' @param product_regex
##'
##' @return
##' @author Shir Dekel
##' @export
get_product <- function(content, product_regex) {

  list(
    content %>%
      str_extract_all(product_regex) %>%
      # Extract from list of 1
      .[[1]] %>%
      str_to_lower()
  )

}
