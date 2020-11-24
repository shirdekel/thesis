##' @title Get main experiment trials for anecdotes 2
##'
##' Should be a list of one timeline. That timeline should be a list of n, with
##' n being the number of trials. If a trial is a list (because it is a
##' conditional timeline or has variables), then it should be a timeline list.
##'
##' Usually you're using lists of trials, so running `map(flatten)` usually does
##' the trick.

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

  allocation_display <-
      get_parameters_anecdotes_2() %>%
      mutate_parameters_anecdotes_2()

  projects <-
    get_projects_anecdotes_2(allocation_display)

  ## project_allocation <-
  ##   projects %>%
  ##   slide(get_project_allocation, randomize_order)

  main <-
      instructions %>%
    build_timeline(projects %>%list(projects)) %>%
    map(flatten)

  return(main)
}
