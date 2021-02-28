##' @title Get plot for anecdotes 2
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_plot_anecdotes_2 <- function(data_clean) {
  dodgewidth <- 0.9
  data_clean %>%
    nest_by(
      id,
      anecdote_between,
      anecdote_within,
      similarity,
      valence,
      allocation
    ) %>%
    ungroup() %>%
    mutate(
      across(c(similarity, valence), ~ .x %>%
        fct_explicit_na(na_level = "NA")),
      across(where(is.factor), as.character)
    ) %>%
    ggplot(
      mapping = aes(
        x = anecdote_within,
        y = allocation,
        fill = similarity,
        colour = valence,
        shape = valence
      )
    ) +
    facet_grid(
      cols = vars(anecdote_between),
      labeller = label_value
    ) +
    geom_violin() +
    stat_summary(
      fun.data = mean_cl_normal,
      geom = "errorbar",
      size = 0.5,
      width = 0.1,
      position = position_dodge(width = dodgewidth)
    ) +
    stat_summary(
      fun = mean,
      geom = "point",
      size = 3,
      position = position_dodge(width = dodgewidth)
    ) +
    scale_fill_grey(start = 0.3, end = 1) +
    labs(
      x = "Anecdote (within-subjects)",
      fill = "Similarity",
      y = "Allocation",
      colour = "Valence",
      shape = "Valence"
    ) +
    theme_apa(base_size = 10)
}
