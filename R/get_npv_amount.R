##' @title Get NPV amount

##' @param project
##'
##' @return
##' @author Shir Dekel
##' @export
get_npv_amount <- function(project) {

  case_when(
    project == 1 ~ 700,
    project == 2 ~ 500,
    project == 3 ~ 100,
    project == 4 ~ 900,
    project == 5 ~ 300
  )

}
