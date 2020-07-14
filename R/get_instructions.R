##' @title Get instructions

##' @return
##' @author Shir Dekel
##' @export
get_instructions <- function() {

  instructions <- trial_instructions(
    pages = c(
      "Welcome! Use the arrow buttons to browse these instructions",
      "Imagine that you are an executive in a large company composed of many individual businesses. You will see various projects from these businesses and have to decide whether you would like to invest in them. Imagine that making good investment decisions will result in you receiving a generous bonus and a potential promotion, and that doing poorly will result in you receiving a large pay cut and a potential demotion. We want to know what choices you would actually make in these scenarios.",
      "You will respond by clicking a button",
      "Press the 'Next' button to begin!"
    ),
    show_clickable_nav = TRUE
  )

  return(instructions)

}
