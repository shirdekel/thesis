##' @title Get welcome page

##' @return
##' @author Shir Dekel
##' @export
get_welcome <- function() {

  welcome <- div(
    p("Welcome to the study."),
    p("Make sure to scroll down to the bottom of each page to see the navigation buttons.")) %>%
    as.character()

  welcome <- trial_instructions(
    pages = c(
      welcome
    ),
    show_clickable_nav = TRUE,
    data = insert_property(stage = "welcome")
  )

  return(welcome)

}
