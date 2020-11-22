var safe_to_close_window = false;
function verifyClose() {
  if (safe_to_close_window == false) {
    event.returnValue = "Are you sure you want to exit? Your data has not been saved yet.";
  }
}
window.onbeforeunload = verifyClose;

var alignment_condition, anecdote_condition, urlvar, valence_condition;

alignment_condition = jsPsych.randomization.sampleWithReplacement(['low', 'high'], 1)[0];

anecdote_condition = jsPsych.randomization.sampleWithReplacement(['anecdote_only', 'statistics_only', 'combined'], 1)[0];

valence_condition = jsPsych.randomization.sampleWithReplacement(['negative', 'positive'], 1)[0];

urlvar = jsPsych.data.urlVariables();

if (typeof urlvar.alignment !== 'undefined') {
  alignment_condition = urlvar.alignment;
}

if (typeof urlvar.anecdote !== 'undefined') {
  anecdote_condition = urlvar.anecdote;
}

if (typeof urlvar.valence !== 'undefined') {
  valence_condition = urlvar.valence;
}

function checkOther(val, id){
 var element=document.getElementById(id);
 if(val=='Other')
   element.style.display='block';
 else
   element.style.display='none';
}
jsPsych.data.addProperties({
  "subject": jsPsych.randomization.randomID(15),
  "thesis_project": "anecdotes",
  "experiment": "experiment2",
  "sample": "prolific",
  "alignment": alignment_condition,
  "anecdote": anecdote_condition,
  "valence": valence_condition,
  "PROLIFIC_PID": urlvar.PROLIFIC_PID,
  "STUDY_ID": urlvar.STUDY_ID,
  "SESSION_ID": urlvar.SESSION_ID
});

