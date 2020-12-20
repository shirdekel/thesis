##' @title Get anecdotes 2 parameters

##' @return
##' @author Shir Dekel
##' @export
get_parameters_anecdotes_2 <- function() {
  conditions_anecdote <-
    expand_grid(
      anecdote_between = c("anecdote_only", "combined"),
      anecdote_within = "anecdote",
      alignment = c("low", "high"),
      valence = c("negative", "positive"),
      feature_type = c("target", "anecdote"),
      project_type = c("target", "comparison"),
    )

  conditions_statistics_only <-
    expand_grid(
      anecdote_between = c("anecdote_only", "combined"),
      feature_type = c("target", "anecdote"),
      project_type = c("target", "comparison")
    ) %>%
    mutate(
      anecdote_within = "statistics_only",
      alignment = "NA",
      valence = "NA",
    )

  conditions <-
    conditions_anecdote %>%
    full_join(
      conditions_statistics_only,
      by = c(
        "anecdote_between", "anecdote_within", "alignment", "valence",
        "feature_type", "project_type"
      )
    )

  conditions %>%
    nest_by(
      anecdote_between,
      anecdote_within,
      alignment,
      valence,
      feature_type
    ) %>%
    nest_by(
      anecdote_between,
      anecdote_within,
      alignment,
      valence,
    ) %>%
    nest_by(
      anecdote_between
    ) %>%
    ## Mutate project variation here so that each between subjects condition is
    ## identical and each gets the set of five counterbalanced sequences. Do the
    ## same with anecdote variation.
    mutate(
      project_variation = seq_len(5) %>%
        as.numeric() %>%
        latin_list() %>%
        list(),
      anecdote_variation = seq_len(2) %>%
        as.numeric() %>%
        latin_list() %>%
        list(),
      .before = 1
    ) %>%
    mutate(
      multiplier = get_multiplier() %>%
        list(),
      success = get_success() %>%
        list(),
      reason_structure = get_reason_structure() %>%
        list()
    ) %>%
    ## Expand each between-subjects condition. Also, unnest project variation so
    ## that each within-subjects combination (of alignment and valence) gets a
    ## different project variation sequence.
    unnest(
      c(
        data,
        project_variation,
        multiplier,
        success,
        reason_structure
      )
    ) %>%
    ## Mutate business name, type, and location here so that each of the five
    ## sets (of four) business names and types are associated with a project
    ## variation number.
    mutate(
      business_name = get_business_name_anecdotes_2() %>%
        list(),
      type = get_project_type_anecdotes_2() %>%
        list(),
      location = case_when(
        alignment == "high" ~ get_location_anecdotes_2() %>%
          .[["high"]] %>%
          list(),
        # Doesn't matter which anecdote locations NA gets, because they don't
        # see an anecdote.
        TRUE ~ get_location_anecdotes_2() %>%
          .[["low"]] %>%
          list()
      ),
      integration = get_integration() %>%
        list(),
      structure = get_structure() %>%
        list(),
      feature = get_feature_anecdotes_2() %>%
        list(),
      value_numeric = get_project_value_base() %>%
        list(),
      value_string = case_when(
        alignment == "high" ~ get_value_string() %>%
          pluck("high") %>%
          list(),
        TRUE ~ get_value_string() %>%
          pluck("low") %>%
          list()
      ),
      unit = get_unit_anecdotes_2() %>%
        list(),
      reliability = get_reliability_anecdotes_2() %>%
        list(),
      npv = get_npv_anecdotes_2() %>%
        list(),
      reason = get_reason() %>%
        list(),
      reason_location = case_when(
        valence == "negative" ~ get_reason_location() %>%
          pluck("negative") %>%
          list(),
        TRUE ~ get_reason_location() %>%
          pluck("positive") %>%
          list()
      ),
      reason_integration = case_when(
        valence == "negative" ~ get_reason_integration() %>%
          pluck("negative") %>%
          list(),
        TRUE ~ get_reason_integration() %>%
          pluck("positive") %>%
          list()
      )
    ) %>%
    ## Expand each within-subjects condition alongside anecdote variation to
    ## show feature type. This give each feature type condition (target or
    ## anecdote) two anecdote variation combinations (1,2 or 2,1). Doing this
    ## before any further business name/project variation unnesting guarantees
    ## that each combination of conditions gets the same combination of business
    ## names. Location needs to be unnested here so that each feature type
    ## condition gets the relevant location (i.e., location_anecdote with
    ## anecdote).
    unnest(
      c(
        data,
        anecdote_variation,
        location
      )
    ) %>%
    ## Expand sets of five (project variations)
    ## Expand project variation with
    ## business name, type, and location, etc. to align each set of five project
    ## variations with a business name set (of two) and the relevant type and
    ## location.
    unnest(
      c(
        project_variation,
        business_name,
        type,
        location,
        feature,
        value_numeric,
        value_string,
        multiplier,
        unit,
        reason,
        reason_location,
        reason_integration,
        reliability,
        npv
      )
    ) %>%
    ## Make sure positive valence conditions have a low statistics and negative
    ## valence conditions have high statistics.
    mutate(
      reliability = case_when(
        valence == "positive" ~ reliability %>%
          map(rev),
        TRUE ~ reliability
      ),
      npv = case_when(
        valence == "positive" ~ npv %>%
          map(rev),
        TRUE ~ npv
      ),
      structure = case_when(
        alignment == "high" &
          feature_type == "anecdote"
        ~ structure %>%
          map(rev),
        TRUE ~ structure
      ),
      integration = case_when(
        alignment == "high" &
          feature_type == "anecdote"
        ~ integration %>%
          map(rev),
        TRUE ~ integration
      ),
      reason_integration = case_when(
        alignment == "high" &
          feature_type == "anecdote"
        ~ reason_integration %>%
          map(rev),
        TRUE ~ reason_integration
      )
    ) %>%
    ## Expand project type conditions with business name, type, location, and
    ## feature so that each project type condition is associated with one of two
    ## business names and the relevant type, location, and feature set.
    ## Integration and structure are first unnested here and not in the previous
    ## unnesting because they don't have five variations.
    unnest(
      c(
        data,
        business_name,
        type,
        location,
        integration,
        structure,
        reason_structure,
        feature,
        value_numeric,
        value_string,
        multiplier,
        unit,
        reason,
        reason_location,
        reason_integration,
        reliability,
        npv
      )
    ) %>%
    ## Expand for project pairs
    ## Expand remaining components so that each project type condition gets two
    ## individual projects, and each one is associated with an anecdote
    ## variation condition. Feature doesn't need another unnesting because we
    ## use the same one for both target and comparison.
    ## select(feature_type, project_type, value_numeric, multiplier)
    unnest(
      c(
        business_name,
        anecdote_variation,
        integration,
        structure,
        reason_structure,
        value_string,
        multiplier,
        reason,
        reason_integration,
        location
      )
    ) %>%
    ## arrange(
    ##     project_variation,
    ##     anecdote_variation,
    ##     anecdote_between,
    ##     anecdote_within,
    ##     alignment,
    ##     valence,
    ##     feature_type,
    ##     project_type,
    ## ) %>%
    ##     filter(
    ##         project_variation == 1,
    ##         anecdote_variation == 1,
    ##         anecdote_between == "combined",
    ##         alignment == "low",
    ##         valence == "negative",
    ##     ) %>%
    ##     select(feature_type, project_type, valence, type, integration,
    ##            reason_integration, ) %>%
    ## unnest(reason_integration)
    rowwise() %>%
    mutate(
      value = get_value(
        value_numeric,
        multiplier,
        value_string
      ) %>%
        list(),
      predicted_features = get_predicted_features(
        value,
        feature,
        unit
      ),
      cutoff = get_cutoff(value_numeric) %>%
        list(),
      analysis = get_analysis(
        business_name,
        success,
        reason_location,
        location,
        structure,
        reason_structure,
        integration,
        reason_integration,
        value_string,
        value_numeric,
        reason,
        cutoff
      ),
      input_id = str_c(
        feature %>%
          str_replace_all(" ", "-"),
        value,
        sep = "_",
        collapse = "_"
      ) %>%
        str_c(
          anecdote_within,
          alignment,
          valence,
          business_name %>%
            str_replace_all(" ", "-"),
          type %>%
            str_replace_all(" ", "-"),
          npv,
          reliability,
          .,
          project_type,
          sep = "_"
        ) %>%
        get_survey_number(
          "Allocation: ",
          .,
          class = "allocation"
        ) %>%
        as.character()
    ) %>%
    # needs to be removed because otherwise there are NAs after pivoting
    select(-c(
      multiplier,
      value,
      feature,
      reason,
      reason_structure,
      reason_integration
    )) %>%
    pivot_longer(
      c(
        business_name,
        type,
        location,
        integration,
        structure,
        predicted_features,
        value_string,
        analysis,
        input_id
      ),
      names_to = "names",
      values_to = "values"
    ) %>%
    pivot_wider(
      names_from = c(names, feature_type),
      values_from = values,
    ) %>%
    nest_by(
      project_variation,
      anecdote_variation,
      anecdote_between,
      anecdote_within,
      alignment,
      valence
    ) %>%
    mutate(
      target = case_when(
        anecdote_within == "anecdote" &
          anecdote_between == "anecdote_only" ~
        data %>%
          select(
            business_name_target,
            type_target,
            location_target,
            integration_target,
            structure_target,
            predicted_features_target,
            project_type,
            input_id_target
          ) %>%
          get_target() %>%
          list(),
        TRUE ~
        data %>%
          select(
            business_name_target,
            type_target,
            location_target,
            integration_target,
            structure_target,
            predicted_features_target,
            project_type,
            reliability,
            npv,
            input_id_target
          ) %>%
          get_target() %>%
          list(),
      ),
      anecdote = get_anecdote(data) %>%
        list()
    ) %>%
    unnest(data) %>%
    rowwise() %>%
    mutate(
      display = case_when(
        anecdote_within == "statistics_only" ~
        div(target) %>%
          as.character(),
        anecdote_within == "anecdote" ~
        div(anecdote, target) %>%
          as.character()
      )
    ) %>%
    ungroup() %>%
    nest_by(
      project_variation,
      anecdote_variation,
      anecdote_between,
      alignment,
      valence,
      display
    ) %>%
    nest_by(
      project_variation,
      anecdote_variation,
      anecdote_between
    ) %>%
    mutate(
      timeline = get_projects_anecdotes_2(
        project_variation,
        anecdote_variation,
        anecdote_between,
        data
      ) %>%
        list()
    ) %>%
    pull(timeline)
}
