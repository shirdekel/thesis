##' @title Get reference document split
##'
##' Split up the reference doc by blocks so that each one can be subsequently matched
##'
##' @param reference_doc
##' @return
##' @author Shir Dekel
##' @export
get_reference_doc_split <- function(reference_doc) {

  reference_doc_split_regex <-
    get_reference_doc_split_regex()

  reference_doc_split <-
    reference_doc %>%
    str_match_all(regex(
      reference_doc_split_regex,
      dotall = TRUE
    )) %>%
    as.data.frame() %>%
    as_tibble() %>%
    rename("block" = "X3", "content" = "X5") %>%
    select(block, content)

  return(reference_doc_split)

}