var timeline = {
  "timeline": [
    {
      "type": ["instructions"],
      "pages": ["<div>\n  <p>Welcome to the study.<\/p>\n  <p>Make sure to scroll down to the bottom of each page to see the navigation buttons.<\/p>\n<\/div>"],
      "key_forward": [39],
      "key_backward": [37],
      "allow_backward": true,
      "allow_keys": true,
      "show_clickable_nav": true,
      "button_label_previous": ["Previous"],
      "button_label_next": ["Next"],
      "post_trial_gap": [0],
      "data": {
        "stage": ["welcome"]
      }
    },
    {
      "timeline": [
        {
          "type": ["survey-html-form"],
          "html": ["<div>\n  <label for=\"prolific\">Enter your Prolific ID (24 alphanumeric characters, no spaces):<\/label>\n  <input type=\"text\" id=\"prolific\" name=\"prolific\" required minlength=\"24\" maxlength=\"24\" pattern=\"^[a-z0-9]+$\" size=\"30\"/>\n<\/div>"],
          "data": {
            "stage": ["id"]
          },
          "on_load": function() {
      if (typeof urlvar.PROLIFIC_PID !== 'undefined') {
        document.getElementById('prolific').setAttribute('value', urlvar.PROLIFIC_PID);
      }
    }
        },
        {
          "type": ["survey-html-form"],
          "html": ["<div>\n  <div>\n    <p>I would like to receive feedback about the overall results of this study.<\/p>\n    <input type=\"radio\" id=\"contact_yes\" name=\"contact\" value=\"yes\"/>\n    <label for=\"contact_yes\">YES<\/label>\n    <input type=\"radio\" id=\"contact_no\" name=\"contact\" value=\"no\" checked/>\n    <label for=\"contact_no\">NO<\/label>\n  <\/div>\n  <div>\n    <p>If you answered YES, please indicate your preferred form of feedback and address:<\/p>\n    <p>\n      Email:\n      <input type=\"text\" id=\"address\" name=\"address\"/>\n    <\/p>\n  <\/div>\n<\/div>"],
          "data": {
            "stage": ["contact"]
          }
        },
        {
          "type": ["survey-html-form"],
          "html": ["<ol style=\"text-align:left\">\n  <li>\n    <p>\n      <p>What is your sex?<\/p>\n      <input type=\"radio\" id=\"male\" name=\"sex\" value=\"male\" checked/>\n      <label for=\"male\">Male<\/label>\n      <input type=\"radio\" id=\"female\" name=\"sex\" value=\"female\"/>\n      <label for=\"female\">Female<\/label>\n    <\/p>\n  <\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"age\">What is your age?<\/label>\n      <\/p>\n      \n      <input type=\"number\" id=\"age\" name=\"age\" min=\"10\" max=\"100\" required style=\"width:70px\"/>\n      \n    <\/p>\n  <\/li>\n  <li><p>\n  <p>\n    <p>\n      <label for=\"language\">Do you speak a language other than English at home?<\/label>\n    <\/p>\n    <select id=\"language\" name=\"language\" onchange=\"checkOther(this.value, 'language_other');\" required>\n      <option value=\"\"><\/option>\n      <option value=\"No\">No<\/option>\n      <option value=\"Chinese\">Chinese<\/option>\n      <option value=\"Japanese\">Japanese<\/option>\n      <option value=\"Vietnamese\">Vietnamese<\/option>\n      <option value=\"Korean\">Korean<\/option>\n      <option value=\"Arabic\">Arabic<\/option>\n      <option value=\"Spanish\">Spanish<\/option>\n      <option value=\"Italian\">Italian<\/option>\n      <option value=\"Greek\">Greek<\/option>\n      <option value=\"Hebrew\">Hebrew<\/option>\n      <option value=\"Other\">Other<\/option>\n    <\/select>\n  <\/p>\n  <p>\n    <input type=\"text\" id=\"language_other\" name=\"language_other\" style=\"display:none;\" placeholder=\"Specify other\"/>\n  <\/p>\n<\/p><\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"business_edu\">How many years of experience do you have studying business?<\/label>\n      <\/p>\n      \n      <input type=\"number\" id=\"business_edu\" name=\"business_edu\" min=\"0\" max=\"100\" required style=\"width:70px\"/>\n      years\n    <\/p>\n  <\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"business_exp\">How many years of experience do you have working in a corporate business setting?<\/label>\n      <\/p>\n      \n      <input type=\"number\" id=\"business_exp\" name=\"business_exp\" min=\"0\" max=\"100\" required style=\"width:70px\"/>\n      years\n    <\/p>\n  <\/li>\n  <li>\n    <p>\n      <p>Do you currently work in an executive or managerial role?<\/p>\n      <input type=\"radio\" id=\"current_yes\" name=\"current\" value=\"yes\"/>\n      <label for=\"current_yes\">Yes<\/label>\n      <input type=\"radio\" id=\"current_no\" name=\"current\" value=\"no\" checked/>\n      <label for=\"current_no\">No<\/label>\n    <\/p>\n  <\/li>\n<\/ol>"],
          "data": {
            "stage": ["demographics"]
          },
          "on_finish": function(data){
    data.current_response = JSON.parse(data.responses).current
  }
        },
        {
          "timeline": [
            {
              "type": ["survey-html-form"],
              "html": ["<ol style=\"text-align:left\">\n  <li>\n    <p>\n      <label for=\"company_name\">What is your company name? (optional)<\/label>\n      <input type=\"text\" id=\"company_name\" name=\"company_name\"/>\n    <\/p>\n  <\/li>\n  <li><p>\n  <p>\n    <p>\n      <label for=\"sector\">What is your primary company sector?<\/label>\n    <\/p>\n    <select id=\"sector\" name=\"sector\" onchange=\"checkOther(this.value, 'sector_other');\" required>\n      <option value=\"\"><\/option>\n      <option value=\"Aerospace &amp; Defense\">Aerospace &amp; Defense<\/option>\n      <option value=\"Agriculture, Farming, Food Processing\">Agriculture, Farming, Food Processing<\/option>\n      <option value=\"Asset Management - Brokers, Fund Mgmt, Stock Exchange\">Asset Management - Brokers, Fund Mgmt, Stock Exchange<\/option>\n      <option value=\"Automotive\">Automotive<\/option>\n      <option value=\"Banking - Payments, Central Banks, Retail, Wholesale, Investment\">Banking - Payments, Central Banks, Retail, Wholesale, Investment<\/option>\n      <option value=\"Business Services - Legal, Accounting, Security, Consulting, PR\">Business Services - Legal, Accounting, Security, Consulting, PR<\/option>\n      <option value=\"Chemicals\">Chemicals<\/option>\n      <option value=\"Computers &amp; Electronics, Software, High Tech\">Computers &amp; Electronics, Software, High Tech<\/option>\n      <option value=\"Consumer Products &amp; Packaged Goods\">Consumer Products &amp; Packaged Goods<\/option>\n      <option value=\"Diversified Conglomerate\">Diversified Conglomerate<\/option>\n      <option value=\"Energy - Power, Gas, Electricity, Water, Renewables\">Energy - Power, Gas, Electricity, Water, Renewables<\/option>\n      <option value=\"Engineering, Construction, Infrastructure, Real Estate\">Engineering, Construction, Infrastructure, Real Estate<\/option>\n      <option value=\"Health Services - Payor, Provider\">Health Services - Payor, Provider<\/option>\n      <option value=\"Insurance - Pension, Financial, Health \tLeisure - Sports, Parks, Theater, Gambling\">Insurance - Pension, Financial, Health \tLeisure - Sports, Parks, Theater, Gambling<\/option>\n      <option value=\"Machinery &amp; Industrial Goods\">Machinery &amp; Industrial Goods<\/option>\n      <option value=\"Media - Broadcasting, Publishing, Information\">Media - Broadcasting, Publishing, Information<\/option>\n      <option value=\"Metals, Mining, Ore\">Metals, Mining, Ore<\/option>\n      <option value=\"Paper, Packaging, Forestry\">Paper, Packaging, Forestry<\/option>\n      <option value=\"Petroleum, Oil\">Petroleum, Oil<\/option>\n      <option value=\"Pharmaceuticals, Medical Products &amp; Equipment\">Pharmaceuticals, Medical Products &amp; Equipment<\/option>\n      <option value=\"Private Equity, FOB, Venture Capital\">Private Equity, FOB, Venture Capital<\/option>\n      <option value=\"Public Sector, Government\">Public Sector, Government<\/option>\n      <option value=\"Retail, Wholesale, Restaurants\">Retail, Wholesale, Restaurants<\/option>\n      <option value=\"Social Sector, Non-profit, Charity\">Social Sector, Non-profit, Charity<\/option>\n      <option value=\"Telecommunications\">Telecommunications<\/option>\n      <option value=\"Travel, Transport &amp; Logistics, Hotels\">Travel, Transport &amp; Logistics, Hotels<\/option>\n      <option value=\"Other\">Other<\/option>\n    <\/select>\n  <\/p>\n  <p>\n    <input type=\"text\" id=\"sector_other\" name=\"sector_other\" style=\"display:none;\" placeholder=\"Specify other\"/>\n  <\/p>\n<\/p><\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"employees\">Approximately, how many employees work at your company?<\/label>\n      <\/p>\n      \n      <input type=\"number\" id=\"employees\" name=\"employees\" min=\"0\" max=\"3e+06\" required style=\"width:70px\"/>\n      \n    <\/p>\n  <\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"revenue\">What is the size of your company's revenues?<\/label>\n      <\/p>\n      $\n      <input type=\"number\" id=\"revenue\" name=\"revenue\" min=\"0\" max=\"6e+05\" required style=\"width:70px\"/>\n      million\n    <\/p>\n  <\/li>\n  <li><p>\n  <p>\n    <p>\n      <label for=\"role_company\">What is your role in the company?<\/label>\n    <\/p>\n    <select id=\"role_company\" name=\"role_company\" onchange=\"checkOther(this.value, 'role_company_other');\" required>\n      <option value=\"\"><\/option>\n      <option value=\"CEO\">CEO<\/option>\n      <option value=\"Corporate President\">Corporate President<\/option>\n      <option value=\"Chairman\">Chairman<\/option>\n      <option value=\"Managing Director\">Managing Director<\/option>\n      <option value=\"CFO\">CFO<\/option>\n      <option value=\"COO\">COO<\/option>\n      <option value=\"CSO\">CSO<\/option>\n      <option value=\"Other C-level executive\">Other C-level executive<\/option>\n      <option value=\"Senior strategist\">Senior strategist<\/option>\n      <option value=\"EVP\">EVP<\/option>\n      <option value=\"BU/Divisional President\">BU/Divisional President<\/option>\n      <option value=\"SVP\">SVP<\/option>\n      <option value=\"VP\">VP<\/option>\n      <option value=\"Business Leader\">Business Leader<\/option>\n      <option value=\"Business Member\">Business Member<\/option>\n      <option value=\"Other\">Other<\/option>\n    <\/select>\n  <\/p>\n  <p>\n    <input type=\"text\" id=\"role_company_other\" name=\"role_company_other\" style=\"display:none;\" placeholder=\"Specify other\"/>\n  <\/p>\n<\/p><\/li>\n  <li><p>\n  <p>\n    <p>\n      <label for=\"role_allocation\">What is your role in resource allocation decisions?<\/label>\n    <\/p>\n    <select id=\"role_allocation\" name=\"role_allocation\" onchange=\"checkOther(this.value, 'role_allocation_other');\" required>\n      <option value=\"\"><\/option>\n      <option value=\"Decide on allocations for the company\">Decide on allocations for the company<\/option>\n      <option value=\"Decide on allocations for business unit or division\">Decide on allocations for business unit or division<\/option>\n      <option value=\"Decide on allocations for line of business level\">Decide on allocations for line of business level<\/option>\n      <option value=\"Provide information and analysis for the decision-makers at the company\">Provide information and analysis for the decision-makers at the company<\/option>\n      <option value=\"Provide information and analysis for the decision-makers at business unit or division\">Provide information and analysis for the decision-makers at business unit or division<\/option>\n      <option value=\"Provide information and analysis for the decision-makers at line of business level\">Provide information and analysis for the decision-makers at line of business level<\/option>\n      <option value=\"Other\">Other<\/option>\n    <\/select>\n  <\/p>\n  <p>\n    <input type=\"text\" id=\"role_allocation_other\" name=\"role_allocation_other\" style=\"display:none;\" placeholder=\"Specify other\"/>\n  <\/p>\n<\/p><\/li>\n  <li>\n    <p>\n      <p>\n        <label for=\"budget\">How large is the annual budget under your discretion?<\/label>\n      <\/p>\n      $\n      <input type=\"number\" id=\"budget\" name=\"budget\" min=\"0\" max=\"6e+05\" required style=\"width:70px\"/>\n      million\n    <\/p>\n  <\/li>\n<\/ol>"],
              "data": {
                "stage": ["business_information"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.current_response == "yes"){
        return true;
      } else {
        return false;
      }
    }
        }
      ]
    },
    {
      "timeline": [
        {
          "timeline": [
            {
              "type": ["survey-html-form"],
              "html": ["<fieldset legend=\"Instructions\">\n  <p>Imagine you are an executive in a multi-business company and that you are presented with two projects to potentially invest in. Your job is to decide how to allocate the capital available in your budget between these two projects.<\/p>\n  <p>In a moment you will see a table that details the two target projects and relevant information about them.<\/p>\n  <p>Managers often find it useful to consult with previous case studies before making important decisions. As well as seeing the two target projects, you will also be provided with an example of a failed project with some information that was available just before the company decided to invest in it. Further, you are also provided with an analysis of this investment decision after it became clear that the project will not meet its expected return on investment.<\/p>\n  <p>\n    <p>\n      <label for=\"project_test\">Test yourself on the above instructions. How many pairs of projects will you see? <\/label>\n    <\/p>\n    \n    <input type=\"number\" id=\"project_test\" name=\"project_test\" min=\"0\" max=\"100\" required style=\"width:70px\"/>\n     projects\n  <\/p>\n<\/fieldset>"],
              "data": {
                "stage": ["instructions"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.anecdote == "anecdote_only"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "type": ["survey-html-form"],
              "html": ["<fieldset legend=\"Instructions\">\n  <p>Imagine you are an executive in a multi-business company and that you are presented with two projects to potentially invest in. Your job is to decide how to allocate the capital available in your budget between these two projects.<\/p>\n  <p>In a moment you will see a table that details the two target projects and relevant information about them.<\/p>\n  <p>As a part of the relevant information that will be provided for each target project, you will be provided with measures of overall reliability and Net Present Value (NPV). The NPV is the company’s estimation of the future returns of the project. An NPV that is greater than 0 (zero) indicates that there is an expectation of profit. The higher the NPV, the better the expectations for each project. Both these measures were collected as part of a research study conducted by an international consulting company that aggregated data from thousands of other projects in relevant industries.<\/p>\n  <p>\n    <p>\n      <label for=\"project_test\">Test yourself on the above instructions. How many pairs of projects will you see? <\/label>\n    <\/p>\n    \n    <input type=\"number\" id=\"project_test\" name=\"project_test\" min=\"0\" max=\"100\" required style=\"width:70px\"/>\n     projects\n  <\/p>\n<\/fieldset>"],
              "data": {
                "stage": ["instructions"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.anecdote == "statistics_only"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "type": ["survey-html-form"],
              "html": ["<fieldset legend=\"Instructions\">\n  <p>Imagine you are an executive in a multi-business company and that you are presented with two projects to potentially invest in. Your job is to decide how to allocate the capital available in your budget between these two projects.<\/p>\n  <p>In a moment you will see a table that details the two target projects and relevant information about them.<\/p>\n  <p>\n    <p>Managers often find it useful to consult with previous case studies before making important decisions. As well as seeing the two target projects, you will also be provided with an example of a failed project with some information that was available just before the company decided to invest in it. Further, you are also provided with an analysis of this investment decision after it became clear that the project will not meet its expected return on investment.<\/p>\n    <p>As a part of the relevant information that will be provided for each target project, you will be provided with measures of overall reliability and Net Present Value (NPV). The NPV is the company’s estimation of the future returns of the project. An NPV that is greater than 0 (zero) indicates that there is an expectation of profit. The higher the NPV, the better the expectations for each project. Both these measures were collected as part of a research study conducted by an international consulting company that aggregated data from thousands of other projects in relevant industries.<\/p>\n    <p>Note that the project in the case study was included in the research study, so its features are subsumed in the aggregated data.<\/p>\n  <\/p>\n  <p>\n    <p>\n      <label for=\"project_test\">Test yourself on the above instructions. How many pairs of projects will you see? <\/label>\n    <\/p>\n    \n    <input type=\"number\" id=\"project_test\" name=\"project_test\" min=\"0\" max=\"100\" required style=\"width:70px\"/>\n     projects\n  <\/p>\n<\/fieldset>"],
              "data": {
                "stage": ["instructions"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.anecdote == "combined"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "type": ["survey-html-form3"],
              "html": jsPsych.timelineVariable('allocation_table'),
              "data": {
                "stage": ["project_allocation"]
              }
            }
          ],
          "timeline_variables": [
            {
              "allocation_table": ["<div><fieldset style='width:750px; text-align:left'><legend>Target projects<\/legend><p>Allocate your budget between the following two projects using percentage values (the two values should sum to 100):<\/p><table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;' >\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Relevant information<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project A<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project B<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: center;'>Business name<\/td>\n<td style='text-align: center;'>Enfuel<\/td>\n<td style='text-align: center;'>Microxy<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Investment<\/td>\n<td style='text-align: center;'>oil well<\/td>\n<td style='text-align: center;'>microchip<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Location<\/td>\n<td style='text-align: center;'>Texas, USA<\/td>\n<td style='text-align: center;'>Manchester, UK<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Integration<\/td>\n<td style='text-align: center;'>vertical<\/td>\n<td style='text-align: center;'>horizontal<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Structure<\/td>\n<td style='text-align: center;'>centralised<\/td>\n<td style='text-align: center;'>decentralised<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Predicted project features<\/td>\n<td style='text-align: center;'><ul>  <li>Oil extracted: 2200L an hour<\/li>  <li>Time the machinery lasts before requiring maintenance: 8 years<\/li>  <li>Probability of finding oil: 88%<\/li>  <li>Type of well: onshore<\/li><\/ul><\/td>\n<td style='text-align: center;'><ul>  <li>Microchips produced: 4000 an hour<\/li>  <li>Usable semiconductor yield after testing: 60%<\/li>  <li>Compatible PCs in the market: 75%<\/li>  <li>Type of integrated circuit: digital<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Overall reliability rating (%)<\/td>\n<td style='text-align: center;'>95<\/td>\n<td style='text-align: center;'>87<\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: center;'>NPV ($)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'>900<\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'>100<\/td>\n<\/tr>\n<\/tbody>\n<\/table><p><label for=\"allocation_q_projectA\">Project A allocation: <\/label><input type=\"number\" id=\"allocation_q_projectA\" name=\"allocation_q_projectA\" min=\"0\" max=\"100\" required>%<\/p><p><label for=\"allocation_q_projectB\">Project B allocation: <\/label><input type=\"number\" id=\"allocation_q_projectB\" name=\"allocation_q_projectB\" min=\"0\" max=\"100\" required>%<\/p><\/fieldset><\/div>"]
            },
            {
              "allocation_table": ["<div>\n  <fieldset style='width:750px; text-align:left'><legend>Case study<\/legend><ul>  <li>    Business details:    <ul>      <li>        Business name:         Refinera      <\/li>      <li>        Location:         New Mexico, USA      <\/li>      <li>        Integration:         vertical      <\/li>    <\/ul>  <\/li>  <li>    Investment:    oil well  <\/li>  <li>    Predicted project features:    <ul>  <li>Oil extracted: 2000L an hour<\/li>  <li>Time the machinery lasts before requiring maintenance: 7 years<\/li>  <li>Probability of finding oil: 80%<\/li>  <li>Type of well: onshore<\/li><\/ul>  <\/li><\/ul>Refinera struggled to establish itself in the regional market because of what scientists now know is a hydrocarbon shortage in the New Mexico area. A centralised organisational structure meant that key operational decisions were delayed with what needed to be a timely process. Being vertically integrated meant that these delays caused losses at the retail sites due to miscalculations of petrol supply. To make up for this, a post hoc analysis concluded that oil was needed to be extracted at a rate of 3000L an hour and sites have at least a 96% probability of finding oil before management approved the project. Further, machinery needed to have thought to last at least 10 years before requiring maintenance, because maintenance costs further offset the initial investment after the 7 years of development. Further, the well was quite susceptible to crude oil price changes due to it being an onshore well, and so added additional financial setbacks over the course of the project.<\/fieldset>\n  <fieldset style='width:750px; text-align:left'><legend>Target projects<\/legend><p>Allocate your budget between the following two projects using percentage values (the two values should sum to 100):<\/p><table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;' >\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Relevant information<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project A<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project B<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: center;'>Business name<\/td>\n<td style='text-align: center;'>Enfuel<\/td>\n<td style='text-align: center;'>Microxy<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Investment<\/td>\n<td style='text-align: center;'>oil well<\/td>\n<td style='text-align: center;'>microchip<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Location<\/td>\n<td style='text-align: center;'>Texas, USA<\/td>\n<td style='text-align: center;'>Manchester, UK<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Integration<\/td>\n<td style='text-align: center;'>vertical<\/td>\n<td style='text-align: center;'>horizontal<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Structure<\/td>\n<td style='text-align: center;'>centralised<\/td>\n<td style='text-align: center;'>decentralised<\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: center;'>Predicted project features<\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'><ul>  <li>Oil extracted: 2200L an hour<\/li>  <li>Time the machinery lasts before requiring maintenance: 8 years<\/li>  <li>Probability of finding oil: 88%<\/li>  <li>Type of well: onshore<\/li><\/ul><\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'><ul>  <li>Microchips produced: 4000 an hour<\/li>  <li>Usable semiconductor yield after testing: 60%<\/li>  <li>Compatible PCs in the market: 75%<\/li>  <li>Type of integrated circuit: digital<\/li><\/ul><\/td>\n<\/tr>\n<\/tbody>\n<\/table><p><label for=\"allocation_q_projectA\">Project A allocation: <\/label><input type=\"number\" id=\"allocation_q_projectA\" name=\"allocation_q_projectA\" min=\"0\" max=\"100\" required>%<\/p><p><label for=\"allocation_q_projectB\">Project B allocation: <\/label><input type=\"number\" id=\"allocation_q_projectB\" name=\"allocation_q_projectB\" min=\"0\" max=\"100\" required>%<\/p><\/fieldset>\n<\/div>"]
            },
            {
              "allocation_table": ["<div>\n  <fieldset style='width:750px; text-align:left'><legend>Case study<\/legend><ul>  <li>    Business details:    <ul>      <li>        Business name:         Refinera      <\/li>      <li>        Location:         Zhuhai, China      <\/li>      <li>        Integration:         horizontal      <\/li>    <\/ul>  <\/li>  <li>    Investment:    oil well  <\/li>  <li>    Predicted project features:    <ul>  <li>Oil extracted: 1400L an hour<\/li>  <li>Time the machinery lasts before requiring maintenance: 5 years<\/li>  <li>Probability of finding oil: 56%<\/li>  <li>Type of well: offshore<\/li><\/ul>  <\/li><\/ul>Refinera struggled to establish itself in the regional market because of what scientists now know is a hydrocarbon shortage in the Zhuhai area. A decentralised organisational structure meant that communication across relevant business units was delayed with what needed to be a timely process. Being horizontally integrated meant that these delays caused losses at the other well sites due to a drain on the collective resources. To make up for this, a post hoc analysis concluded that oil was needed to be extracted at a rate of 2100L an hour and sites have at least a 67% probability of finding oil before management approved the project. Further, machinery needed to have thought to last at least 8 years before requiring maintenance, because maintenance costs further offset the initial investment after the 5 years of development. Further, the well was quite difficult to construct due to it being an offshore well, and so added additional financial setbacks over the course of the project.<\/fieldset>\n  <fieldset style='width:750px; text-align:left'><legend>Target projects<\/legend><p>Allocate your budget between the following two projects using percentage values (the two values should sum to 100):<\/p><table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;' >\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Relevant information<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project A<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project B<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: center;'>Business name<\/td>\n<td style='text-align: center;'>Enfuel<\/td>\n<td style='text-align: center;'>Microxy<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Investment<\/td>\n<td style='text-align: center;'>oil well<\/td>\n<td style='text-align: center;'>microchip<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Location<\/td>\n<td style='text-align: center;'>Texas, USA<\/td>\n<td style='text-align: center;'>Manchester, UK<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Integration<\/td>\n<td style='text-align: center;'>vertical<\/td>\n<td style='text-align: center;'>horizontal<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Structure<\/td>\n<td style='text-align: center;'>centralised<\/td>\n<td style='text-align: center;'>decentralised<\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: center;'>Predicted project features<\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'><ul>  <li>Oil extracted: 2200L an hour<\/li>  <li>Time the machinery lasts before requiring maintenance: 8 years<\/li>  <li>Probability of finding oil: 88%<\/li>  <li>Type of well: onshore<\/li><\/ul><\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'><ul>  <li>Microchips produced: 4000 an hour<\/li>  <li>Usable semiconductor yield after testing: 60%<\/li>  <li>Compatible PCs in the market: 75%<\/li>  <li>Type of integrated circuit: digital<\/li><\/ul><\/td>\n<\/tr>\n<\/tbody>\n<\/table><p><label for=\"allocation_q_projectA\">Project A allocation: <\/label><input type=\"number\" id=\"allocation_q_projectA\" name=\"allocation_q_projectA\" min=\"0\" max=\"100\" required>%<\/p><p><label for=\"allocation_q_projectB\">Project B allocation: <\/label><input type=\"number\" id=\"allocation_q_projectB\" name=\"allocation_q_projectB\" min=\"0\" max=\"100\" required>%<\/p><\/fieldset>\n<\/div>"]
            }
          ]
        },
        {
          "timeline": [
            {
              "type": ["survey-html-form3"],
              "html": jsPsych.timelineVariable('allocation_table'),
              "data": {
                "stage": ["project_allocation"]
              }
            }
          ],
          "timeline_variables": [
            {
              "allocation_table": ["<div><fieldset style='width:750px; text-align:left'><legend>Target projects<\/legend><p>Allocate your budget between the following two projects using percentage values (the two values should sum to 100):<\/p><table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;' >\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Relevant information<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project A<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project B<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: center;'>Business name<\/td>\n<td style='text-align: center;'>Enfuel<\/td>\n<td style='text-align: center;'>Microxy<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Investment<\/td>\n<td style='text-align: center;'>oil well<\/td>\n<td style='text-align: center;'>microchip<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Location<\/td>\n<td style='text-align: center;'>Texas, USA<\/td>\n<td style='text-align: center;'>Manchester, UK<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Integration<\/td>\n<td style='text-align: center;'>vertical<\/td>\n<td style='text-align: center;'>horizontal<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Structure<\/td>\n<td style='text-align: center;'>centralised<\/td>\n<td style='text-align: center;'>decentralised<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Predicted project features<\/td>\n<td style='text-align: center;'><ul>  <li>Oil extracted: 2200L an hour<\/li>  <li>Time the machinery lasts before requiring maintenance: 8 years<\/li>  <li>Probability of finding oil: 88%<\/li>  <li>Type of well: onshore<\/li><\/ul><\/td>\n<td style='text-align: center;'><ul>  <li>Microchips produced: 4000 an hour<\/li>  <li>Usable semiconductor yield after testing: 60%<\/li>  <li>Compatible PCs in the market: 75%<\/li>  <li>Type of integrated circuit: digital<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Overall reliability rating (%)<\/td>\n<td style='text-align: center;'>95<\/td>\n<td style='text-align: center;'>87<\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: center;'>NPV ($)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'>900<\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'>100<\/td>\n<\/tr>\n<\/tbody>\n<\/table><p><label for=\"allocation_q_projectA\">Project A allocation: <\/label><input type=\"number\" id=\"allocation_q_projectA\" name=\"allocation_q_projectA\" min=\"0\" max=\"100\" required>%<\/p><p><label for=\"allocation_q_projectB\">Project B allocation: <\/label><input type=\"number\" id=\"allocation_q_projectB\" name=\"allocation_q_projectB\" min=\"0\" max=\"100\" required>%<\/p><\/fieldset><\/div>"]
            },
            {
              "allocation_table": ["<div>\n  <fieldset style='width:750px; text-align:left'><legend>Case study<\/legend><ul>  <li>    Business details:    <ul>      <li>        Business name:         Refinera      <\/li>      <li>        Location:         New Mexico, USA      <\/li>      <li>        Integration:         vertical      <\/li>    <\/ul>  <\/li>  <li>    Investment:    oil well  <\/li>  <li>    Predicted project features:    <ul>  <li>Oil extracted: 2000L an hour<\/li>  <li>Time the machinery lasts before requiring maintenance: 7 years<\/li>  <li>Probability of finding oil: 80%<\/li>  <li>Type of well: onshore<\/li><\/ul>  <\/li><\/ul>Refinera struggled to establish itself in the regional market because of what scientists now know is a hydrocarbon shortage in the New Mexico area. A centralised organisational structure meant that key operational decisions were delayed with what needed to be a timely process. Being vertically integrated meant that these delays caused losses at the retail sites due to miscalculations of petrol supply. To make up for this, a post hoc analysis concluded that oil was needed to be extracted at a rate of 3000L an hour and sites have at least a 96% probability of finding oil before management approved the project. Further, machinery needed to have thought to last at least 10 years before requiring maintenance, because maintenance costs further offset the initial investment after the 7 years of development. Further, the well was quite susceptible to crude oil price changes due to it being an onshore well, and so added additional financial setbacks over the course of the project.<\/fieldset>\n  <fieldset style='width:750px; text-align:left'><legend>Target projects<\/legend><p>Allocate your budget between the following two projects using percentage values (the two values should sum to 100):<\/p><table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;' >\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Relevant information<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project A<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project B<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: center;'>Business name<\/td>\n<td style='text-align: center;'>Enfuel<\/td>\n<td style='text-align: center;'>Microxy<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Investment<\/td>\n<td style='text-align: center;'>oil well<\/td>\n<td style='text-align: center;'>microchip<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Location<\/td>\n<td style='text-align: center;'>Texas, USA<\/td>\n<td style='text-align: center;'>Manchester, UK<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Integration<\/td>\n<td style='text-align: center;'>vertical<\/td>\n<td style='text-align: center;'>horizontal<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Structure<\/td>\n<td style='text-align: center;'>centralised<\/td>\n<td style='text-align: center;'>decentralised<\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: center;'>Predicted project features<\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'><ul>  <li>Oil extracted: 2200L an hour<\/li>  <li>Time the machinery lasts before requiring maintenance: 8 years<\/li>  <li>Probability of finding oil: 88%<\/li>  <li>Type of well: onshore<\/li><\/ul><\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'><ul>  <li>Microchips produced: 4000 an hour<\/li>  <li>Usable semiconductor yield after testing: 60%<\/li>  <li>Compatible PCs in the market: 75%<\/li>  <li>Type of integrated circuit: digital<\/li><\/ul><\/td>\n<\/tr>\n<\/tbody>\n<\/table><p><label for=\"allocation_q_projectA\">Project A allocation: <\/label><input type=\"number\" id=\"allocation_q_projectA\" name=\"allocation_q_projectA\" min=\"0\" max=\"100\" required>%<\/p><p><label for=\"allocation_q_projectB\">Project B allocation: <\/label><input type=\"number\" id=\"allocation_q_projectB\" name=\"allocation_q_projectB\" min=\"0\" max=\"100\" required>%<\/p><\/fieldset>\n<\/div>"]
            },
            {
              "allocation_table": ["<div>\n  <fieldset style='width:750px; text-align:left'><legend>Case study<\/legend><ul>  <li>    Business details:    <ul>      <li>        Business name:         Refinera      <\/li>      <li>        Location:         Zhuhai, China      <\/li>      <li>        Integration:         horizontal      <\/li>    <\/ul>  <\/li>  <li>    Investment:    oil well  <\/li>  <li>    Predicted project features:    <ul>  <li>Oil extracted: 1400L an hour<\/li>  <li>Time the machinery lasts before requiring maintenance: 5 years<\/li>  <li>Probability of finding oil: 56%<\/li>  <li>Type of well: offshore<\/li><\/ul>  <\/li><\/ul>Refinera struggled to establish itself in the regional market because of what scientists now know is a hydrocarbon shortage in the Zhuhai area. A decentralised organisational structure meant that communication across relevant business units was delayed with what needed to be a timely process. Being horizontally integrated meant that these delays caused losses at the other well sites due to a drain on the collective resources. To make up for this, a post hoc analysis concluded that oil was needed to be extracted at a rate of 2100L an hour and sites have at least a 67% probability of finding oil before management approved the project. Further, machinery needed to have thought to last at least 8 years before requiring maintenance, because maintenance costs further offset the initial investment after the 5 years of development. Further, the well was quite difficult to construct due to it being an offshore well, and so added additional financial setbacks over the course of the project.<\/fieldset>\n  <fieldset style='width:750px; text-align:left'><legend>Target projects<\/legend><p>Allocate your budget between the following two projects using percentage values (the two values should sum to 100):<\/p><table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;' >\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Relevant information<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project A<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project B<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: center;'>Business name<\/td>\n<td style='text-align: center;'>Enfuel<\/td>\n<td style='text-align: center;'>Microxy<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Investment<\/td>\n<td style='text-align: center;'>oil well<\/td>\n<td style='text-align: center;'>microchip<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Location<\/td>\n<td style='text-align: center;'>Texas, USA<\/td>\n<td style='text-align: center;'>Manchester, UK<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Integration<\/td>\n<td style='text-align: center;'>vertical<\/td>\n<td style='text-align: center;'>horizontal<\/td>\n<\/tr>\n<tr>\n<td style='text-align: center;'>Structure<\/td>\n<td style='text-align: center;'>centralised<\/td>\n<td style='text-align: center;'>decentralised<\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: center;'>Predicted project features<\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'><ul>  <li>Oil extracted: 2200L an hour<\/li>  <li>Time the machinery lasts before requiring maintenance: 8 years<\/li>  <li>Probability of finding oil: 88%<\/li>  <li>Type of well: onshore<\/li><\/ul><\/td>\n<td style='border-bottom: 2px solid grey; text-align: center;'><ul>  <li>Microchips produced: 4000 an hour<\/li>  <li>Usable semiconductor yield after testing: 60%<\/li>  <li>Compatible PCs in the market: 75%<\/li>  <li>Type of integrated circuit: digital<\/li><\/ul><\/td>\n<\/tr>\n<\/tbody>\n<\/table><p><label for=\"allocation_q_projectA\">Project A allocation: <\/label><input type=\"number\" id=\"allocation_q_projectA\" name=\"allocation_q_projectA\" min=\"0\" max=\"100\" required>%<\/p><p><label for=\"allocation_q_projectB\">Project B allocation: <\/label><input type=\"number\" id=\"allocation_q_projectB\" name=\"allocation_q_projectB\" min=\"0\" max=\"100\" required>%<\/p><\/fieldset>\n<\/div>"]
            }
          ]
        }
      ]
    },
    {
      "timeline": [
        {
          "type": ["instructions"],
          "pages": ["<img src=\"resource/image/debrief1.png\" width=\"750\"/>", "<img src=\"resource/image/debrief2.png\" width=\"750\"/>"],
          "key_forward": [39],
          "key_backward": [37],
          "allow_backward": true,
          "allow_keys": true,
          "show_clickable_nav": true,
          "button_label_previous": ["Previous"],
          "button_label_next": ["Next"],
          "post_trial_gap": [0],
          "data": {
            "stage": ["debrief"]
          }
        },
        {
          "type": ["html-button-response"],
          "stimulus": ["<div>\n  <p>Press below to complete the experiment.<\/p>\n  <p>The next page will be a blank white screen. It will take approximately 10 seconds to save your data, after which you will be automatically redirected back to Prolific. Please do not exit until you have been redirected back to Prolific.<\/p>\n  <p>Thank you!<\/p>\n<\/div>"],
          "choices": ["End experiment"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [0],
          "data": {
            "stage": ["end"]
          }
        }
      ]
    }
  ]
};

jsPsych.init(
{
  "timeline": [timeline],
  "experiment_width": [750],
  "preload_images": ["resource/image/consent.png", "resource/image/debrief1.png", "resource/image/debrief2.png", "resource/image/pis1_prolific.png", "resource/image/pis1_sona.png", "resource/image/pis2_prolific.png", "resource/image/pis2_sona.png", "resource/image/pis3_prolific.png", "resource/image/pis3_sona.png"],
  "on_finish": function() {
    var data = jsPsych.data.get().csv();
    var file = 'xprmntr_local_name';
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'submit');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({filename: file, filedata: data}));
  }
}
);
