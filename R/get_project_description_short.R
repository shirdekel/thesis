##' @title Get short project description
##'
##' @param project_name
##' @param gambles
##' @param project_type
##'
##' @return
##' @author Shir Dekel
##' @export
get_project_description_short <- function(gambles,
                                    project_name,
                                    project_type) {


  outcome_negative <- gambles$outcome_dif - gambles$outcome_positive_restricted_sample
  prob_positive <- gambles$prob_positive_restricted_sample * 100
  prob_negative <- 100 - prob_positive

  bold <- paste0("there is ",
                prob_positive,
                "% chance of gaining $",
                gambles$outcome_positive_restricted_sample,
                " million and a ",
                prob_negative,
                "% chance of losing $",
                outcome_negative,
                " million on the investment.") %>%
    map_chr(~tags$strong(.x) %>%
              as.character())

  project_description <- paste0(project_name,
        " is a business in your company that proposes to construct ",
        project_type %>%
          map_chr(getindefinite),
        " ",
        project_type,
        " project, which they forecast will cost $",
        outcome_negative,
        " million. If the project succeeds, forecasts show the company would make $",
        gambles$outcome_dif,
        " million. Research suggests that there is a ",
        prob_positive,
        "% chance of the project succeeding. Therefore, ",
        bold)

  return(project_description)

}
