##' @title Get business information

##' @return
##' @author Shir Dekel
##' @export
get_business_information <- function() {
  company_name <-
    get_survey_text(
      label_text = "What is your company name? (optional)",
      name = "company_name",
    )

  role_company_option <-
    c(
      "CEO",
      "Corporate President",
      "Chairman",
      "Managing Director",
      "CFO",
      "COO",
      "CSO",
      "Other C-level executive",
      "Senior strategist",
      "EVP",
      "BU/Divisional President",
      "SVP",
      "VP",
      "Business Leader",
      "Business Member"
    )

  role_company <-
    get_survey_select(
      name_select = "role_company",
      name_other = "role_company_other",
      option = role_company_option,
      label_select = "What is your role in the company?"
    )

  role_allocation_option <-
    c(
      "Decide on allocations for the company",
      "Decide on allocations for business unit or division",
      "Decide on allocations for line of business level",
      "Provide information and analysis for the decision-makers at the company",
      "Provide information and analysis for the decision-makers at business unit or division",
      "Provide information and analysis for the decision-makers at line of business level"
    )

  role_allocation <-
    get_survey_select(
      name_select = "role_allocation",
      name_other = "role_allocation_other",
      option = role_allocation_option,
      label_select = "What is your role in resource allocation decisions?"
    )

  employees <-
    get_survey_number(
      label_text = "Approximately, how many employees work at your company?",
      name = "employees",
      max = 3e6
    )

  sector_option <-
    c(
      "Aerospace & Defense",
      "Agriculture, Farming, Food Processing",
      "Asset Management - Brokers, Fund Mgmt, Stock Exchange",
      "Automotive",
      "Banking - Payments, Central Banks, Retail, Wholesale, Investment",
      "Business Services - Legal, Accounting, Security, Consulting, PR",
      "Chemicals",
      "Computers & Electronics, Software, High Tech",
      "Consumer Products & Packaged Goods",
      "Diversified Conglomerate",
      "Energy - Power, Gas, Electricity, Water, Renewables",
      "Engineering, Construction, Infrastructure, Real Estate",
      "Health Services - Payor, Provider",
      "Insurance - Pension, Financial, Health 	Leisure - Sports, Parks, Theater, Gambling",
      "Machinery & Industrial Goods",
      "Media - Broadcasting, Publishing, Information",
      "Metals, Mining, Ore",
      "Paper, Packaging, Forestry",
      "Petroleum, Oil",
      "Pharmaceuticals, Medical Products & Equipment",
      "Private Equity, FOB, Venture Capital",
      "Public Sector, Government",
      "Retail, Wholesale, Restaurants",
      "Social Sector, Non-profit, Charity",
      "Telecommunications",
      "Travel, Transport & Logistics, Hotels"
    )

  sector <-
    get_survey_select(
      name_select = "sector",
      name_other = "sector_other",
      option = sector_option,
      label_select = "What is your primary company sector?"
    )

  revenue <-
    get_survey_number(
      label_text = "What is the size of your company's revenues?",
      name = "revenue",
      max = 6e5,
      prefix = "$",
      suffix = "million"
    )

  budget <-
    get_survey_number(
      label_text = "How large is the annual budget under your discretion?",
      name = "budget",
      max = 6e5,
      prefix = "$",
      suffix = "million"
    )

  business_information_combined <-
    list(company_name, sector, employees, revenue, role_company, role_allocation, budget) %>%
    map(~ tags$li(.x)) %>%
    tags$ol(style = "text-align:left") %>%
    as.character()

  business_information <-
    trial_generic(
      "survey-html-form",
      html = business_information_combined,
      data = insert_property(stage = "business_information")
    ) %>%
    build_timeline() %>%
    display_if(fn_data_condition(current_response == "yes"))

  return(business_information)
}
