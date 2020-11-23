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

  projects_all <- tibble(
    project_type = c(
      "anecdote_lowA",
      "anecdote_highA",
      "target" %>%
        rep(each = 2)
    ),
    `Business name` = c(
      "Refinera" %>%
        rep(2),
      "Microxy",
      "Enfuel"
    ),
    Investment = c(
      "oil well" %>%
        rep(2),
      "microchip", "oil well"
    ),
    Location = c(
      "Zhuhai, China", "New Mexico, USA",
      "Manchester, UK", "Texas, USA"
    ),
    Integration = c("horizontal", "vertical") %>%
      rep(2),
    Structure = c("decentralised", "centralised") %>%
      rep(2),
    `Predicted project features` = details
  )

  ## Target projects ----
  projects_anecdote <- projects_all %>%
    filter(project_type == "target") %>%
    select(-project_type) %>%
    mutate(project_label = c("Project B", "Project A"))

  projects_stats <- projects_anecdote %>%
    mutate(
      `Overall reliability rating (%)` = c(87, 95) %>%
        as.character(),
      `NPV ($)` = c(100, 900) %>%
        as.character()
    )

  projects <- projects_anecdote %>%
    list() %>%
    append(projects_stats %>%
      list() %>%
      rep(3)) %>%
    map(~ .x %>%
      pivot_longer(
        cols = -project_label,
        names_to = "Relevant information"
      ) %>%
      pivot_wider(
        names_from = project_label,
        values_from = value
      ) %>%
      select(`Relevant information`, `Project A`, `Project B`))

  ## Preamble ----
  preamble <- list(
    main_task = "Allocate your budget between the following two projects using percentage values (the two values should sum to 100):",
    follow_up = "Please answer the following:"
  )

  ## Allocation ----
  allocation <- "allocation" %>%
    str_c("q", labels$projects, sep = "_") %>%
    set_names(labels$projects) %>%
    shiR::number_form(
      text = c("Project A", "Project B") %>%
        str_c(" allocation: "),
      min = 0,
      max = 100
    ) %>%
    str_c("%") %>%
    shiR::htmlp() %>%
    str_c(collapse = "")

  x <-
    tibble(
      reason = get_reason() %>% c("", .),
      cutoff = get_cutoff(val_trans) %>% c("", .),
      type = c("", "offshore", "onshore"),
      projects = projects[1:3],
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
      business_name = c(
        "",
        "Refinera" %>%
          rep(2)
      ),
      investment = c(
        "",
        "oil well" %>%
          rep(2)
      ),
      location = c(
        "",
        "Zhuhai, China", "New Mexico, USA"
      ),
      integration = c("", "horizontal", "vertical"),
      structure = c("", "decentralised", "centralised"),
      predicted_project_features = details[1:2] %>% c("", .),
      anecdote_presence = c(FALSE, TRUE, TRUE)
    ) %>%
    rowwise() %>%
    mutate(
      analysis = get_analysis(
        anecdote_presence, business_name, location, structure,
        reason, integration, cutoff, val_trans, type
      ),
      anecdote_raw = get_anecdote_raw(anecdote_presence, business_name, location,
                             integration, investment,
                             predicted_project_features) ,
      projects = projects %>%
        htmlTable::htmlTable(rnames = F) %>%
        str_c(
          preamble$main_task %>%
            p() %>%
            as.character(),
          .,
          allocation
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

  ## x$html[[2]]

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
