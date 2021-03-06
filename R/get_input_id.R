##' @title Get anecdotes 2 input ID

##' @return
##' @author Shir Dekel
##' @export
##' @param feature
##' @param value
##' @param anecdote_within
##' @param similarity
##' @param valence
##' @param business_name
##' @param type
##' @param npv
##' @param reliability
##' @param project_type
get_input_id <- function(feature, value, anecdote_within, similarity, valence,
                         business_name, type, npv, reliability, project_type) {
  str_c(
    feature %>%
      str_replace_all(" ", "-"),
    value %>%
      str_replace_all(" ", "-"),
    sep = "_",
    collapse = "_"
  ) %>%
    str_c(
      # So that later parsing can use _ as a delimiter
      anecdote_within %>%
        str_replace_all("_", "-"),
      similarity,
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
