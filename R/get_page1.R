##' @title Page 1

##' @param project_description
##'
##' @param form_options
##'
##' @return
##' @author Shir Dekel
##' @export
get_page1 <- function(project_description, form_options) {

  preamble_distribution <- withTags(
    div(
      p("Decide whether you would like to invest in the following projects."),
      p("Below is the probability distribution of final outcomes if all 10 gambles were chosen."))
  ) %>%
    as.character() %>%
    str_c(div(
      img(src = insert_resource("distribution.png"),
          width = "600",
          height = "400")
    ) %>%
      as.character())


  page1 <- trial_survey_multi_choice(
    preamble = preamble_distribution,
    questions = project_description %>%
      map(~question_multi(
        prompt = .x,
        options = form_options,
        name = "project"
      ))
  )

  return(page1)

}
