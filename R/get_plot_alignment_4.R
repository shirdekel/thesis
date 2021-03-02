##' @title Get plot for alignment 4
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_plot_alignment_4 <- function(data_clean) {
    plot_alignment_4 <-
        data_clean %>%
        nest_by(
            id,
            npvReliability,
            project.npv,
            forecastMean,
            alignment
        ) %>%
        ggplot(
            aes(
                y = forecastMean,
                x = project.npv,
                linetype = npvReliability,
                fill = npvReliability
            )
        ) +
        facet_grid(
            cols = vars(alignment),
            labeller = "label_both"
        ) +
        geom_point(shape = 21, colour = "black", alpha = 0.7) +
        geom_smooth(method = "lm", colour = "black") +
        scale_fill_grey(start = 0.2, end = 0.8) +
        theme_apa(base_size = 10)

    return(plot_alignment_4)
}
