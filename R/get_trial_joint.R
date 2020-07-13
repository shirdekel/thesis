##' @title Get joint trial
##' @param preamble
##' @param questions_joint
##' @return
##' @author Shir Dekel
##' @export
get_trial_joint <- function(preamble, questions_joint) {

  trial_joint <- trial_survey_multi_choice(
    preamble = preamble,
    questions = questions_joint
  ) %>%
    build_timeline() %>%
    set_parameters(randomize_order = TRUE)

}
