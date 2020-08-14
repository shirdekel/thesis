##' @title Get long project descriptions
##'
##' @param gambles
##' @param project_detail_long
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_description_long <- function(gambles, project_detail_long) {

  outcome_negative <-
    gambles$outcome_dif - gambles$outcome_positive_restricted_sample
  prob_positive <-
    gambles$prob_positive_restricted_sample * 100
  prob_negative <-
    100 - prob_positive

  bold <-
    str_c(
      "there is ",
      prob_positive,
      "% chance of gaining $",
      gambles$outcome_positive_restricted_sample,
      " million and a ",
      prob_negative,
      "% chance of losing $",
      outcome_negative,
      " million on the investment.") %>%
    map_chr(~tags$strong(.x) %>%
              as.character()
    )

  project_description_long <-
    str_c(
      project_detail_long$name,
      " is a business in your company that proposes to construct ",
      project_detail_long$type %>%
        map_chr(getindefinite),
      " ",
      project_detail_long$type,
      " project. That is, they want to ",
      project_detail_long$detail,
      ". Their research team has been investigating ",
      project_detail_long$investigation,
      ". Due to ",
      project_detail_long$cost_explanation,
      ", they forecast the entire project to cost $",
      outcome_negative,
      " million. The company would make $",
      gambles$outcome_dif,
      " million if the forecasted ",
      project_detail_long$forecast_details,
      ". ",
      project_detail_long$analysis_details,
      " suggest that there is a ",
      prob_positive,
      "% chance of these forecasts being accurate. Therefore, ",
      bold
    )

  return(project_description_long)


}
