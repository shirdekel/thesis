##' @title Get alignment 8 screenshot file names

##' @return
##' @author Shir Dekel
##' @export
get_file_name_materials_alignment_8 <- function() {
  file_name_materials_alignment_8 <-
    c(
      str_c("instructions_reliability_type", c("implicit", "explicit"), sep = "_"),
      str_c("interstitial", seq_len(2), sep = "_"),
      c("explicit", "implicit") %>%
        map(
          ~ str_c(
            "project_allocation",
            "alignment",
            "low",
            "reliability_type",
            .x,
            "reliability_amount",
  # unclear why high/low order is different to expectation
            c("high", "low"),
            "variation",
            seq_len(1),
            sep = "_"
          )
        ) %>%
        unlist(),
      c("high", "low") %>%
        map(
          ~ str_c(
            "project_allocation",
            "alignment",
            "high",
            "reliability_type",
            "implicit",
            "reliability_amount",
            .x,
            "variation",
            seq_len(5),
            sep = "_"
          )
        ) %>%
        unlist()
    )

  return(file_name_materials_alignment_8)
}
