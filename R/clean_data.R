##' @title clean data

##' @param data_raw
##'
##' @return
##' @author Shir Dekel
##' @export
clean_data <- function(data_raw) {

  data_raw_na_drop <- data_raw %>%
    drop_na(responses)

  names_to <- c("project", "outcome_positive", "outcome_dif", "probability_positive")
  values_to <- "choice"

  extract_responses <- function(data) {
    data %>%
      pivot_longer(cols = -(file_id:question_order),
                   names_to = names_to,
                   names_sep = "_",
                   values_to = values_to)
  }

  data_joint <- data_raw_na_drop %>%
    filter(presentation == "joint") %>%
    rowwise()  %>%
    mutate(responses %>%
             map_dfc(fromJSON)) %>%
    extract_responses() %>%
    nest_by(file_id, question_order) %>%
    mutate(question_order = question_order %>%
             map(fromJSON)) %>%
    unnest(c(data, question_order)) %>%
    mutate(question_order = question_order + 1) %>%
    ungroup()

  get_separate_responses <- function(data) {
    data %>%
      pull(responses) %>%
      map_dfc(fromJSON) %>%
      pivot_longer(cols = everything(),
                   names_to = names_to,
                   names_sep = "_",
                   values_to = values_to)
  }

  data_separate <- data_raw_na_drop %>%
    filter(presentation == "separate") %>%
    group_by(file_id) %>%
    mutate(question_order = 1:10) %>%
    nest_by() %>%
    mutate(responses = get_separate_responses(data) %>%
             list()) %>%
    unnest(c(data, responses))

  data <- data_joint %>%
    bind_rows(data_separate) %>%
    nest_by(file_id) %>%
    mutate(total_time = shiR::gettime(data)) %>%
    unnest(data) %>%
    ungroup() %>%
    separate(file_id, into = c(NA, "datetime", "id"), sep = "_") %>%
    mutate(choice = recode(choice, "Yes" = 1, "No" = 0),
           datetime = datetime %>%
             as_datetime(tz = "Australia/Sydney")) %>%
    select(-c(rt:internal_node_id, responses)) %>%
    select(-where(~.x %>%
                    is.na() %>%
                    all()))

  return(data)

}
