##' @title Project type

##' @return
##' @author Shir Dekel
##' @export
get_project_type_anecdotes_2 <- function() {
  list(
    c("microchip", "oil well"),
    c("type3", "type4")
  ) %>%
    map(~ .x %>%
          list() %>%
          rep(2))##  %>%
    ## latin_list()
}
