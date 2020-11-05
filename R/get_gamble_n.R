##' @title Get gamble_n

##' @return
##' @author Shir Dekel
##' @export
##' @param thesis_project
##' @param experiment_number
get_gamble_n <- function(thesis_project, experiment_number) {
  case_when(
    thesis_project == "aggregation" & experiment_number %in% c(2, 3) ~ 10,
    thesis_project == "aggregation" & experiment_number == 4 ~ 20
  )
}
