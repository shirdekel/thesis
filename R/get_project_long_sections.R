##' .. content for \description{} (no empty lines) ..
##'
##' .. content for \details{} ..
##'
##' @title
##' @param gambles
##' @param project_long_components
##' @param project_long_detail
##' @return
##' @author Shir Dekel
##' @export
get_project_long_sections <- function(gambles,
                                      project_long_components,
                                      project_long_detail) {

  outcome_negative <-
    gambles$outcome_dif - gambles$outcome_positive_restricted_sample
  prob_positive <-
    gambles$prob_positive_restricted_sample * 100
  prob_negative <-
    100 - prob_positive

  intro <-
    str_c(
      str_c(
        project_long_components$name,
        "is a business in your company that proposes to construct",
        project_long_components$type %>%
          map_chr(getindefinite),
        project_long_components$type,
        "project",
        sep = " "
      ),
      str_c(
        "That is, they want to",
        project_long_detail,
        sep = " "
      ),
      sep = ". "
    )

  cost <-
    str_c(
      str_c(
        "Their research team has been investigating",
        project_long_components$investigation,
        sep = " "
      ),
      str_c(
        "Due to",
        str_c(
          project_long_components$cost_explanation,
          ", they forecast the entire project to cost $",
          outcome_negative
        ),
        "million",
        sep = " "
      ),
      sep = ". "
    )

  risk <-
    str_c(
      str_c(
        str_c(
          "The company would make $",
          gambles$outcome_dif
        ),
        "million if the forecasted",
        project_long_components$forecast_details,
        sep = " "
      ),
      str_c(
        project_long_components$analysis_details,
        "suggest that there is a",
        str_c(
          prob_positive,
          "% chance that these forecasts are accurate"
        ),
        sep = " "
      ),
      sep = ". "
    )

  gamble <-
    str_c(
      "To summarise, there is a",
      str_c(
        prob_positive,
        "% chance of gaining $",
        gambles$outcome_positive_restricted_sample
      ),
      "million and a",
      str_c(
        prob_negative,
        "% chance of losing $",
        outcome_negative
      ),
      "million on this investment",
      sep = " "
    )

  project_long_section <-
    list(
      intro,
      cost,
      risk,
      gamble
    )

  return(project_long_section)

}
