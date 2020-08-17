##' @title Get long project inputs
##'
##' To name questions
##'
##' @param gambles
##' @param project_long_detail_components_input
##' @param type
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_input_long <- function(type,
                                   project_long_detail_components_input,
                                   gambles) {

  project_input_long <-
    type %>%
    str_replace_all(" ", "-") %>%
    str_c(project_long_detail_components_input,
          gambles$outcome_positive_restricted_sample,
          gambles$outcome_dif,
          gambles$prob_positive_restricted_sample,
          sep = "_"
    )

  return(project_input_long)

}
