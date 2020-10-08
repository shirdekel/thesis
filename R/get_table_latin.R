##' @title Get latin table

##' @return
##' @author Shir Dekel
##' @export
get_table_latin <- function(data, latin, name) {
  table_latin <-
    latin %>%
    map(
      ~ data %>%
        mutate("{{name}}" := .x)
    ) %>%
    list()

  return(table_latin)
}
