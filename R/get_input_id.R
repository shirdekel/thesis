##' @title Get anecdotes 2 input ID

##' @return
##' @author Shir Dekel
##' @export
##' @param feature
##' @param value
##' @param anecdote_within
##' @param alignment
##' @param valence
##' @param business_name
##' @param type
##' @param npv
##' @param reliability
##' @param project_type
get_input_id <- function(feature, value, anecdote_within, alignment, valence,
                         business_name, type, npv, reliability, project_type) {
  str_c(
    feature %>%
      str_replace_all(" ", "-"),
    value,
    sep = "_",
    collapse = "_"
  ) %>%
    str_c(
      anecdote_within,
      alignment,
      valence,
      business_name %>%
        str_replace_all(" ", "-"),
      type %>%
        str_replace_all(" ", "-"),
      npv,
      reliability,
      .,
      project_type,
      sep = "_"
    ) %>%
    get_survey_number(
      "Allocation: ",
      .,
      class = "allocation"
    ) %>%
    as.character()
}
