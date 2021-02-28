##' @title Get follow-up question HTML
##'
##' Identify similarity and relevance ratings
##' @param data
##' @param button_continue
##' @return
##' @author Shir Dekel
##' @export
get_follow_up_html <- function(data, button_continue, anecdote_within, valence,
                               similarity) {
  target <-
    data %>%
    filter(project_type == "target")

  scale_max <- 6

  scale <-
    str_c(
      "On a scale of 1 to",
      scale_max,
      sep = " "
    )

  question_type <- c(
    "rating" %>%
      rep(3),
    "text"
  )

  question_keyword <- c(
    "similarity",
    "relevance" %>%
      rep(2),
    "justify"
  )

  similarity_rating <-
    str_c(
      "how similar do you think the",
      target$business_name_anecdote,
      "project (the case study) is to the",
      target$business_name_target,
      "project (the",
      target$type_anecdote,
      "target project)?",
      sep = " "
    )

  relevance_specific_rating <-
    str_c(
      "how relevant do you think the information about the",
      target$business_name_anecdote,
      "project is for determining whether to invest in the",
      target$business_name_target,
      "project?",
      sep = " "
    )

  relevance_general_rating <-
    str_c(
      "how relevant do you think the information about the",
      target$business_name_anecdote,
      "project is for determining whether to invest in",
      tags$i("any") %>%
        as.character(),
      target$type_anecdote,
      "project?",
      sep = " "
    )

  tibble(
    question_type,
    scale,
    question_keyword,
    scale_explanation = str_c(
      "A choice of 1 indicates low",
      str_c(
        question_keyword,
        ", and"
      ),
      scale_max,
      "indicates high",
      question_keyword,
      sep = " "
    ),
    question_raw = c(
      similarity_rating,
      relevance_specific_rating,
      relevance_general_rating,
      ""
    ),
    question = str_c(
      scale,
      ", ",
      question_raw,
      " ",
      scale_explanation,
      "."
    ),
    question_name = c("similarity-rating", "relevance-specific-rating",
                      "relevance-general-rating", "justify"),
    follow_up_id = str_c(
      "follow-up",
      anecdote_within,
      valence,
      similarity,
      question_type,
      question_name,
      sep = "_"
    )
  ) %>%
    rowwise() %>%
    mutate(
      html = case_when(
        question_type == "rating" ~ get_survey_number(
          label_text = question %>%
            HTML(),
          name = follow_up_id,
          min = 1,
          max = 6
        ) %>%
          list(),
        question_type == "text" ~ get_follow_up_textarea(follow_up_id) %>%
          list()
      )
    ) %>%
    pull(html) %>%
    tags$fieldset(
      button_continue,
      tags$legend("Follow-up")
    )
}
