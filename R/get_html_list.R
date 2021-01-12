##' @title Get HTML list
##' @param list

##' @return
##' @author Shir Dekel
##' @export
get_html_list <- function(list) {
  html_list <-
    list %>%
    map_chr(
      ~ tags$ul(.x %>%
        map(~ .x %>%
          tags$li(.noWS = "outside"))) %>%
        as.character(),
      .noWS = "inside"
    )

  return(html_list)
}
