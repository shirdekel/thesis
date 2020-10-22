##' @title Enter ranking data
##' @param session
##' @param screenshot
##' @return
##' @author Shir Dekel
##' @export
mock_data_ranking <- function(session, screenshot) {

  ranking <-
    session$findElements(".ranking")

  ranking_sample <-
    ranking %>%
    seq_along() %>%
    sample() %>%
    as.character()

  list(ranking, ranking_sample) %>%
      pmap(
          function(ranking_element, ranking_sample_value) {
            ranking_sample_value %>%
                  ranking_element$setValue()
          }
      )

  if (screenshot) session$takeScreenshot()

}
