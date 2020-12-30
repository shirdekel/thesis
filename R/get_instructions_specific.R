##' @title Get condition-specific instructions

##' @return
##' @author Shir Dekel
##' @export
##' @param anecdote_within
##' @param anecdote_between
get_instructions_specific <- function(anecdote_within, anecdote_between) {
    instructions_raw <-
        list(
            ## Anecdote only
            "Managers often find it useful to consult with previous case studies before making important decisions. As well as seeing the two target projects, you will also be provided with an example of a failed project with some information that was available just before the company decided to invest in it. Further, you are also provided with an analysis of this investment decision after it became clear that the project will not meet its expected return on investment.",
            ## Statistics only
            "As a part of the relevant information that will be provided for each target project, you will be provided with measures of overall reliability and Net Present Value (NPV). The NPV is the company’s estimation of the future returns of the project. An NPV that is greater than 0 (zero) indicates that there is an expectation of profit. The higher the NPV, the better the expectations for each project. Both these measures were collected as part of a research study conducted by an international consulting company that aggregated data from thousands of other projects in relevant industries.",
            ## Combined
            "Note that the project in the case study was included in the research study, so its features are subsumed in the aggregated data."
        ) %>%
        map(p)

    case_when(
        anecdote_within == "anecdote" &
            anecdote_between == "anecdote_only" ~
        instructions_raw[1],
        anecdote_within == "anecdote" &
            anecdote_between == "combined" ~
              p(instructions_raw) %>%
     list(),
        TRUE ~ instructions_raw[2]
    ) %>%
      tags$fieldset(tags$legend("Instructions")) %>%
      list()
}
