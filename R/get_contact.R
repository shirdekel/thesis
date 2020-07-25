##' @title Get contact trial

##' @return
##' @author Shir Dekel
##' @export
get_contact <- function() {

  contact_html <- withTags(
    div(
      div(
        p("I would like to receive feedback about the overall results of this study."),
        input(type = "radio" ,
              id = "contact_yes" ,
              name = "contact" ,
              value = "yes"),
        label(`for` = "contact_yes",
              "YES"),
        input(type = "radio",
              id = "contact_no",
              name = "contact",
              value = "no",
              checked = NA),
        label(`for` = "contact_no",
              "NO")
      ),
      div(
        p("If you answered YES, please indicate your preferred form of feedback and address:"),
        p("Email:",
          input(type = "text",
                id = "address",
                name = "address")
        )
      )
    )
  ) %>%
    as.character()

  contact <- trial_generic(
    "survey-html-form",
    html = contact_html,
    data = insert_property(stage = "contact")
  )

  return(contact)

}
