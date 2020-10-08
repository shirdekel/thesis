##' @title Latin square shuffle of dataframe rows

##' @return
##' @author Shir Dekel
##' @export
latin_rows <- function(df) {
  df %>%
    nrow() %>%
    seq_len() %>%
    latin_list() %>%
    map(
      ~ df %>%
        mutate(order = .x) %>%
        arrange(order) %>%
        select(-order)
    )
}
