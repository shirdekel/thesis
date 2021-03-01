##' @title Recode masters experiment project numbers according to order variable

##' @param project
##'
##' @param order
##'
##' @return
##' @author Shir Dekel
##' @export
recode_project_masters <- function(project, order) {

  case_when(
    order == 2 & project == 1 ~ 5,
    order == 2 & project == 2 ~ 4,
    order == 2 & project == 4 ~ 2,
    order == 2 & project == 5 ~ 1,
    order == 1 | project == 3  ~ project
  )

}
