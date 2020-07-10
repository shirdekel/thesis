##' @title Get project description
##' @param gamble_value_positive
##' @param gamble_value_dif
##' @param gamble_prob_positive
##' @param project_name
##' @param project_type
##' @return
##' @author Shir Dekel
##' @export
get_project_description <- function(gamble_value_positive, gamble_value_dif,
                                    gamble_prob_positive, project_name, project_type) {

  gamble_value_negative <-  gamble_value_dif - gamble_value_positive
  gamble_prob_positive <- gamble_prob_positive * 100
  gamble_prob_negative <- 100 - gamble_prob_positive
  gamble_value_profit <- gamble_value_positive + gamble_value_negative

  bold <- paste0("there is ",
                gamble_prob_positive,
                "% chance of gaining $",
                gamble_value_positive,
                " million and a ",
                gamble_prob_negative,
                "% chance of losing $",
                gamble_value_negative,
                " million on the investment.")

  project_description <- paste0(project_name,
        " is a business in your company that proposes to construct ",
        getindefinite(project_type),
        " ",
        project_type,
        " project, which they forecast will cost $",
        gamble_value_negative,
        " million. If the project succeeds, forecasts show the company would make $",
        gamble_value_profit,
        " million. Research suggests that there is a ",
        gamble_prob_positive,
        "% chance of the project succeeding. Therefore, ",
        tags$strong(bold))

  return(project_description)

}
