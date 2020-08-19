##' @title Get long project descriptions
##'
##' @param gambles
##' @param project_long_components
##' @param project_long_detail
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_description_long <- function(gambles, project_long_components, project_long_detail) {

  outcome_negative <-
    gambles$outcome_dif - gambles$outcome_positive_restricted_sample
  prob_positive <-
    gambles$prob_positive_restricted_sample * 100
  prob_negative <-
    100 - prob_positive

  project_description_long <-
    str_c(
      project_long_components$name,
      " is a business in your company that proposes to construct ",
      project_long_components$type %>%
        map_chr(getindefinite),
      " ",
      project_long_components$type,
      " project. That is, they want to ",
      project_long_detail,
      ". Their research team has been investigating ",
      project_long_components$investigation,
      ". Due to ",
      project_long_components$cost_explanation,
      ", they forecast the entire project to cost $",
      outcome_negative,
      " million. The company would make $",
      gambles$outcome_dif,
      " million if the forecasted ",
      project_long_components$forecast_details,
      ". ",
      project_long_components$analysis_details,
      " suggest that there is a ",
      prob_positive,
      "% chance of these forecasts being accurate. Therefore, there is ",
      prob_positive,
      "% chance of gaining $",
      gambles$outcome_positive_restricted_sample,
      " million and a ",
      prob_negative,
      "% chance of losing $",
      outcome_negative,
      " million on the investment."
    )

  return(project_description_long)


}
