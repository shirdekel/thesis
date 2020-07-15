##' @title Get distribution preamble
##' @param preamble_distribution_absent
##' @return
##' @author Shir Dekel
##' @export
get_preamble_distribution_present <- function(preamble_distribution_absent) {

  preamble_distribution_present <- str_c(
      div(
        p("Below is the probability distribution of final outcomes if all gambles were chosen."),
        p("The numbers on the x-axis (labelled 'Outcome') represent the final amounts of money possible if you chose to invest in all the projects. The numbers on the y-axis (labelled 'Probability') represent the likelihoods of each of the possible outcomes. Negative final outcomes (losses) are shown in red, positive final outcomes (gains) are shown in green, and a final outcome of zero (no loss or gain) is shown in blue.")) %>%
        as.character(),
      div(
        img(src = insert_resource("distribution.png"),
            width = "600",
            height = "400"),
        .noWS = "inside"
      ) %>%
        as.character(),
      preamble_distribution_absent)

  return(preamble_distribution_present)

}
