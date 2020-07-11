##' @title Plot gambles
##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
plot_gamble <- function(gambles) {

  gamble_plot <- tibble(outcomes = gambles$outcome_aggregated,
         probs = gambles$prob_aggregated,
         colour_group = case_when(
           outcomes > 0 ~ "Positive",
           outcomes < 0 ~ "Negative",
           TRUE ~ "Zero"
         )) %>%
    ggplot(aes(x = outcomes,
               y = probs,
               fill = colour_group)) +
    geom_col() +
    scale_fill_discrete_qualitative("Dark 3") +
    labs(x = "Outcomes ($ million)",
         y = "Probability",
         fill = "Outcome type") +
    scale_x_continuous(breaks = gambles$outcome_aggregated)

  return(gamble_plot)

}
