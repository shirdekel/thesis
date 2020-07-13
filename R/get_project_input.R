##' @title Get project inputs
##'
##' To name questions
##'
##' @param project_type
##' @param gambles
##' @param outcome_dif
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_input <- function(project_type,
                              gambles,
                              outcome_dif) {

  project_input <- str_replace_all(project_type, " ", "-") %>%
    str_c(gambles$outcome_positive_restricted_sample,
          outcome_dif,
          gambles$prob_positive_restricted_sample,
          sep = "_"
    )

  return(project_input)

}
