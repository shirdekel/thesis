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
    get_instructions_experiment4() %>%
    unname()

  # projects <-
  #   get_projects_experiment4(gambles)
  #
  # trials <-
  #   get_trials_experiment4(
  #     projects,
  #     randomize_order
  #   )

  main <-
    instructions %>%
    build_timeline() %>%
    flatten()

  return(main)

}
