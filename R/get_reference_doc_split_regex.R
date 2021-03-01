##' @title Get reference doc split regex
##' Split the text up for subsequent matching

##' @return
##' @author Shir Dekel
##' @export
get_reference_doc_split_regex <- function() {

  reference_doc_split_regex <-
    rx() %>%
    # Anchor on "Start of Block"
    rx_find("Start of Block: ") %>%
    # Get name of block
    rx_anything(mode = "lazy") %>%
    rx_line_break() %>%
    # Get block content
    rx_anything(mode = "lazy") %>%
    # End search boundary
    rx_find("End of Block") %>%
    # Remove rx_string class, so that stringr::regex() doesn't send a coersion warning
    as.character()

  return(reference_doc_split_regex)

}
