##' @title Get dv id match

##' @param content
##'
##' @param dv_match_regex
##'
##' @return
##' @author Shir Dekel
##' @export
get_dv_id_match <- function(content, dv_match_regex) {

  list(
    content %>%
      str_match_all(
        regex(
          dv_match_regex,
          multiline = TRUE
        )
      ) %>%
      .[[1]]
  )

}
