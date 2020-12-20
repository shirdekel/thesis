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
      "key operational decisions were",
      "communication across relevant business units was"
    ) %>%
      str_c("delayed with what needed to be a timely process",
        sep = " "
      ) %>%
      rev(),
    ## high positive
    c(
      "there was greater consistency across the individual teams' goals",
      "the individual teams had greater autonomy to complete their tasks"
    ) %>%
      str_c("increasing the efficiency of important project stages",
        sep = ", "
      ) %>%
      rev(),
    ## low negative
    c(
      "poor performers took longer to be replaced",
      "the teams' project timelines were not coordinated perfectly"
    ) %>%
      str_c("so some tasks needed considerable revision",
        sep = ", "
      ),
    ## low positive
    c(
      "employees had a clearer chain of command",
      "employees had a greater sense of initiative"
    ) %>%
      str_c("so were able to take care of important challenges early",
        sep = ", "
      )
  ) %>%
    map(latin_list) %>%
    c(NA)
}
