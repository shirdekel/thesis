##' @title Get anecdote html
##' that'll end up in "Case study"

##' @return
##' @author Shir Dekel
##' @export
##' @param data
get_anecdote <- function(data) {
  data %>%
    filter(project_type == "target") %>%
    mutate(
      anecdote_raw = get_anecdote_raw(
        business_name_anecdote, location_anecdote,
        integration_anecdote, structure_anecdote,
        type_anecdote, predicted_features_anecdote
      ),
      anecdote = str_c(analysis_anecdote, anecdote_raw) %>%
        HTML() %>%
        tags$fieldset(tags$legend("Case study")) %>%
        list()
    ) %>%
    pull(anecdote)
}
