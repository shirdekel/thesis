##' @title Get descriptives
##' @param data
##' @param iv
##' @return
##' @author Shir Dekel
##' @export
get_descriptives <- function(data, iv) {
  diffused_iv <-
    diffuse_non_na(iv)

  allocation <-
    data %>%
    nest_by(id, !!!diffused_iv) %>%
    ungroup() %>%
    count(!!!diffused_iv) %>%
    adorn_totals("row")

  total_apa <-
    allocation %>%
    pull(n) %>%
    last() %>%
    printnum(numerals = FALSE, capitalize = TRUE)

  sex <-
    data %>%
    nest_by(id, sex) %>%
    ungroup() %>%
    count(sex)

  sex_female <-
    sex %>%
    filter(sex == "female") %>%
    pull(n)

  numerical_names <-
    c("age", "business_exp", "business_edu", "total_time")

  numerical <-
    numerical_names %>%
    map(
      ~ data %>%
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

  apa <-
    str_c(
      total_apa,
      str_c(
        "(",
        sex_female
      ),
      "female) people were recruited from the online recruitment platform Prolific. Participants were compensated at a rate of £5 an hour. The average age was",
      str_c(
        numerical$age,
        "."
      ),
      "Participants reported an average of",
      numerical$business_exp,
      "years of work in a business setting, and an average of",
      numerical$business_edu,
      "years of business education. The mean completion time was",
      numerical$total_time,
      "minutes.",
      sep = " "
    )

  descriptives <-
    lst(
      allocation,
      total_apa,
      sex_female,
      numerical,
      apa
    )

  return(descriptives)
}
