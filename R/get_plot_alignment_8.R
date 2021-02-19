##' @title Get plot for alignment 8
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_plot_alignment_8 <- function(data_clean) {
  four_way <-
    data_clean %>%
    nest_by(
      id,
      reliability_amount,
      npv_amount,
      allocation,
      alignment,
      reliability_type
    ) %>%
    mutate(reliability_type = reliability_type %>%
      recode(
        explicit = "verbal",
        implicit = "numerical"
      )) %>%
    rename(
      "Reliability type" = reliability_type,
      "Alignment" = alignment
    ) %>%
    ggplot(
      aes(
        y = allocation,
        x = npv_amount,
        linetype = reliability_amount,
        fill = reliability_amount
      )
    ) +
    facet_grid(
      cols = vars(`Reliability type`),
      rows = vars(Alignment),
      labeller = "label_both"
    ) +
    geom_point(shape = 21, colour = "black", alpha = 0.7) +
    geom_smooth(method = "lm", colour = "black") +
    scale_fill_grey(start = 0.2, end = 0.8) +
    theme_apa(base_size = 10) +
    labs(
      y = "Allocation",
      x = "NPV Amount ($)",
      linetype = "Reliability amount",
      fill = "Reliability amount"
    )

  two_way_level <-
    list(
      c(
        "explicit",
        "implicit"
      ) %>%
        rep(each = 2),
      c(
        "high",
        "low"
      ) %>%
        rep(2)
    )

  two_way_name <-
    two_way_level %>%
    pmap(
      ~ str_c(
        "reliability_type",
        .x,
        "alignment",
        .y,
        sep = "_"
      )
    )

  two_way <-
    two_way_level %>%
    pmap(
      ~ data_clean %>%
        nest_by(
          id,
          reliability_amount,
          npv_amount,
          allocation,
          alignment,
          reliability_type
        ) %>%
        filter(
          reliability_type == .x,
          alignment == .y
        ) %>%
        ggplot(
          aes(
            y = allocation,
            x = npv_amount,
            linetype = reliability_amount,
            fill = reliability_amount
          )
        ) +
        geom_point(shape = 21, colour = "black", alpha = 0.7) +
        geom_smooth(method = "lm", colour = "black") +
        scale_fill_grey(start = 0.2, end = 0.8) +
        theme_apa(base_size = 10) +
        labs(
          y = "Allocation",
          x = "NPV Amount ($)",
          linetype = "Reliability amount",
          fill = "Reliability amount"
        )
    ) %>%
    set_names(two_way_name)

  three_way_name <- c("explicit", "implicit")

  three_way <-
    three_way_name %>%
    map(
      ~ data_clean %>%
        nest_by(
          id,
          reliability_amount,
          npv_amount,
          allocation,
          alignment,
          reliability_type
        ) %>%
        filter(
          reliability_type == .x
        ) %>%
        rename("Alignment" = alignment) %>%
        ggplot(
          aes(
            y = allocation,
            x = npv_amount,
            linetype = reliability_amount,
            fill = reliability_amount
          )
        ) +
        facet_grid(
          cols = vars(Alignment),
          labeller = "label_both"
        ) +
        geom_point(shape = 21, colour = "black", alpha = 0.7) +
        geom_smooth(method = "lm", colour = "black") +
        scale_fill_grey(start = 0.2, end = 0.8) +
        theme_apa(base_size = 10) +
        labs(
          y = "Allocation",
          x = "NPV Amount ($)",
          linetype = "Reliability amount",
          fill = "Reliability amount"
        )
    ) %>%
    set_names(three_way_name)

  plot_alignment_8 <-
    lst(
      four_way,
      three_way
    ) %>%
    append(
      two_way
    )

  return(plot_alignment_8)
}
