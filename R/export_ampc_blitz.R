##' @title Export AMPC blitz slide
##' @param plot_alignment_8
##' @return
##' @author Shir Dekel
##' @export
export_ampc_blitz <- function(plot_alignment_8) {
  here("doc", "ampc_blitz", "ampc_blitz.png") %>%
    ggsave(plot = plot_alignment_8$four_way, width = 7, height = 4, dpi = 300, scale = 1.2)
}
