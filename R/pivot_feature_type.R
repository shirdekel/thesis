##' @title Pivot feature type
##'
##' Makes the feature type rows (anecdote and target) into columns (for the
##' relevant components) so that conditions (represented by rows) can have
##' clearly connected anecdote and target components.

##' @return
##' @author Shir Dekel
##' @export
##' @param unselected_for_pivot
pivot_feature_type <- function(unselected_for_pivot) {
  feature_type_pivoted <-
    unselected_for_pivot %>%
    pivot_longer(
      c(
        business_name,
        type,
        location,
        integration,
        structure,
        predicted_features,
        value_string,
        analysis,
        input_id
      ),
      names_to = "names",
      values_to = "values"
    ) %>%
    pivot_wider(
      names_from = c(names, feature_type),
      values_from = values,
    )
  feature_type_pivoted
}
