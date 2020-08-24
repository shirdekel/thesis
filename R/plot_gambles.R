##' @title Plot gambles
##'
##' @param gambles
##' @param file_name
##'
##' @return
##' @author Shir Dekel
##' @export
plot_gambles <- function(gambles, file_name) {

  gambles_table <-
    tibble(
      outcomes = gambles$outcome_aggregated,
      probs = gambles$prob_aggregated,
      colour_group = case_when(
        outcomes > 0 ~ "Gain",
        outcomes < 0 ~ "Loss",
        outcomes == 0 ~ "Zero"
      ) %>%
        fct_relevel("Gain", after = 2)
    )

  # Have to do this, as opposed to just varying the order vector because of a weird error when running through capsule rmake
  if("Zero" %in% gambles_table$colour_group) {
    scale_choice <- scale_fill_discrete_qualitative("Dark 3", order = c(1, 3, 2))
  } else {
    scale_choice <- scale_fill_discrete_qualitative("Dark 3", order = c(1, 2))
  }

  gambles_plot <-
    gambles_table %>%
    ggplot(aes(x = outcomes,
               y = probs,
               fill = colour_group)) +
    geom_col() +
    scale_choice +
    labs(x = "Outcome ($ million)",
         y = "Probability",
         fill = "Outcome type") +
    scale_x_continuous(breaks = gambles$outcome_aggregated)

  here("inst", "experiment_resources", str_c(file_name, ".png")) %>%
    ggsave(plot = gambles_plot, width = 6, height = 4, dpi = 300)


  return(gambles_plot)

}
