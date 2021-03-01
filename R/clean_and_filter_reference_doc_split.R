##' @title Clean and filter reference doc split
##'
##' Clean block names mainly so that later regex works easier.
##' Filter out blocks that we don't need to match (and extract as DVs)

##' @param reference_doc_split
##'
##' @return
##' @author Shir Dekel
##' @export
clean_and_filter_reference_doc_split <- function(reference_doc_split) {

  reference_doc_split_cleaned_and_filtered <-
    reference_doc_split %>%
    mutate(
      across(block, ~ .x %>%
               make_clean_names() %>%
               recode("demographics" = "business"))
    ) %>%
    filter(str_detect(
      block,
      "low|high|rating|business"
    ))

  return(reference_doc_split_cleaned_and_filtered)
}
