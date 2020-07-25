##' @title Get debrief

##' @return
##' @author Shir Dekel
##' @export
get_debrief <- function() {

  debrief_html <- str_c("debrief", 1:2, ".png") %>%
    map_chr(~ img(src = insert_resource(.x),
                  width = "750") %>%
              as.character())

  debrief <- trial_instructions(
    pages = c(
      debrief_html
    ),
    show_clickable_nav = TRUE,
    data = insert_property(stage = "debrief")
  )

  return(debrief)

}
