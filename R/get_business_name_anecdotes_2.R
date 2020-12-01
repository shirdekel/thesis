##' @title Busines names anecdotes 2

##' @return
##' @author Shir Dekel
##' @export
get_business_name_anecdotes_2 <- function() {
  list(
    list(
      c(
        "Microxy",
        "microchip2"
      ),
      c(
        "Enfuel",
        "Refinera"
      )
    ),
    list(
      c(
        "project_3_1",
        "project_3_2"
      ),
      c(
        "project_4_1",
        "project_4_2"
      )
    )
  ) %>%
    map(~ .x %>%
      transpose() %>%
      map(unlist))
}
