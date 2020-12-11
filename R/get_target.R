##' @title Get target projects
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_target <- function(data) {
  data %>%
    pivot_longer(
      cols = -project_type,
      names_to = "Relevant information"
    ) %>%
    pivot_wider(
      names_from = project_type,
      values_from = value
    ) %>%
    htmlTable(rnames = F) %>%
    str_c(
      "Allocate your budget between the following two projects using percentage values (the two values should sum to 100):" %>%
        p() %>%
        as.character(),
      .
    ) %>%
    HTML() %>%
    tags$fieldset(tags$legend("Target projects"))
}
