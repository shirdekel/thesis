##' @title Mutate anecdotes 2 parameters

##' @return
##' @author Shir Dekel
##' @export
##' @param parameters_anecdotes_2
mutate_parameters_anecdotes_2 <- function(parameters_anecdotes_2) {
  parameters_anecdotes_2 %>%
    rowwise() %>%
    mutate(
      detail_val = str_c(info, ": ", c(val, type), unit) %>% list(),
      detail_val_target = list(info_target, val_target, type_target, unit_target) %>%
        pmap(
          function(info, val, type, unit) str_c(info, ": ", c(val, type), unit)
        ) %>% list(),
      predicted_project_features = detail_val %>%
        list() %>%
        get_html_list(),
      predicted_project_features_target = detail_val_target %>%
        list() %>%
        map(get_html_list),
      val_trans = get_val_trans(anecdote_presence, val) %>% list(),
      cutoff = get_cutoff(anecdote_presence, val_trans, multipliers) %>% list(),
      project_raw = get_project_raw(
        business_name_target,
        investment_target,
        location_target,
        integration_target,
        structure_target,
        predicted_project_features_target,
        reliability,
        npv
      ) %>%
        list(),
      analysis = get_analysis(
        anecdote_presence, business_name, location, structure,
        reason, integration, cutoff, val_trans, type
      ),
      anecdote_raw = get_anecdote_raw(
        anecdote_presence, business_name,
        location, integration, investment,
        predicted_project_features
      ),
      projects = project_raw %>%
        htmlTable::htmlTable(rnames = F) %>%
        str_c(
          "Allocate your budget between the following two projects using percentage values (the two values should sum to 100):" %>%
            p() %>%
            as.character(),
          .,
          get_allocation()
        ) %>%
        HTML() %>%
        tags$fieldset(tags$legend("Target projects")) %>%
        as.character(),
      anecdote_full = get_anecdote_full(analysis, anecdote_raw),
      html = div(
        HTML(anecdote_full),
        HTML(projects)
      ) %>%
        as.character()
    )
}
