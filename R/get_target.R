##' @title Get target projects
##' @param data
##' @return
##' @author Shir Dekel
##' @export
get_target <- function(data) {

  data %>%
    select(
      business_name_target,
      type_target,
      location_target,
      integration_target,
      structure_target,
      predicted_features_target,
      project_type,
      reliability,
      npv
    ) %>%
    pivot_longer(
        cols = -project_type,
        names_to = "Relevant information"
    ) %>%
        pivot_wider(
            names_from = project_type,
            values_from = value
        )%>%
        htmlTable(rnames = F) %>%
        str_c(
          "Allocate your budget between the following two projects using percentage values (the two values should sum to 100):" %>%
            p() %>%
            as.character(),
          .,
          get_allocation()
        ) %>%
        HTML() %>%
        tags$fieldset(tags$legend("Target projects"))

}
