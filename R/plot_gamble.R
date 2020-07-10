##' @title Plot gambles
##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
plot_gamble <- function(gambles) {

  tibble(outcomes = gambles$outcome_aggregated,
         probs = gambles$prob_aggregated) %>%
    ggplot(aes(outcomes, probs)) +
    geom_col()

}
