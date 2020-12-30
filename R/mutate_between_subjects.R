##' @title Mutate between subjects components
##'
##' Add elements that vary in within-subjects conditions and are identical
##' across between subjects. This is done so that they can be subsequently
##' unnested along with ,the within-subjects condition labels.

##' @return
##' @author Shir Dekel
##' @export
##' @param varation_mutated
mutate_between_subjects <- function(varation_mutated) {
  between_subjects_mutated <-
    varation_mutated %>%
    mutate(
      multiplier_cutoff = get_multiplier_cutoff() %>%
        list(),
      multiplier_anecdote = get_multiplier_anecdote() %>%
        list(),
      success = get_success() %>%
        list(),
      reason_structure = get_reason_structure() %>%
        list(),
      reason_integration = get_reason_integration() %>%
        list(),
      reason_value_string = get_reason_value_string() %>%
        list()
    )
  between_subjects_mutated
}
