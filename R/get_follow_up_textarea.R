##' @title Get textarea for justify follow-up
##' @param follow_up_id
##' @return
##' @author Shir Dekel
##' @export
get_follow_up_textarea <- function(follow_up_id) {
 withTags(
    p(
      p(
        label(
          `for` = follow_up_id,
          "Justify your answer: "
        )
      ),
      textarea(
        type = "number",
        id = follow_up_id,
        name = follow_up_id,
        rows = 5,
        cols = 50,
        required = NA
      )
    )
  )
}
