##' .. content for \description{} (no empty lines) ..
##'
##' .. content for \details{} ..
##'
##' @title

##' @return
##' @author Shir Dekel
##' @export
get_instructions_anecdotes_2 <- function() {
  introduction <-
    c(
      "Imagine you are an executive in a multi-business company and that you are presented with two projects to potentially invest in. Your job is to decide how to allocate the capital available in your budget between these two projects.",
      "In a moment you will see a table that details the two target projects and relevant information about them."
    ) %>%
    map(p)

  instructions_raw <-
    list(
      "Managers often find it useful to consult with previous case studies before making important decisions. As well as seeing the two target projects, you will also be provided with an example of a failed project with some information that was available just before the company decided to invest in it. Further, you are also provided with an analysis of this investment decision after it became clear that the project will not meet its expected return on investment.",
      "As a part of the relevant information that will be provided for each target project, you will be provided with measures of overall reliability and Net Present Value (NPV). The NPV is the company’s estimation of the future returns of the project. An NPV that is greater than 0 (zero) indicates that there is an expectation of profit. The higher the NPV, the better the expectations for each project. Both these measures were collected as part of a research study conducted by an international consulting company that aggregated data from thousands of other projects in relevant industries.",
      "Note that the project in the case study was included in the research study, so its features are subsumed in the aggregated data."
    ) %>%
    map(p)

  instructions_main <-
    list(
      instructions_raw[[1]],
      instructions_raw[[2]],
      p(instructions_raw)
    )

  project_test <-
    c(
      "Test yourself on the above instructions. How many pairs of projects will you see? "
    ) %>%
    get_survey_number(
      name = "project_test",
      suffix = " projects"
    )

  instructions_html <-
    instructions_main %>%
    map(
      ~ tags$fieldset(
        introduction,
        .x,
        project_test
      ) %>%
        as.character()
    )

  instructions <-
    list(
      instructions_html,
      c(
        "anecdote_only",
        "statistics_only",
        "combined"
      )
    ) %>%
    pmap(
      ~ trial_generic(
        "survey-html-form",
        html = .x,
        data = insert_property(stage = "instructions")
      ) %>%
        build_timeline() %>%
        display_if(fn_data_condition(anecdote == !!.y))
    )

  return(instructions)
}
