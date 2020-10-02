##' @title Get high project values

##' @return
##' @author Shir Dekel
##' @export
get_project_value_high <- function() {
  project_value_high <-
    list(
      c(
        50000,
        300000,
        5,
        8,
        1000
      ),
      c(
        80,
        20,
        2000,
        70,
        60
      ),
      c(
        5000,
        90,
        12,
        100,
        1
      )
    ) %>%
    transpose() %>%
    map(
      ~ .x %>%
        unlist() %>%
        # Prevent scientific notation
        as.integer()
    )

  return(project_value_high)
}
