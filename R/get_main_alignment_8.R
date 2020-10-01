##' @title Get main experiment trials for alignment 8

##' @param randomize_order
##'
##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
get_main_alignment_8 <- function(gambles, randomize_order = TRUE) {

  instructions <-
    get_instructions_alignment_8()

  projects <-
    get_projects_alignment_8()

  project_allocation <-
    projects %>%
    slide(get_project_allocation)

  main <-
    instructions %>%
    build_timeline(project_allocation)

  return(main)

}
