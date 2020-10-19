##' @title Get high project values

##' @return
##' @author Shir Dekel
##' @export
get_project_value_high <- function() {
  project_value_high <-
    list(
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
          3
        )
      ),
      list(
        c(
          2000,
          4000,
          800,
          9,
          8
        ),
        c(
          7,
          60,
          400,
          100,
          2
        ),
        c(
          90,
          80,
          94,
          40,
          13
        )
      )
    ) %>%
    map(
      ~ .x %>%
        transpose() %>%
        map(unlist)
    )

  return(project_value_high)
}
