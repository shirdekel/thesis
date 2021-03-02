##' @title Get plot for alignment 6
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_plot_alignment_6 <- function(data_clean) {
    plot_alignment_6 <-
        data_clean %>%
        nest_by(
            id,
            hint,
            npv_amount,
            allocation,
            variance
        ) %>%
        ggplot(
            aes(
                y = allocation,
                x = npv_amount,
                linetype = variance,
                fill = variance
            )
        ) +
        facet_grid(
            cols = vars(hint),
            labeller = "label_both"
        ) +
        geom_point(shape = 21, colour = "black", alpha = 0.7) +
        geom_smooth(method = "lm", colour = "black") +
        scale_fill_grey(start = 0.2, end = 0.8) +
        theme_apa(base_size = 10)

    return(plot_alignment_6)
}
