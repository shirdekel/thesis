##' @title Pivot Masters data

##' @param masters_renamed
##'
##' @return
##' @author Shir Dekel
##' @export
pivot_masters <- function(masters_renamed) {

  names_to <-
    c(
      "alignment",
      "reliability_amount",
      "order",
      "dv",
      "phase",
      "product",
      "project")

  masters_pivoted <-
    masters_renamed %>%
    pivot_longer(
      matches("ranking|allocation|confidence"),
      names_to = names_to,
      values_drop_na = TRUE,
      names_pattern = "(\\w+)_a(\\w+)_v\\d_o(\\d)_(\\w+)_(\\w+)_(\\w+)_(\\d)") %>%
    clean_names() %>%
    pivot_wider(
      names_from = dv,
      values_from = value
    ) %>%
    pivot_longer(
      contains("rating"),
      names_to = c("rating", "dv"),
      names_pattern = "rating_t(\\d)_(.*)"
    ) %>%
    pivot_wider(
      names_from = dv,
      values_from = value
    )

  return(masters_pivoted)

}
