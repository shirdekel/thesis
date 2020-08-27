##' @title Get ID

##' @return
##' @author Shir Dekel
##' @export
get_sample_id <- function(sample) {

  if (sample == "sona") {
    id_html <- withTags(
      div(
        label(`for` = "sona",
              "Enter your full name as it appears on SONA. We need this in order to credit you for your participation. If you have more than one name and are uncertain which one is used on SONA, please provide all possible names."),
        input(type = "text",
              id = "sona",
              name = "sona",
              required = NA,
              size = 30)
      )
    ) %>%
      as.character()
  }

  if(sample == "prolific") {

    id_html <- withTags(
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

  }

  id <- trial_generic(
    "survey-html-form",
    html = id_html,
    data = insert_property(stage = "id"),
    on_load = insert_javascript(
    "function() {
      if (typeof urlvar.PROLIFIC_PID !== 'undefined') {
        document.getElementById('prolific').setAttribute('value', urlvar.PROLIFIC_PID);
      }
    }")
  )

  return(id)

}
