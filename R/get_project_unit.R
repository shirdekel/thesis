##' @title Get project units

##' @return
##' @author Shir Dekel
##' @export
get_project_unit <- function() {
  project_unit <-
    list(
      list(
        c(
          " a day",
          " an hour",
          " a decade",
          " a year",
          " lines a day"
        ),
        c(
          "",
          " months",
          "",
          "%" %>%
            rep(2)
        ),
        c(
          "L a day",
          "%",
          " years",
          "",
          " million"
        )
      ),
      list(
        c(
          "L an hour",
          " an hour",
          " a week",
          " a year",
          " a year"
        ),
        c(
          " years",
          "%",
          " a day",
          "",
          " million"
        ),
        c(
          "%" %>%
            rep(3),
          " a month",
          ""
        )
      )
    ) %>%
    map(
      ~ .x %>%
        transpose() %>%
        map(unlist)
    )

  return(project_unit)
}
