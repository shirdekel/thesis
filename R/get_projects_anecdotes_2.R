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

  ## Anecdote ----
  reason <- list(
    structure = c(
      "communication across relevant business units was",
      "key operational decisions were"
    ),
    integration = c(
      "other well sites due to a drain on the collective resources",
      "retail sites due to miscalculations of petrol supply"
    ),
    type = c(
      "difficult to construct",
      "susceptible to crude oil price changes"
    )
  )

  cutoff <- val_trans %>%
    map2(c(1.5 %>% rep(2), 1.2), ~ round(.x * .y))

  anecdote_info <- projects_all %>%
    filter(str_detect(project_type, "anecdote"))
  analysis <- anecdote_info %>%
    with(str_c(
      `Business name`,
      " struggled to establish itself in the regional market because of what scientists now know is a hydrocarbon shortage in the ",
      Location %>%
        str_replace(", (.*)", ""),
      " area. A ",
      Structure,
      " organisational structure meant that ",
      reason$structure,
      " delayed with what needed to be a timely process. Being ",
      Integration,
      "ly integrated meant that these delays caused losses at the ",
      reason$integration,
      ". To make up for this, a post hoc analysis concluded that oil was needed to be extracted at a rate of ",
      cutoff$rate,
      "L an hour and sites have at least a ",
      cutoff$prob,
      "% probability of finding oil before management approved the project. Further, machinery needed to have thought to last at least ",
      cutoff$maintenance,
      " years before requiring maintenance, because maintenance costs further offset the initial investment after the ",
      val_trans$maintenance,
      " years of development. Further, the well was quite ",
      reason$type,
      " due to it being an ",
      type$anecdote,
      " well, and so added additional financial setbacks over the course of the project."
    ))

  anecdote_raw <- labels$align %>%
    map(~ anecdote_info %>%
      filter(project_type %>% str_detect(.x))) %>%
    map_chr(~ htmltools::withTags({
      ul(
        li(
          "Business details:",
          .x %>%
            with(htmltools::withTags({
              ul(
                li("Business name: ", `Business name`),
                li("Location: ", Location),
                li("Integration: ", Integration)
              )
            }))
        ),
        li(
          "Investment:",
          .x$Investment
        ),
        li(
          "Predicted project features:",
          htmltools::HTML(.x$`Predicted project features`)
        )
      )
    }) %>%
      as.character() %>%
      str_remove_all("\n"))

  x <-
      tibble(
          analysis = c(
              "",
              analysis
          ),
          anecdote_raw = c(
              "",
              anecdote_raw
          ),
          projects = projects[1:3]
      ) %>%
      rowwise() %>%
      mutate(
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
