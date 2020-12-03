##' @title Get descriptives
##' @param data_clean
##' @param iv
##' @return
##' @author Shir Dekel
##' @export
get_descriptives <- function(data_clean, iv) {
  condition_allocation_table <-
    data_clean %>%
    get_condition_allocation_table(iv)

  total_apa <-
    condition_allocation_table %>%
    pull(n) %>%
    last() %>%
    printnum(numerals = FALSE, capitalize = TRUE)

  sex <-
    data_clean %>%
    nest_by(id, sex) %>%
    ungroup() %>%
    count(sex)

  sex_female <-
    sex %>%
    mutate(
      across(sex, str_to_lower)
    ) %>%
    filter(sex == "female") %>%
    pull(n)

  numerical_names_raw <-
    c("age", "business_exp", "business_edu", "total_time")

  numerical_names <-
    data_clean %>%
    names() %>%
    extract_from(numerical_names_raw)

  numerical <-
    numerical_names %>%
    map(
      ~ data_clean %>%
        summarise(
          across(
            all_of(.x),
            lst(mean, sd, min, max),
            .names = "{fn}"
          )
        ) %>%
        mutate(across(everything(), ~ .x %>%
          printnum(drop0trailing = TRUE)))
    ) %>%
    set_names(numerical_names) %>%
    map(
      ~ str_c(
        .x$mean,
        " (*SD* = ",
        .x$sd,
        ", *min* = ",
        .x$min,
        ", *max* = ",
        .x$max,
        ")"
      )
    )

  prolific_sample <-
    data_clean %>%
    names() %>%
    str_detect("prolific") %>%
    any()

  if (prolific_sample) {
    sample_description <-
      "the online recruitment platform Prolific. Participants were compensated at a rate of £5 an hour."
  } else {
    sample_description <-
      "a Psychology undergraduate sample at The University of Sydney. Participants were compensated with course credit."
  }

  apa <-
    str_c(
      total_apa,
      str_c(
        "(",
        sex_female
      ),
      "female) people were recruited from",
      sample_description,
      "The average age was",
      str_c(
        numerical$age,
        "."
      ),
      sep = " "
    )

  if (all(numerical_names_raw %in% names(numerical))) {
    apa <-
      str_c(
        apa,
        "Participants reported an average of",
        numerical$business_exp,
        "years of work in a business setting, and an average of",
        numerical$business_edu,
        "years of business education. The mean completion time was",
        numerical$total_time,
        "minutes.",
        sep = " "
      )
  }

  descriptives <-
    lst(
      condition_allocation_table,
      total_apa,
      sex_female,
      numerical,
      apa
    )

  return(descriptives)
}
