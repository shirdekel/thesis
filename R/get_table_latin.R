##' @title Get latin table

##' @return
##' @author Shir Dekel
##' @export
get_table_latin <- function(data, latin, name, npv_raw) {
  table_latin <-
    list(
      latin,
      npv_raw
    ) %>%
    pmap(
      ~ data %>%
        mutate(
          "{{name}}" := .x,
          npv_raw = .y
          ) %>%
        arrange(business_name)
    )

  return(table_latin)
}
