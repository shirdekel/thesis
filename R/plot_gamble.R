##' @title Plot gambles
##' @param gambles
##'
##' @return
##' @author Shir Dekel
##' @export
plot_gamble <- function(gambles) {

  # Determine whether the figure will have zero or not
  # If zero exists, the order of colorspace fill needs to be specified so that zero gets the blue colour
  if(0 %in% gambles$outcome_aggregated) {
    colour_order <- c(1, 3, 2)
  } else {
    colour_order <- c(1, 2)
  }

  gamble_plot <- tibble(outcomes = gambles$outcome_aggregated,
         probs = gambles$prob_aggregated,
         colour_group = case_when(
           outcomes > 0 ~ "Positive",
           outcomes < 0 ~ "Negative",
           outcomes == 0 ~ "Zero"
         ) %>%
           fct_relevel("Positive", after = 2)) %>%
    ggplot(aes(x = outcomes,
               y = probs,
               fill = colour_group)) +
    geom_col() +
    scale_fill_discrete_qualitative("Dark 3", order = colour_order) +
    labs(x = "Outcomes ($ million)",
         y = "Probability",
         fill = "Outcome type") +
    scale_x_continuous(breaks = gambles$outcome_aggregated)

  return(gamble_plot)

}
