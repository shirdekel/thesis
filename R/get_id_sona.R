##' @title Get SONA ID

##' @return
##' @author Shir Dekel
##' @export
get_id_sona <- function() {

  id_sona_html <- withTags(
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

  id_sona <- trial_generic(
    "survey-html-form",
    html = id_sona_html
  )

  return(id_sona)

}
