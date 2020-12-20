##' @title Get structure reason
##'
##' Varies by valence

##' @return
##' @author Shir Dekel
##' @export
get_reason_structure <- function() {
    list(
        ## high negative
        c(
          "centralised_1",
          "decentralised_1"
        ) %>%
     rev(),
        ## high positive
        c(
          "centralised_2",
          "decentralised_2"
        ) %>%
     rev(),
        ## low negative
        c(
          "centralised_3",
          "decentralised_3"
        ),
        ## low positive
        c(
          "centralised_4",
          "decentralised_4"
        )
    ) %>%
      map(latin_list) %>%
      c(NA)
}
