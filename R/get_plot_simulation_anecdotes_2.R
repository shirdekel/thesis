##' @title Anecdotes simulation plot
##' @param data

##' @return
##' @author Shir Dekel
##' @export
get_plot_simulation_anecdotes_2 <- function(data) {
  data %>%
    apa_plot(
      iv1 = "anecdote",
      iv2 = "similarity",
      iv3 = valence,
      dv = "allocation"
    ) +
    ## https://stackoverflow.com/a/43903054/13945974
    facet_grid(~valence,
        scales = "free_x", space = "free_x",
        labeller = label_both
    )
}
