##' @title Get PIS

##' @param sample
##'
##' @return
##' @author Shir Dekel
##' @export
get_pis <- function(sample) {

  welcome <- div(
    p("Welcome to the study."),
    p("Make sure to scroll down to the bottom of each page to see the navigation buttons.")) %>%
    as.character() %>%
    str_c()

  pis <- str_c("pis", 1:3, "_", sample, ".png") %>%
    map_chr(~ img(src = insert_resource(.x)) %>%
              as.character())

  trial_instructions(
    pages = c(
      welcome,
      pis
    ),
    show_clickable_nav = TRUE
  )

}
