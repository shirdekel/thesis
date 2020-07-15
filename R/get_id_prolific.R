##' @title Get Prolific ID

##' @return
##' @author Shir Dekel
##' @export
get_id_prolific <- function() {

  id_prolific_html <- withTags(
    div(
      label(`for` = "prolific",
            "Enter your Prolific ID (24 alphanumeric characters, no spaces):"),
      input(type = "text",
            id = "prolific",
            name = "prolific",
            required = NA,
            minlength = "24",
            maxlength = "24",
            pattern = "^[a-z0-9]+$",
            size = 30)
    )
  ) %>%
    as.character()

  id_prolific <- trial_generic(
    "survey-html-form",
    html = id_prolific_html
  )

  return(id_prolific)

}
