##' @title Get main experiment trials for anecdotes 2

##' @param randomize_order
##'
##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
get_main_anecdotes_2 <- function(gambles, randomize_order = TRUE) {
  instructions <-
    get_instructions_anecdotes_2()

  projects <-
    get_projects_anecdotes_2()

  ## project_allocation <-
  ##   projects %>%
  ##   slide(get_project_allocation, randomize_order)

  main <-
    build_timeline(
      instructions[[1]],
      projects
    )
    ## map(flatten)

  str(main, 2)

  return(main)
}
