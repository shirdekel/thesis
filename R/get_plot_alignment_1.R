##' @title Get plot for alignment 1
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_plot_alignment_1 <- function(data_clean) {
    plot_alignment_1 <-
        data_clean %>%
        mutate(across(project, as.numeric)) %>%
        nest_by(
            id,
            reliability_amount,
            project,
            allocation,
            alignment
        ) %>%
        ggplot(
            aes(
                y = allocation,
                x = project,
                linetype = reliability_amount,
                fill = reliability_amount
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

    return(plot_alignment_1)
}
