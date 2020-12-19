##' @title Get location reason
##'
##' Varies by valence

##' @return
##' @author Shir Dekel
##' @export
get_reason_location <- function() {
  list(
    list(
      ## national newspaper
      c("against", "towards") %>%
        str_c(
          "shifting demographic interest", ., "newspapers",
          sep = " "
        ),
      ## pharmaceutical
      c("restricted", "expanded") %>%
        str_c(
        "legislation that", ., "pharmaceutical company freedoms",
        sep = " "
        )
    ),
    list(
      ## railway
      c("a decrease", "an increase") %>%
        str_c(
        ., "in local fuel prices, changing commuter behaviour",
          sep = " "
        ),
      ## high-rise construction
      c("faults", "successes") %>%
        str_c(
        "a change in buyer confidence due to recent structural", .,
        "in other such buildings",
          sep = " "
        )
    ),
    list(
      ## software
      c("reduced", "increased") %>%
        str_c(
        "changes in privacy laws (that", .,
        "consumer confidence in the business' apps)",
          sep = " "
        ),
      ## oil well
      c("shortage", "surplus") %>%
        str_c(
        "what scientists now know is a hydrocarbon", .,
          sep = " "
        )
    ),
    list(
      ## microchip
      c("increased", "decreased") %>%
        str_c(
        ., "silicon taxes",
          sep = " "
        ),
      ## shipping logistics
          c("increased", "decreased") %>%
        str_c(
        "port tariffs", .,
          sep = " "
        )
),
    list(
      ## restaurant chain
          c("decreased", "increased") %>%
        str_c(
        ., "tourism traffic",
          sep = " "
        ),
      ## record label
          c("reduced", "increased") %>%
        str_c(
        "radio listenership", .,
          sep = " "
        )
)
  ) %>%
    map(transpose) %>%
    transpose() %>%
    set_names("negative", "positive")
}
