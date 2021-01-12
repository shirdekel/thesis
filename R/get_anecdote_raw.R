##' @title Get raw anecdote description
##'
##' Need to remove whitespace so that when concatenated by `insert_javascript`
##' it stays on the same line.

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
        str_c(
          "Business details:",
          withTags({
            ul(
              li(
                str_c(
                  "Business name:", business_name_anecdote,
                  sep = " "
                ),
                .noWS = "inside"
              ),
              li(
                str_c(
                  "Location:", location_anecdote,
                  sep = " "
                ),
                .noWS = c("inside", "outside")
              ),
              li(
                str_c(
                  "Integration:", integration_anecdote,
                  sep = " "
                ),
                .noWS = "inside"
              ),
              li(
                str_c(
                  "Structure:", structure_anecdote,
                  sep = " "
                ),
                .noWS = c("inside", "outside")
              ),
              .noWS = "inside"
            )
          }) %>%
            as.character()
        ) %>%
          HTML(),
        .noWS = "inside"
      ),
      li(
        str_c(
          "Investment:",
          type_anecdote
        ),
        .noWS = c("inside", "outside")
      ),
      li(
        str_c(
          "Predicted project features:",
          predicted_features_anecdote
        ) %>%
          HTML(),
        .noWS = "inside"
      ),
      .noWS = "inside"
    )
  }) %>%
    as.character()
}
