##' @title clean data

##' @param data_raw
##'
##' @return
##' @author Shir Dekel
##' @export
clean_data <- function(data_raw) {

  data_raw_prep <- data_raw %>%
    drop_na(experiment, stage) %>% # Filter out old data, but only taking rows with experiment and stage values
    rowwise() %>%
    mutate(across(c(experiment, sample, stage), . %>%
                    fromJSON())) %>%
    filter(experiment == "aggregation_exp2")

  data_other <- data_raw_prep %>%
    drop_na(responses) %>%
    filter(stage != "project_choice") %>%
    nest_by(subject) %>%
    mutate(other = data %>%
             pull(responses) %>%
             map_dfc(fromJSON) %>%
             list()) %>%
    unnest(other) %>%
    ungroup() %>%
    mutate(across(c(age,
                    business_edu,
                    business_exp,
                    project_number,
                    portfolio_number,
                    employees,
                    revenue,
                    budget),
             as.numeric)) %>%
    select(-data)

  data_portfolio_binary <- data_raw_prep %>%
    filter(stage == "portfolio_binary") %>%
    mutate(portfolio_binary = button_pressed %>%
             recode("0" = 1, # In the experiment, 0 corresponds to investing in all, so this reverses the coding to be more intuitive
                    "1" = 0)) %>%
    select(subject, portfolio_binary)

  names_to <- c("project", "outcome_positive", "outcome_dif", "probability_positive")
  values_to <- "choice"

  data_separate <- data_raw_prep %>%
    filter(stage == "project_choice", presentation == "separate") %>%
    group_by(subject) %>%
    mutate(project_order = 1:10) %>%
    rowwise() %>%
    mutate(responses %>%
             map_dfc(fromJSON) %>% # Doesn't work as a single step without pivot_longer()
             pivot_longer(cols = everything(),
                          names_to = names_to,
                          names_sep = "_",
                          values_to = values_to)
    )

  data_joint <- data_raw_prep %>%
    filter(stage == "project_choice", presentation == "joint") %>%
    rowwise()  %>%
    mutate(responses %>%
             map_dfc(fromJSON)) %>%
    pivot_longer(cols = -(time_elapsed:stage),
                 names_to = names_to,
                 names_sep = "_",
                 values_to = values_to) %>%
    nest_by(subject, question_order) %>%
    mutate(project_order = question_order %>%
             map(fromJSON)) %>%
    unnest(c(data, project_order)) %>%
    mutate(project_order = project_order + 1) %>%
    ungroup()

  data <- data_joint %>%
    bind_rows(data_separate) %>%
    group_by(subject) %>%
    mutate(choice = recode(choice, "Yes" = 1, "No" = 0),
           datetime = dateCreated %>%
             dmy_hms(tz = "Australia/Sydney"),
           total_time = max(time_elapsed)/60000, # Milliseconds to minutes
           proportion = sum(choice)/10,
           across(c(distribution, awareness, presentation), as.factor)) %>%
    ungroup() %>%
    select(subject, experiment:presentation, stage:proportion) %>%
    inner_join(data_other, by = "subject") %>%
    inner_join(data_portfolio_binary, by = "subject") %>%
    filter(!str_detect(prolific, "test1234"))

  get_prolific_id(data)

  return(data)

}
