##' @title Get combined anecdote condition analysis
##' Anecdotal bias moderated by similarity
##'   Negative valence
##'     Statistics only > combined high similarity

##'     Combined: Low similarity > high similarity

##'     Statistics only = combined low similarity

##'   Positive valence
##'     Statistics only > combined low similarity

##'     Combined: High similarity > low similarity

##'     Statistics only > combined high similarity
##' @return
##' @author Shir Dekel
##' @export
##' @param data_clean
get_combined <- function(data_clean) {
  c(
    "negative",
    "positive"
  ) %>%
    map(
      ~ data_clean %>%
        nest_by(
          id,
          anecdote_between,
          similarity,
          valence,
          allocation,
          anecdote_within
        ) %>%
        filter(
          valence %in% c("negative", "NA"),
          anecdote_between == "combined"
        ) %>%
        mutate(
          within = case_when(
            anecdote_within == "anecdote" ~ str_c("similarity", similarity,
              sep = "_"
            ),
            TRUE ~ anecdote_within
          )
        ) %>%
        aov_4(
          allocation ~ within +
            (within | id),
          data = .
        ) %>%
        emmeans("within") %>%
        pairs(adjust = "none") %>%
        apa_print() %>%
        pluck("full_result")
    ) %>%
    set_names("valence_negative", "valence_positive")
}
