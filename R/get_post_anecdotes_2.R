##' @title Get post experiment trials Anecdotes Experiment 2

##' @return
##' @author Shir Dekel
##' @export
get_post_anecdotes_2 <- function() {
  debrief <-
    get_debrief()

  trial_end <-
    get_trial_end()

  post <-
    build_timeline(
      debrief,
      trial_end
    )

  return(post)
}
