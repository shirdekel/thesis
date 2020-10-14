##' @title Get display variation
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_display <- function(data) {
  data %>%
    mutate(
      display_variation = case_when(
        reliability_amount == "low" & display_set == "1" ~ 1,
        reliability_amount == "high" & display_set == "2" ~ 1,
        reliability_amount == "low" & display_set == "2" ~ 2,
        reliability_amount == "high" & display_set == "1" ~ 2
      )
    )
}
