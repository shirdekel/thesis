##' @title Mutate column order latin shuffle

##' @return
##' @author Shir Dekel
##' @export
mutate_column_order_latin <- function(projects_business_name_latin) {
  projects_column_order_latin <-
    projects_business_name_latin %>%
    rowwise() %>%
    mutate(
      column_order_latin_table = business_name_latin_table %>%
        latin_rows() %>%
        list(),
      column_order_variation = seq_len(5) %>%
        as.numeric() %>%
        list()
    ) %>%
    unnest(c(column_order_latin_table, column_order_variation))

  return(projects_column_order_latin)
}
