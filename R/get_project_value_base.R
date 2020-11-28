##' @title Project base value for anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_project_value_base <- function() {
  list(
    c(
      4000,
      60,
      75
    ) %>%
   set_names(str_c("name", 1:3)),
    c(
      2000,
      7,
      80
    ) %>%
      set_names("rate", "maintenance", "prob")
  )
}
