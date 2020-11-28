##' @title Get raw anecdote description

##' @return
##' @author Shir Dekel
##' @export
##' @param business_name_anecdote
##' @param location_anecdote
##' @param integration_anecdote
##' @param structure_anecdote
##' @param type_anecdote
##' @param predicted_features_anecdote
get_anecdote_raw <- function(business_name_anecdote, location_anecdote,
                             integration_anecdote, structure_anecdote,
                             type_anecdote, predicted_features_anecdote) {
  withTags({
    ul(
      li(
        "Business details:",
        withTags({
          ul(
            li("Business name: ", business_name_anecdote),
            li("Location: ", location_anecdote),
            li("Integration: ", integration_anecdote),
            li("Structure: ", structure_anecdote)
          )
        })
      ),
      li(
        "Investment:",
        type_anecdote
      ),
      li(
        "Predicted project features:",
        HTML(predicted_features_anecdote)
      )
    )
  }) %>%
    as.character()
}
