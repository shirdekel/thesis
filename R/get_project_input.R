##' @title Get project inputs
##'
##' To name questions
##'
##' @param project_type
##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_input <- function(project_type,
                              gambles) {

  project_input <- str_replace_all(project_type, " ", "-") %>%
    str_c(gambles$outcome_positive_restricted_sample,
          gambles$outcome_dif,
          gambles$prob_positive_restricted_sample,
          sep = "_"
    )

  return(project_input)

}
