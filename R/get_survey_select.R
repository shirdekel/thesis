##' @title Get drop-down survey question

##' @param name_select
##'
##' @param name_other
##' @param option
##' @param label_select
##'
##' @return
##' @author Shir Dekel
##' @export
get_survey_select <- function(name_select, name_other, option, label_select) {

  option_html <- c("", option, "Other") %>%
    map(~ tags$option(value = .x, .x))

  survey_select <- withTags(
    p(
      p(
        p(
          label(`for` = name_select,
                   label_select)
          ),
        select(id = name_select,
               name = name_select,
               option_html,
               onchange = str_c("checkOther(this.value, '", name_other, "');"),
               required = NA)
      ),
      p(
        input(type = "text",
              id = name_other, # So that checkOther() looks for this
              name = name_select, # So that the input gets encoded into the same column as the drop-down options
              style = "display:none;",
              placeholder = "Specify other")
      )
    )
  ) %>%
    as.character() %>%
    str_replace_all(pattern = "&#39;", "'") %>% # For some reason htmltools::tags converts quotation marks into ASCII
    HTML()

  return(survey_select)

}
