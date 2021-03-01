##' @title Get dv match components
##'
##' Get table that ends up being `dv_match`, with the critical components `dv_pattern` and `dv_replacement`, and the elements that constructed them

##' @param reference_doc_split_cleaned_and_filtered
##'
##' @param dv_match_pattern
##'
##' @return
##' @author Shir Dekel
##' @export
get_dv_match_components <- function(reference_doc_split_cleaned_and_filtered) {

  product_regex <-
    get_product_regex()

  dv_match_pattern <-
    get_dv_match_pattern()

  dv_match_regex <-
    get_dv_match_regex(dv_match_pattern)

  dv_match_components <-
    reference_doc_split_cleaned_and_filtered %>%
    rowwise() %>%
    mutate(
      dv_id_match = get_dv_id_match(content, dv_match_regex),
      dv_id = get_dv_id(dv_id_match),
      phase = get_phase(block),
      product = get_product(content, product_regex),
      dv_replacement_suffix = case_when(
        str_detect(block, "low|high") ~ list(1:5)
      ),
      dv_pattern_suffix = case_when(
        str_detect(block, "rating") ~ list(1),
        str_detect(block, "low|high") ~ list(dv_replacement_suffix)
      )
    ) %>%
    unnest(c(dv_id_match, dv_id)) %>%
    unnest(c(product, dv_replacement_suffix, dv_pattern_suffix), keep_empty = TRUE) %>%
    rowwise() %>%
    mutate(
      dv_pattern_suffix = case_when(
        last(dv_id_match) == "undergraduate" ~ list(list(character(0), "7_text")),
        last(dv_id_match) == "experience" ~ list(list(character(0))),
        TRUE ~ list(list(dv_pattern_suffix))
      ),
      dv_replacement_suffix = case_when(
        last(dv_id_match) == "undergraduate" ~ list(list(NA, "other")),
        TRUE ~ list(list(dv_replacement_suffix))
      )
    ) %>%
    unnest(c(dv_pattern_suffix, dv_replacement_suffix)) %>%
    rowwise() %>%
    mutate(
      across(c(phase, product, dv_replacement_suffix), ~ .x %>%
               replace_na(list(character(0)))),
      dv_id_name = get_dv_id_name(dv_id_match)
    )

  return(dv_match_components)

}
