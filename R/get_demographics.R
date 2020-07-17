##' @title Get demographic information

##' @return
##' @author Shir Dekel
##' @export
get_demographics <- function() {

  sex <- withTags(
    p(
      p("What is your sex?"),
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

  age <- get_survey_number(label_text = "What is your age?",
                           name = "age",
                           min = "10")

  language_options <- c("No", "Chinese", "Japanese", "Vietnamese", "Korean", "Arabic", "Spanish", "Italian", "Greek" , "Hebrew")

  language <- get_survey_select(name_select = "language",
                    name_other = "language_other",
                    option = language_options,
                    label_select = "Do you speak a language other than English at home?")

  education <- get_survey_number("How many years of experience do you have studying business?", "business_edu", suffix = "years")

  experience <- get_survey_number("How many years of experience do you have working in a corporate business setting?", "business_exp", suffix = "years")

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

  demographics_combined <- list(sex, age, language, education, experience, current) %>%
    map(~tags$li(.x)) %>%
    tags$ol(style = "text-align:left") %>%
    as.character()

  demographics <-trial_generic(
    "survey-html-form",
    html = demographics_combined,
    on_finish = insert_javascript("function(data){
    data.current_response = JSON.parse(data.responses).current
  }")
  )

  return(demographics)

}
