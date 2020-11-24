##' @title Get anecdotes 2 projects

##' @return
##' @author Shir Dekel
##' @export
get_projects_anecdotes_2 <- function() {
  x <-
    tibble(
      info = list(
        c(
          "Oil extracted",
          "Time the machinery lasts before requiring maintenance",
          "Probability of finding oil",
          "Type of well"
        )
      ) %>%
        rep(2) %>%
        c("", .),
      info_target = list(
        c(
          "Microchips produced",
          "Usable semiconductor yield after testing",
          "Compatible PCs in the market",
          "Type of integrated circuit"
        ),
        c(
          "Oil extracted",
          "Time the machinery lasts before requiring maintenance",
          "Probability of finding oil",
          "Type of well"
        )
      ) %>%
        list(),
      val = c(
        2000,
        7,
        80
      ) %>%
        get_val(0.7) %>% c("", .),
      reason = get_reason() %>% c("", .),
      type = c("", "offshore", "onshore"),
      type_target = c("digital", "onshore") %>%
        list(),
      multipliers = c("", list(c(1.5 %>% rep(2), 1.2)) %>%
        rep(2)),
      project_type = c(
        "no_anecdote",
        "anecdote_lowA",
        "anecdote_highA"
      ),
      val_target = c(
        4000,
        60,
        75
      ) %>%
        get_val(1.1) %>% list(),
      unit = c(
        "L an hour",
        " years",
        "%",
        ""
      ) %>%
        list() %>%
        rep(2) %>%
        c("", .),
      unit_target = list(
        c(
          " an hour",
          "%" %>%
            rep(2),
          ""
        ),
        c(
          "L an hour",
          " years",
          "%",
          ""
        )
      ) %>%
        list(),
      business_name_target = c(
        "Microxy",
        "Enfuel"
      ) %>%
        list(),
      business_name = c(
        "",
        "Refinera" %>%
          rep(2)
      ),
      investment_target = c(
        "microchip", "oil well"
      ) %>%
        list(),
      investment = c(
        "",
        "oil well" %>%
          rep(2)
      ),
      location_target = c(
        "Manchester, UK", "Texas, USA"
      ) %>%
        list(),
      location = c(
        "",
        "Zhuhai, China", "New Mexico, USA"
      ),
      integration_target = c("horizontal", "vertical") %>% list(),
      structure_target = c("decentralised", "centralised") %>% list(),
      integration = c("", "horizontal", "vertical"),
      structure = c("", "decentralised", "centralised"),
      anecdote_presence = c(FALSE, TRUE, TRUE),
      reliability = c(87, 95) %>%
        as.character() %>%
        list(NA, NA),
      npv = c(100, 900) %>%
        as.character() %>%
        list(NA, NA)
    ) %>%
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

  projects <-
    trial_generic(
      "survey-html-form3",
      html = insert_variable("allocation_table"),
      data = insert_property(stage = "project_allocation")
    ) %>%
    build_timeline() %>%
    set_variables(
      allocation_table = x$html
    )

  return(projects)
}
