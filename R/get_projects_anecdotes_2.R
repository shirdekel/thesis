##' @title Get anecdotes 2 projects

##' @return
##' @author Shir Dekel
##' @export
get_projects_anecdotes_2 <- function() {

  ## Labels ----
  labels <- list(
    align = c("lowA", "highA"),
    anecdote = c(
      "anecdote",
      "statistics",
      "combined",
      "enhanced"
    ),
    proj_type = c("anecdote", "target"),
    follow_up = c("rating", "justify"),
    follow_up_type = c("similarity", "relevance_specific", "relevance_general"),
    projects = c("projectA", "projectB")
  )

  # Main task ----
  info <- list(
    c(
      "Oil extracted",
      "Time the machinery lasts before requiring maintenance",
      "Probability of finding oil",
      "Type of well"
    ),
    c(
      "Microchips produced",
      "Usable semiconductor yield after testing",
      "Compatible PCs in the market",
      "Type of integrated circuit"
    )
  ) %>%
    set_names("oil", "microchip")

  val_high <- list(
    c(
      2000,
      7,
      80
    ),
    c(
      4000,
      60,
      75
    )
  ) %>%
    set_names(labels$proj_type)
  unit <- list(
    c(
      "L an hour",
      " years",
      "%",
      ""
    ),
    c(
      " an hour",
      "%" %>%
        rep(2),
      ""
    )
  ) %>%
    set_names(labels$proj_type)
  val <- round(val_high$anecdote * 0.7) %>%
    list(val_high$anecdote)

  val_trans <- val %>%
    map(~ set_names(.x, "rate", "maintenance", "prob")) %>%
    transpose() %>%
    map(unlist)

  type <- list(
    c("offshore", "onshore"),
    c("digital", "onshore")
  ) %>%
    set_names(labels$proj_type)

  detail_unit <- list(unit$anecdote) %>%
    rep(2) %>%
    append(list(
      unit$target,
      unit$anecdote
    ))

  detail_val <- val %>%
    append(list(
      val_high$target,
      round(val_high$anecdote * 1.1)
    )) %>%
    map2(type %>%
      unlist(), ~ c(.x, .y)) %>%
    map2(detail_unit, ~ .x %>%
      str_c(.y))

  detail_info <- list(info$oil) %>%
    rep(2) %>%
    append(list(
      info$microchip,
      info$oil
    )) %>%
    map(~ .x %>% str_c(": ")) %>%
    map2(detail_val, ~ .x %>%
      str_c(.y))

  details <- detail_info %>%
    map_chr(~ htmltools::tags$ul(.x %>%
      map(htmltools::tags$li)) %>%
      as.character() %>%
      str_remove_all("\n"))


  x <-
    tibble(
      reason = get_reason() %>% c("", .),
      cutoff = get_cutoff(val_trans) %>% c("", .),
      type = c("", "offshore", "onshore"),
      val_trans = val %>%
        map(~ set_names(.x, "rate", "maintenance", "prob")) %>%
        transpose() %>%
        map(unlist) %>%
        transpose() %>% c("", .),
      project_type = c(
        "no_anecdote",
        "anecdote_lowA",
        "anecdote_highA"
      ),
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
      integration_target = c("horizontal", "vertical") %>%list,
      structure_target = c("decentralised", "centralised") %>%list,
      integration = c("", "horizontal", "vertical"),
      structure = c("", "decentralised", "centralised"),
      predicted_project_features = details[1:2] %>% c("", .),
      predicted_project_features_target = details[3:4] %>% list(),
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


  ## x$project_raw[[1]]

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
