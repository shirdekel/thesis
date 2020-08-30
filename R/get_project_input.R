##' @title Get long project inputs
##'
##' To name questions
##'
##' @param gambles
##' @param type
##' @param detail
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_input <- function(type,
                              detail = NULL,
                              gambles) {

  project_input <-
    type %>%
    str_replace_all(" ", "-") %>%
    str_c(detail,
          gambles$outcome_positive_restricted_sample,
          gambles$outcome_dif,
          gambles$prob_positive_restricted_sample,
          sep = "_"
    )

  return(project_input)

}
