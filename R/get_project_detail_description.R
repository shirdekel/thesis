##' @title Get project detail features

##' @return
##' @author Shir Dekel
##' @export
get_project_detail_feature <- function() {
  project_detail_feature <-
    list(
      list(
        c(
          "Newspapers printed",
          "Pills pressed",
          "Railway lines built",
          "High-rises built",
          "Code written"
        ),
        c(
          "Number of weekly advertisers",
          "Shelf life",
          "Number of seats filled by paying customers at peak hour",
          "Probability that the builders complete construction within a month of the due date",
          "Security rating"
        ),
        c(
          "Ink that is not discarded due to impurities",
          "Probability of symptom reduction after a week",
          "Time before the train carriages will need to be serviced",
          "Number of tenant expressions of interest",
          "Number of potential customers in first year"
        )
      ),
      list(
        c(
          "Oil extracted",
          "Microchips produced",
          "Packages shipped",
          "Restaurants established",
          "Record projects completed"
        ),
        c(
          "Time the machinery lasts before requiring maintenance",
          "Usable semiconductor yield after testing",
          "Number of packages that do not spend time in a bottleneck",
          "Number of reservations on a Saturday night",
          "Radio listenership nationally"
        ),
        c(
          "Probability of finding oil",
          "Compatible PCs in the market",
          "Average accuracy of shipments",
          "Positive reviews",
          "Relevant network connections"
        )
      )
    ) %>%
    map(
      ~ .x %>%
        transpose() %>%
        map(unlist)
    )

  return(project_detail_feature)
}
