##' @title Get raw anecdote description

##' @return
##' @author Shir Dekel
##' @export
##' @param business_name
##' @param location
##' @param integration
##' @param investment
##' @param predicted_project_features
get_anecdote_raw <- function(anecdote_presence, business_name, location,
                             integration, investment,
                             predicted_project_features) {
  if (anecdote_presence) {
  anecdote_raw <-
    htmltools::withTags({
      ul(
        li(
          "Business details:",
            htmltools::withTags({
              ul(
                li("Business name: ", business_name),
                li("Location: ", location),
                li("Integration: ", integration)
              )
            })
        ),
        li(
          "Investment:",
          investment
        ),
        li(
          "Predicted project features:",
          htmltools::HTML(predicted_project_features)
        )
      )
    }) %>%
    as.character()
  } else {
    anecdote_raw <- ""
  }

  return(anecdote_raw)
}
