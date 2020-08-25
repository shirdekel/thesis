##' @title Get project sections E3
##' @param gambles
##' @param project_components_experiment3
##' @param project_detail_experiment3
##' @return
##' @author Shir Dekel
##' @export
get_project_sections_experiment3 <- function(gambles,
                                             project_components_experiment3,
                                             project_detail_experiment3) {

  outcome_negative <-
    gambles$outcome_dif - gambles$outcome_positive_restricted_sample
  prob_positive <-
    gambles$prob_positive_restricted_sample * 100
  prob_negative <-
    100 - prob_positive

  intro <-
    str_c(
      str_c(
        project_components_experiment3$name,
        "is a business in your company that proposes to construct",
        project_components_experiment3$type %>%
          map_chr(getindefinite),
        project_components_experiment3$type,
        "project",
        sep = " "
      ),
      str_c(
        "Specifically, they want to",
        project_detail_experiment3,
        sep = " "
      ),
      sep = ". "
    )

  cost <-
    str_c(
      str_c(
        str_c(
          project_components_experiment3$name,
          "'s research team has been investigating"
        ),
        project_components_experiment3$investigation,
        sep = " "
      ),
      str_c(
        "Due to the",
        str_c(
          project_components_experiment3$cost_explanation,
          ", they forecast the entire project to cost $",
          outcome_negative
        ),
        "million (the loss amount)",
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
        project_components_experiment3$forecast_details,
        sep = " "
      ),
      str_c(
        "The estimate for the anticipated chance of gain is based on",
        project_components_experiment3$analysis_details %>%
          map_chr(getindefinite),
        project_components_experiment3$analysis_details,
        sep = " "
      ),
      sep = ". "
    )

  gamble <-
    str_c(
      "To summarise this investment, there is a",
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
      "million",
      sep = " "
    )

  project_sections_experiment3 <-
    list(
      intro,
      cost,
      risk,
      gamble
    )

  return(project_sections_experiment3)

}
