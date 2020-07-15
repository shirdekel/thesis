##' @title Get demographic information

##' @return
##' @author Shir Dekel
##' @export
get_demographics <- function() {

  sex <- withTags(
    p(
      "What is your sex?",
      input(type = "radio",
            id = "male",
            name = "sex",
            value = "male",
            checked = NA),
      label(`for` = "male",
            "Male"),
      input(type = "radio",
            id = "female",
            name = "sex",
            value = "female"),
      label(`for` = "female",
            "Female")
    )
  )

  age <- get_survey_number(question_text = "What is your age?",
                           question_name = "age",
                           question_min = "10")

  language_options <- c("No", "Chinese", "Japanese", "Vietnamese", "Korean", "Arabic", "Spanish", "Italian", "Greek" , "Hebrew", "Other") %>%
    map(~ tags$option(value = .x, .x))

  language <- withTags(
    p(
      p(
        label(`for` = "languages",
            "Do you speak a language other than English at home?"),
      select(id = "languages",
             language_options)
      ),
      p(
        label(`for` = "languages",
            "If other language, please specify:"),
      input(type = "text",
            id = "other",
            name = "other")
      )
    )
  )

  education <- get_survey_number("How many years of experience do you have studying business?", "business_edu")

  experience <- get_survey_number("How many years of experience do you have working in a corporate business setting?", "business_exp")

  current <- withTags(
    p(
      p("Do you currently work in an executive or managerial role?"),
      input(type = "radio" ,
            id = "current_yes" ,
            name = "current" ,
            value = "yes"),
      label(`for` = "current_yes",
            "Yes"),
      input(type = "radio",
            id = "current_no",
            name = "current",
            value = "no",
            checked = NA),
      label(`for` = "current_no",
            "No")
    )
  )

  demographics_html <- div(sex, age, language, education, experience, current) %>%
    as.character()

  demographics <-trial_generic(
    "survey-html-form",
    html = demographics_html)

  return(demographics)

}
