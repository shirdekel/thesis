var safe_to_close_window = false;
function verifyClose() {
  if (safe_to_close_window == false) {
    event.returnValue = "Are you sure you want to exit? Your data has not been saved yet.";
  }
}
window.onbeforeunload = verifyClose;

var alignment_condition, project_variation_condition, reliability_type_condition, urlvar;

project_variation_condition = jsPsych.randomization.sampleWithReplacement([1, 2, 3, 4, 5], 1);

alignment_condition = jsPsych.randomization.sampleWithoutReplacement(['low', 'high'], 1)[0];

reliability_type_condition = jsPsych.randomization.sampleWithoutReplacement(['implicit', 'explicit'], 1)[0];

urlvar = jsPsych.data.urlVariables();

if (typeof urlvar.project_variation !== 'undefined') {
  project_variation_condition = urlvar.project_variation;
}

if (typeof urlvar.alignment !== 'undefined') {
  alignment_condition = urlvar.alignment;
}

if (typeof urlvar.reliability_type !== 'undefined') {
  reliability_type_condition = urlvar.reliability_type;
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
  "thesis_project": "alignment",
  "experiment": "experiment8",
  "sample": "prolific",
  "project_variation": project_variation_condition,
  "alignment": alignment_condition,
  "reliability_type": reliability_type_condition,
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
          "type": ["instructions"],
          "pages": ["<img src=\"resource/image/pis1_prolific.png\" width=\"750\"/>", "<img src=\"resource/image/pis2_prolific.png\" width=\"750\"/>", "<img src=\"resource/image/pis3_prolific.png\" width=\"750\"/>"],
          "key_forward": [39],
          "key_backward": [37],
          "allow_backward": true,
          "allow_keys": true,
          "show_clickable_nav": true,
          "button_label_previous": ["Previous"],
          "button_label_next": ["Next"],
          "post_trial_gap": [0],
          "data": {
            "stage": ["pis"]
          }
        },
        {
          "type": ["external-html"],
          "url": ["resource/other/consent.html"],
          "cont_btn": ["start"],
          "check_fn": function(elem) {
  if (document.getElementById('consent_checkbox').checked) {
    return true;
  }
  else {
    alert('If you wish to participate, you must check the box next to the statement <em>I agree to participate in this study.</em>');
    return false;
  }
  return false;
},
          "data": {
            "stage": ["consent"]
          }
        },
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
          "type": ["instructions"],
          "pages": ["We will now give you the instructions for the task. Use the arrow buttons to browse these instructions", "<div><p>Imagine that you are a CEO of a large company composed of many individual businesses.<\/p> <p>You will be shown information about a number of projects that your company is considering to invest in. Some specific information about the project itself is provided. In addition to those numbers, you will find each project's net present value (NPV), which is the company's estimation of the future returns of the project. An NPV that is greater than 0 (zero) indicates that there is an expectation of profit. The higher the NPV, the better the expectations for each project.<\/p> <p>You will see a range of possible NPVs alongside a 'midpoint'. The range literally represents the range of plausible outcomes, but the midpoint is the best guess, and hence is the same as a single NPV value.<\/p> <p>Your task is to rank the projects and decide how to allocate the available budget between them.<\/p><\/div>", "Press the 'Next' button to begin."],
          "key_forward": [39],
          "key_backward": [37],
          "allow_backward": true,
          "allow_keys": true,
          "show_clickable_nav": true,
          "button_label_previous": ["Previous"],
          "button_label_next": ["Next"],
          "post_trial_gap": [0],
          "data": {
            "stage": ["instructions"]
          }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Pressbloom1<\/td>\n<td style='text-align: left;'>Pressbloom2<\/td>\n<td style='text-align: left;'>Pressbloom3<\/td>\n<td style='text-align: left;'>Pressbloom4<\/td>\n<td style='text-align: left;'>Pressbloom5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 50000 a day<\/li><li>Number of weekly advertisers: 80<\/li><li>Ink that is not discarded due to impurities: 5000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 162500 a day<\/li><li>Number of weekly advertisers: 260<\/li><li>Ink that is not discarded due to impurities: 16250L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 275000 a day<\/li><li>Number of weekly advertisers: 440<\/li><li>Ink that is not discarded due to impurities: 27500L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 387500 a day<\/li><li>Number of weekly advertisers: 620<\/li><li>Ink that is not discarded due to impurities: 38750L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 500000 a day<\/li><li>Number of weekly advertisers: 800<\/li><li>Ink that is not discarded due to impurities: 50000L a day<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Pressbloom1<\/td>\n<td style='text-align: left;'>Pressbloom2<\/td>\n<td style='text-align: left;'>Pressbloom3<\/td>\n<td style='text-align: left;'>Pressbloom4<\/td>\n<td style='text-align: left;'>Pressbloom5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 50000 a day<\/li><li>Number of weekly advertisers: 80<\/li><li>Ink that is not discarded due to impurities: 5000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 162500 a day<\/li><li>Number of weekly advertisers: 260<\/li><li>Ink that is not discarded due to impurities: 16250L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 275000 a day<\/li><li>Number of weekly advertisers: 440<\/li><li>Ink that is not discarded due to impurities: 27500L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 387500 a day<\/li><li>Number of weekly advertisers: 620<\/li><li>Ink that is not discarded due to impurities: 38750L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 500000 a day<\/li><li>Number of weekly advertisers: 800<\/li><li>Ink that is not discarded due to impurities: 50000L a day<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "explicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 1){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "high"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Pharmacore1<\/td>\n<td style='text-align: left;'>Pharmacore2<\/td>\n<td style='text-align: left;'>Pharmacore3<\/td>\n<td style='text-align: left;'>Pharmacore4<\/td>\n<td style='text-align: left;'>Pharmacore5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 300000 an hour<\/li><li>Shelf life: 20 months<\/li><li>Probability of symptom reduction after a week: 90%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 975000 an hour<\/li><li>Shelf life: 65 months<\/li><li>Probability of symptom reduction after a week: 292%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 1650000 an hour<\/li><li>Shelf life: 110 months<\/li><li>Probability of symptom reduction after a week: 495%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 2325000 an hour<\/li><li>Shelf life: 155 months<\/li><li>Probability of symptom reduction after a week: 697%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 3000000 an hour<\/li><li>Shelf life: 200 months<\/li><li>Probability of symptom reduction after a week: 900%<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Pharmacore1<\/td>\n<td style='text-align: left;'>Pharmacore2<\/td>\n<td style='text-align: left;'>Pharmacore3<\/td>\n<td style='text-align: left;'>Pharmacore4<\/td>\n<td style='text-align: left;'>Pharmacore5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 300000 an hour<\/li><li>Shelf life: 20 months<\/li><li>Probability of symptom reduction after a week: 90%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 975000 an hour<\/li><li>Shelf life: 65 months<\/li><li>Probability of symptom reduction after a week: 292%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 1650000 an hour<\/li><li>Shelf life: 110 months<\/li><li>Probability of symptom reduction after a week: 495%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 2325000 an hour<\/li><li>Shelf life: 155 months<\/li><li>Probability of symptom reduction after a week: 697%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 3000000 an hour<\/li><li>Shelf life: 200 months<\/li><li>Probability of symptom reduction after a week: 900%<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "explicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 2){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "high"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Railmont1<\/td>\n<td style='text-align: left;'>Railmont2<\/td>\n<td style='text-align: left;'>Railmont3<\/td>\n<td style='text-align: left;'>Railmont4<\/td>\n<td style='text-align: left;'>Railmont5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 5 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 2000<\/li><li>Time before the train carriages will need to be serviced: 12 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 16 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 6500<\/li><li>Time before the train carriages will need to be serviced: 39 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 27 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 11000<\/li><li>Time before the train carriages will need to be serviced: 66 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 38 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 15500<\/li><li>Time before the train carriages will need to be serviced: 93 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 50 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 20000<\/li><li>Time before the train carriages will need to be serviced: 120 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Railmont1<\/td>\n<td style='text-align: left;'>Railmont2<\/td>\n<td style='text-align: left;'>Railmont3<\/td>\n<td style='text-align: left;'>Railmont4<\/td>\n<td style='text-align: left;'>Railmont5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 5 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 2000<\/li><li>Time before the train carriages will need to be serviced: 12 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 16 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 6500<\/li><li>Time before the train carriages will need to be serviced: 39 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 27 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 11000<\/li><li>Time before the train carriages will need to be serviced: 66 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 38 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 15500<\/li><li>Time before the train carriages will need to be serviced: 93 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 50 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 20000<\/li><li>Time before the train carriages will need to be serviced: 120 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "explicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 3){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "high"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic1<\/td>\n<td style='text-align: left;'>Erectic2<\/td>\n<td style='text-align: left;'>Erectic3<\/td>\n<td style='text-align: left;'>Erectic4<\/td>\n<td style='text-align: left;'>Erectic5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 8 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 70%<\/li><li>Number of tenant expressions of interest: 100<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 26 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 227%<\/li><li>Number of tenant expressions of interest: 325<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 44 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 385%<\/li><li>Number of tenant expressions of interest: 550<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 62 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 542%<\/li><li>Number of tenant expressions of interest: 775<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 80 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 700%<\/li><li>Number of tenant expressions of interest: 1000<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic1<\/td>\n<td style='text-align: left;'>Erectic2<\/td>\n<td style='text-align: left;'>Erectic3<\/td>\n<td style='text-align: left;'>Erectic4<\/td>\n<td style='text-align: left;'>Erectic5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 8 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 70%<\/li><li>Number of tenant expressions of interest: 100<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 26 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 227%<\/li><li>Number of tenant expressions of interest: 325<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 44 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 385%<\/li><li>Number of tenant expressions of interest: 550<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 62 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 542%<\/li><li>Number of tenant expressions of interest: 775<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 80 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 700%<\/li><li>Number of tenant expressions of interest: 1000<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "explicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 4){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "high"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Codeck<\/td>\n<td style='text-align: left;'>Cweb<\/td>\n<td style='text-align: left;'>Digics<\/td>\n<td style='text-align: left;'>Techip<\/td>\n<td style='text-align: left;'>Zenix<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2750 lines a day<\/li><li>Security rating: 73%<\/li><li>Number of potential customers in first year: 4 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 2000 lines a day<\/li><li>Security rating: 66%<\/li><li>Number of potential customers in first year: 3 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 3500 lines a day<\/li><li>Security rating: 81%<\/li><li>Number of potential customers in first year: 5 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 4250 lines a day<\/li><li>Security rating: 88%<\/li><li>Number of potential customers in first year: 6 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 5000 lines a day<\/li><li>Security rating: 96%<\/li><li>Number of potential customers in first year: 8 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Codeck<\/td>\n<td style='text-align: left;'>Cweb<\/td>\n<td style='text-align: left;'>Digics<\/td>\n<td style='text-align: left;'>Techip<\/td>\n<td style='text-align: left;'>Zenix<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2750 lines a day<\/li><li>Security rating: 73%<\/li><li>Number of potential customers in first year: 4 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 2000 lines a day<\/li><li>Security rating: 66%<\/li><li>Number of potential customers in first year: 3 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 3500 lines a day<\/li><li>Security rating: 81%<\/li><li>Number of potential customers in first year: 5 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 4250 lines a day<\/li><li>Security rating: 88%<\/li><li>Number of potential customers in first year: 6 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 5000 lines a day<\/li><li>Security rating: 96%<\/li><li>Number of potential customers in first year: 8 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "explicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 5){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "high"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Pressbloom1<\/td>\n<td style='text-align: left;'>Pressbloom2<\/td>\n<td style='text-align: left;'>Pressbloom3<\/td>\n<td style='text-align: left;'>Pressbloom4<\/td>\n<td style='text-align: left;'>Pressbloom5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 50000 a day<\/li><li>Number of weekly advertisers: 80<\/li><li>Ink that is not discarded due to impurities: 5000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 162500 a day<\/li><li>Number of weekly advertisers: 260<\/li><li>Ink that is not discarded due to impurities: 16250L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 275000 a day<\/li><li>Number of weekly advertisers: 440<\/li><li>Ink that is not discarded due to impurities: 27500L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 387500 a day<\/li><li>Number of weekly advertisers: 620<\/li><li>Ink that is not discarded due to impurities: 38750L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 500000 a day<\/li><li>Number of weekly advertisers: 800<\/li><li>Ink that is not discarded due to impurities: 50000L a day<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 793-877.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 680-752.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 618-682.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 482-532.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 387-427.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Pressbloom1<\/td>\n<td style='text-align: left;'>Pressbloom2<\/td>\n<td style='text-align: left;'>Pressbloom3<\/td>\n<td style='text-align: left;'>Pressbloom4<\/td>\n<td style='text-align: left;'>Pressbloom5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 50000 a day<\/li><li>Number of weekly advertisers: 80<\/li><li>Ink that is not discarded due to impurities: 5000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 162500 a day<\/li><li>Number of weekly advertisers: 260<\/li><li>Ink that is not discarded due to impurities: 16250L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 275000 a day<\/li><li>Number of weekly advertisers: 440<\/li><li>Ink that is not discarded due to impurities: 27500L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 387500 a day<\/li><li>Number of weekly advertisers: 620<\/li><li>Ink that is not discarded due to impurities: 38750L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 500000 a day<\/li><li>Number of weekly advertisers: 800<\/li><li>Ink that is not discarded due to impurities: 50000L a day<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 125-1545.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 107-1325.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 98-1202.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 76-938.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 61-753.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "implicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 1){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "high"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Pharmacore1<\/td>\n<td style='text-align: left;'>Pharmacore2<\/td>\n<td style='text-align: left;'>Pharmacore3<\/td>\n<td style='text-align: left;'>Pharmacore4<\/td>\n<td style='text-align: left;'>Pharmacore5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 300000 an hour<\/li><li>Shelf life: 20 months<\/li><li>Probability of symptom reduction after a week: 90%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 975000 an hour<\/li><li>Shelf life: 65 months<\/li><li>Probability of symptom reduction after a week: 292%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 1650000 an hour<\/li><li>Shelf life: 110 months<\/li><li>Probability of symptom reduction after a week: 495%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 2325000 an hour<\/li><li>Shelf life: 155 months<\/li><li>Probability of symptom reduction after a week: 697%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 3000000 an hour<\/li><li>Shelf life: 200 months<\/li><li>Probability of symptom reduction after a week: 900%<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 793-877.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 680-752.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 618-682.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 482-532.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 387-427.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Pharmacore1<\/td>\n<td style='text-align: left;'>Pharmacore2<\/td>\n<td style='text-align: left;'>Pharmacore3<\/td>\n<td style='text-align: left;'>Pharmacore4<\/td>\n<td style='text-align: left;'>Pharmacore5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 300000 an hour<\/li><li>Shelf life: 20 months<\/li><li>Probability of symptom reduction after a week: 90%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 975000 an hour<\/li><li>Shelf life: 65 months<\/li><li>Probability of symptom reduction after a week: 292%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 1650000 an hour<\/li><li>Shelf life: 110 months<\/li><li>Probability of symptom reduction after a week: 495%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 2325000 an hour<\/li><li>Shelf life: 155 months<\/li><li>Probability of symptom reduction after a week: 697%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 3000000 an hour<\/li><li>Shelf life: 200 months<\/li><li>Probability of symptom reduction after a week: 900%<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 125-1545.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 107-1325.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 98-1202.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 76-938.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 61-753.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "implicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 2){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "high"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Railmont1<\/td>\n<td style='text-align: left;'>Railmont2<\/td>\n<td style='text-align: left;'>Railmont3<\/td>\n<td style='text-align: left;'>Railmont4<\/td>\n<td style='text-align: left;'>Railmont5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 5 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 2000<\/li><li>Time before the train carriages will need to be serviced: 12 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 16 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 6500<\/li><li>Time before the train carriages will need to be serviced: 39 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 27 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 11000<\/li><li>Time before the train carriages will need to be serviced: 66 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 38 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 15500<\/li><li>Time before the train carriages will need to be serviced: 93 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 50 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 20000<\/li><li>Time before the train carriages will need to be serviced: 120 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 793-877.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 680-752.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 618-682.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 482-532.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 387-427.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Railmont1<\/td>\n<td style='text-align: left;'>Railmont2<\/td>\n<td style='text-align: left;'>Railmont3<\/td>\n<td style='text-align: left;'>Railmont4<\/td>\n<td style='text-align: left;'>Railmont5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 5 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 2000<\/li><li>Time before the train carriages will need to be serviced: 12 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 16 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 6500<\/li><li>Time before the train carriages will need to be serviced: 39 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 27 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 11000<\/li><li>Time before the train carriages will need to be serviced: 66 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 38 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 15500<\/li><li>Time before the train carriages will need to be serviced: 93 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 50 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 20000<\/li><li>Time before the train carriages will need to be serviced: 120 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 125-1545.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 107-1325.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 98-1202.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 76-938.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 61-753.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "implicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 3){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "high"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic1<\/td>\n<td style='text-align: left;'>Erectic2<\/td>\n<td style='text-align: left;'>Erectic3<\/td>\n<td style='text-align: left;'>Erectic4<\/td>\n<td style='text-align: left;'>Erectic5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 8 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 70%<\/li><li>Number of tenant expressions of interest: 100<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 26 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 227%<\/li><li>Number of tenant expressions of interest: 325<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 44 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 385%<\/li><li>Number of tenant expressions of interest: 550<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 62 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 542%<\/li><li>Number of tenant expressions of interest: 775<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 80 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 700%<\/li><li>Number of tenant expressions of interest: 1000<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 793-877.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 680-752.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 618-682.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 482-532.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 387-427.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic1<\/td>\n<td style='text-align: left;'>Erectic2<\/td>\n<td style='text-align: left;'>Erectic3<\/td>\n<td style='text-align: left;'>Erectic4<\/td>\n<td style='text-align: left;'>Erectic5<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 8 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 70%<\/li><li>Number of tenant expressions of interest: 100<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 26 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 227%<\/li><li>Number of tenant expressions of interest: 325<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 44 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 385%<\/li><li>Number of tenant expressions of interest: 550<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 62 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 542%<\/li><li>Number of tenant expressions of interest: 775<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 80 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 700%<\/li><li>Number of tenant expressions of interest: 1000<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 125-1545.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 107-1325.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 98-1202.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 76-938.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 61-753.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "implicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 4){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "high"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Codeck<\/td>\n<td style='text-align: left;'>Cweb<\/td>\n<td style='text-align: left;'>Digics<\/td>\n<td style='text-align: left;'>Techip<\/td>\n<td style='text-align: left;'>Zenix<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2750 lines a day<\/li><li>Security rating: 73%<\/li><li>Number of potential customers in first year: 4 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 2000 lines a day<\/li><li>Security rating: 66%<\/li><li>Number of potential customers in first year: 3 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 3500 lines a day<\/li><li>Security rating: 81%<\/li><li>Number of potential customers in first year: 5 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 4250 lines a day<\/li><li>Security rating: 88%<\/li><li>Number of potential customers in first year: 6 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 5000 lines a day<\/li><li>Security rating: 96%<\/li><li>Number of potential customers in first year: 8 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 793-877.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 680-752.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 618-682.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 482-532.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 387-427.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Codeck<\/td>\n<td style='text-align: left;'>Cweb<\/td>\n<td style='text-align: left;'>Digics<\/td>\n<td style='text-align: left;'>Techip<\/td>\n<td style='text-align: left;'>Zenix<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2750 lines a day<\/li><li>Security rating: 73%<\/li><li>Number of potential customers in first year: 4 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 2000 lines a day<\/li><li>Security rating: 66%<\/li><li>Number of potential customers in first year: 3 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 3500 lines a day<\/li><li>Security rating: 81%<\/li><li>Number of potential customers in first year: 5 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 4250 lines a day<\/li><li>Security rating: 88%<\/li><li>Number of potential customers in first year: 6 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 5000 lines a day<\/li><li>Security rating: 96%<\/li><li>Number of potential customers in first year: 8 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 125-1545.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 107-1325.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 98-1202.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 76-938.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 61-753.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "implicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 5){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "high"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Cweb<\/td>\n<td style='text-align: left;'>Erectic1<\/td>\n<td style='text-align: left;'>Pharmacore1<\/td>\n<td style='text-align: left;'>Pressbloom1<\/td>\n<td style='text-align: left;'>Railmont1<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2000 lines a day<\/li><li>Security rating: 66%<\/li><li>Number of potential customers in first year: 3 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 8 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 70%<\/li><li>Number of tenant expressions of interest: 100<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 300000 an hour<\/li><li>Shelf life: 20 months<\/li><li>Probability of symptom reduction after a week: 90%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 50000 a day<\/li><li>Number of weekly advertisers: 80<\/li><li>Ink that is not discarded due to impurities: 5000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 5 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 2000<\/li><li>Time before the train carriages will need to be serviced: 12 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Cweb<\/td>\n<td style='text-align: left;'>Erectic1<\/td>\n<td style='text-align: left;'>Pharmacore1<\/td>\n<td style='text-align: left;'>Pressbloom1<\/td>\n<td style='text-align: left;'>Railmont1<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2000 lines a day<\/li><li>Security rating: 66%<\/li><li>Number of potential customers in first year: 3 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 8 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 70%<\/li><li>Number of tenant expressions of interest: 100<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 300000 an hour<\/li><li>Shelf life: 20 months<\/li><li>Probability of symptom reduction after a week: 90%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 50000 a day<\/li><li>Number of weekly advertisers: 80<\/li><li>Ink that is not discarded due to impurities: 5000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 5 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 2000<\/li><li>Time before the train carriages will need to be serviced: 12 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "explicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 1){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "low"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Codeck<\/td>\n<td style='text-align: left;'>Erectic2<\/td>\n<td style='text-align: left;'>Pharmacore2<\/td>\n<td style='text-align: left;'>Pressbloom2<\/td>\n<td style='text-align: left;'>Railmont2<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2750 lines a day<\/li><li>Security rating: 73%<\/li><li>Number of potential customers in first year: 4 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 26 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 227%<\/li><li>Number of tenant expressions of interest: 325<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 975000 an hour<\/li><li>Shelf life: 65 months<\/li><li>Probability of symptom reduction after a week: 292%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 162500 a day<\/li><li>Number of weekly advertisers: 260<\/li><li>Ink that is not discarded due to impurities: 16250L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 16 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 6500<\/li><li>Time before the train carriages will need to be serviced: 39 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Codeck<\/td>\n<td style='text-align: left;'>Erectic2<\/td>\n<td style='text-align: left;'>Pharmacore2<\/td>\n<td style='text-align: left;'>Pressbloom2<\/td>\n<td style='text-align: left;'>Railmont2<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2750 lines a day<\/li><li>Security rating: 73%<\/li><li>Number of potential customers in first year: 4 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 26 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 227%<\/li><li>Number of tenant expressions of interest: 325<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 975000 an hour<\/li><li>Shelf life: 65 months<\/li><li>Probability of symptom reduction after a week: 292%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 162500 a day<\/li><li>Number of weekly advertisers: 260<\/li><li>Ink that is not discarded due to impurities: 16250L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 16 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 6500<\/li><li>Time before the train carriages will need to be serviced: 39 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "explicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 2){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "low"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Digics<\/td>\n<td style='text-align: left;'>Erectic3<\/td>\n<td style='text-align: left;'>Pharmacore3<\/td>\n<td style='text-align: left;'>Pressbloom3<\/td>\n<td style='text-align: left;'>Railmont3<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 3500 lines a day<\/li><li>Security rating: 81%<\/li><li>Number of potential customers in first year: 5 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 44 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 385%<\/li><li>Number of tenant expressions of interest: 550<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 1650000 an hour<\/li><li>Shelf life: 110 months<\/li><li>Probability of symptom reduction after a week: 495%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 275000 a day<\/li><li>Number of weekly advertisers: 440<\/li><li>Ink that is not discarded due to impurities: 27500L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 27 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 11000<\/li><li>Time before the train carriages will need to be serviced: 66 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Digics<\/td>\n<td style='text-align: left;'>Erectic3<\/td>\n<td style='text-align: left;'>Pharmacore3<\/td>\n<td style='text-align: left;'>Pressbloom3<\/td>\n<td style='text-align: left;'>Railmont3<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 3500 lines a day<\/li><li>Security rating: 81%<\/li><li>Number of potential customers in first year: 5 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 44 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 385%<\/li><li>Number of tenant expressions of interest: 550<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 1650000 an hour<\/li><li>Shelf life: 110 months<\/li><li>Probability of symptom reduction after a week: 495%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 275000 a day<\/li><li>Number of weekly advertisers: 440<\/li><li>Ink that is not discarded due to impurities: 27500L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 27 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 11000<\/li><li>Time before the train carriages will need to be serviced: 66 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "explicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 3){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "low"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic4<\/td>\n<td style='text-align: left;'>Pharmacore4<\/td>\n<td style='text-align: left;'>Pressbloom4<\/td>\n<td style='text-align: left;'>Railmont4<\/td>\n<td style='text-align: left;'>Techip<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 62 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 542%<\/li><li>Number of tenant expressions of interest: 775<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 2325000 an hour<\/li><li>Shelf life: 155 months<\/li><li>Probability of symptom reduction after a week: 697%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 387500 a day<\/li><li>Number of weekly advertisers: 620<\/li><li>Ink that is not discarded due to impurities: 38750L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 38 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 15500<\/li><li>Time before the train carriages will need to be serviced: 93 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 4250 lines a day<\/li><li>Security rating: 88%<\/li><li>Number of potential customers in first year: 6 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic4<\/td>\n<td style='text-align: left;'>Pharmacore4<\/td>\n<td style='text-align: left;'>Pressbloom4<\/td>\n<td style='text-align: left;'>Railmont4<\/td>\n<td style='text-align: left;'>Techip<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 62 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 542%<\/li><li>Number of tenant expressions of interest: 775<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 2325000 an hour<\/li><li>Shelf life: 155 months<\/li><li>Probability of symptom reduction after a week: 697%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 387500 a day<\/li><li>Number of weekly advertisers: 620<\/li><li>Ink that is not discarded due to impurities: 38750L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 38 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 15500<\/li><li>Time before the train carriages will need to be serviced: 93 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 4250 lines a day<\/li><li>Security rating: 88%<\/li><li>Number of potential customers in first year: 6 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "explicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 4){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "low"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic5<\/td>\n<td style='text-align: left;'>Pharmacore5<\/td>\n<td style='text-align: left;'>Pressbloom5<\/td>\n<td style='text-align: left;'>Railmont5<\/td>\n<td style='text-align: left;'>Zenix<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 80 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 700%<\/li><li>Number of tenant expressions of interest: 1000<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 3000000 an hour<\/li><li>Shelf life: 200 months<\/li><li>Probability of symptom reduction after a week: 900%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 500000 a day<\/li><li>Number of weekly advertisers: 800<\/li><li>Ink that is not discarded due to impurities: 50000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 50 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 20000<\/li><li>Time before the train carriages will need to be serviced: 120 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 5000 lines a day<\/li><li>Security rating: 96%<\/li><li>Number of potential customers in first year: 8 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is a <b>reliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic5<\/td>\n<td style='text-align: left;'>Pharmacore5<\/td>\n<td style='text-align: left;'>Pressbloom5<\/td>\n<td style='text-align: left;'>Railmont5<\/td>\n<td style='text-align: left;'>Zenix<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 80 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 700%<\/li><li>Number of tenant expressions of interest: 1000<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 3000000 an hour<\/li><li>Shelf life: 200 months<\/li><li>Probability of symptom reduction after a week: 900%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 500000 a day<\/li><li>Number of weekly advertisers: 800<\/li><li>Ink that is not discarded due to impurities: 50000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 50 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 20000<\/li><li>Time before the train carriages will need to be serviced: 120 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 5000 lines a day<\/li><li>Security rating: 96%<\/li><li>Number of potential customers in first year: 8 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million. <br>(In this particular industry, NPV is an <b>unreliable<\/b> predictor of project success.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "explicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 5){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "low"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Cweb<\/td>\n<td style='text-align: left;'>Erectic1<\/td>\n<td style='text-align: left;'>Pharmacore1<\/td>\n<td style='text-align: left;'>Pressbloom1<\/td>\n<td style='text-align: left;'>Railmont1<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2000 lines a day<\/li><li>Security rating: 66%<\/li><li>Number of potential customers in first year: 3 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 8 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 70%<\/li><li>Number of tenant expressions of interest: 100<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 300000 an hour<\/li><li>Shelf life: 20 months<\/li><li>Probability of symptom reduction after a week: 90%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 50000 a day<\/li><li>Number of weekly advertisers: 80<\/li><li>Ink that is not discarded due to impurities: 5000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 5 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 2000<\/li><li>Time before the train carriages will need to be serviced: 12 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 793-877.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 680-752.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 618-682.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 482-532.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 387-427.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Cweb<\/td>\n<td style='text-align: left;'>Erectic1<\/td>\n<td style='text-align: left;'>Pharmacore1<\/td>\n<td style='text-align: left;'>Pressbloom1<\/td>\n<td style='text-align: left;'>Railmont1<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2000 lines a day<\/li><li>Security rating: 66%<\/li><li>Number of potential customers in first year: 3 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 8 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 70%<\/li><li>Number of tenant expressions of interest: 100<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 300000 an hour<\/li><li>Shelf life: 20 months<\/li><li>Probability of symptom reduction after a week: 90%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 50000 a day<\/li><li>Number of weekly advertisers: 80<\/li><li>Ink that is not discarded due to impurities: 5000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 5 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 2000<\/li><li>Time before the train carriages will need to be serviced: 12 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 125-1545.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 107-1325.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 98-1202.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 76-938.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 61-753.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "implicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 1){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "low"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Codeck<\/td>\n<td style='text-align: left;'>Erectic2<\/td>\n<td style='text-align: left;'>Pharmacore2<\/td>\n<td style='text-align: left;'>Pressbloom2<\/td>\n<td style='text-align: left;'>Railmont2<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2750 lines a day<\/li><li>Security rating: 73%<\/li><li>Number of potential customers in first year: 4 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 26 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 227%<\/li><li>Number of tenant expressions of interest: 325<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 975000 an hour<\/li><li>Shelf life: 65 months<\/li><li>Probability of symptom reduction after a week: 292%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 162500 a day<\/li><li>Number of weekly advertisers: 260<\/li><li>Ink that is not discarded due to impurities: 16250L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 16 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 6500<\/li><li>Time before the train carriages will need to be serviced: 39 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 793-877.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 680-752.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 618-682.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 482-532.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 387-427.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Codeck<\/td>\n<td style='text-align: left;'>Erectic2<\/td>\n<td style='text-align: left;'>Pharmacore2<\/td>\n<td style='text-align: left;'>Pressbloom2<\/td>\n<td style='text-align: left;'>Railmont2<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 2750 lines a day<\/li><li>Security rating: 73%<\/li><li>Number of potential customers in first year: 4 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 26 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 227%<\/li><li>Number of tenant expressions of interest: 325<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 975000 an hour<\/li><li>Shelf life: 65 months<\/li><li>Probability of symptom reduction after a week: 292%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 162500 a day<\/li><li>Number of weekly advertisers: 260<\/li><li>Ink that is not discarded due to impurities: 16250L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 16 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 6500<\/li><li>Time before the train carriages will need to be serviced: 39 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 125-1545.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 107-1325.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 98-1202.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 76-938.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 61-753.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "implicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 2){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "low"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Digics<\/td>\n<td style='text-align: left;'>Erectic3<\/td>\n<td style='text-align: left;'>Pharmacore3<\/td>\n<td style='text-align: left;'>Pressbloom3<\/td>\n<td style='text-align: left;'>Railmont3<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 3500 lines a day<\/li><li>Security rating: 81%<\/li><li>Number of potential customers in first year: 5 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 44 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 385%<\/li><li>Number of tenant expressions of interest: 550<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 1650000 an hour<\/li><li>Shelf life: 110 months<\/li><li>Probability of symptom reduction after a week: 495%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 275000 a day<\/li><li>Number of weekly advertisers: 440<\/li><li>Ink that is not discarded due to impurities: 27500L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 27 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 11000<\/li><li>Time before the train carriages will need to be serviced: 66 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 793-877.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 680-752.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 618-682.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 482-532.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 387-427.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Digics<\/td>\n<td style='text-align: left;'>Erectic3<\/td>\n<td style='text-align: left;'>Pharmacore3<\/td>\n<td style='text-align: left;'>Pressbloom3<\/td>\n<td style='text-align: left;'>Railmont3<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>software<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>Code written: 3500 lines a day<\/li><li>Security rating: 81%<\/li><li>Number of potential customers in first year: 5 million<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 44 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 385%<\/li><li>Number of tenant expressions of interest: 550<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 1650000 an hour<\/li><li>Shelf life: 110 months<\/li><li>Probability of symptom reduction after a week: 495%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 275000 a day<\/li><li>Number of weekly advertisers: 440<\/li><li>Ink that is not discarded due to impurities: 27500L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 27 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 11000<\/li><li>Time before the train carriages will need to be serviced: 66 years<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 125-1545.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 107-1325.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 98-1202.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 76-938.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 61-753.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "implicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 3){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "low"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic4<\/td>\n<td style='text-align: left;'>Pharmacore4<\/td>\n<td style='text-align: left;'>Pressbloom4<\/td>\n<td style='text-align: left;'>Railmont4<\/td>\n<td style='text-align: left;'>Techip<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 62 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 542%<\/li><li>Number of tenant expressions of interest: 775<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 2325000 an hour<\/li><li>Shelf life: 155 months<\/li><li>Probability of symptom reduction after a week: 697%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 387500 a day<\/li><li>Number of weekly advertisers: 620<\/li><li>Ink that is not discarded due to impurities: 38750L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 38 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 15500<\/li><li>Time before the train carriages will need to be serviced: 93 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 4250 lines a day<\/li><li>Security rating: 88%<\/li><li>Number of potential customers in first year: 6 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 793-877.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 680-752.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 618-682.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 482-532.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 387-427.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic4<\/td>\n<td style='text-align: left;'>Pharmacore4<\/td>\n<td style='text-align: left;'>Pressbloom4<\/td>\n<td style='text-align: left;'>Railmont4<\/td>\n<td style='text-align: left;'>Techip<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 62 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 542%<\/li><li>Number of tenant expressions of interest: 775<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 2325000 an hour<\/li><li>Shelf life: 155 months<\/li><li>Probability of symptom reduction after a week: 697%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 387500 a day<\/li><li>Number of weekly advertisers: 620<\/li><li>Ink that is not discarded due to impurities: 38750L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 38 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 15500<\/li><li>Time before the train carriages will need to be serviced: 93 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 4250 lines a day<\/li><li>Security rating: 88%<\/li><li>Number of potential customers in first year: 6 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 125-1545.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 107-1325.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 98-1202.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 76-938.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 61-753.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "implicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 4){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "low"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "timeline": [
                        {
                          "type": ["survey-html-form2"],
                          "html": jsPsych.timelineVariable('allocation_table'),
                          "data": {
                            "stage": ["project_allocation"]
                          }
                        }
                      ],
                      "timeline_variables": [
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic5<\/td>\n<td style='text-align: left;'>Pharmacore5<\/td>\n<td style='text-align: left;'>Pressbloom5<\/td>\n<td style='text-align: left;'>Railmont5<\/td>\n<td style='text-align: left;'>Zenix<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 80 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 700%<\/li><li>Number of tenant expressions of interest: 1000<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 3000000 an hour<\/li><li>Shelf life: 200 months<\/li><li>Probability of symptom reduction after a week: 900%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 500000 a day<\/li><li>Number of weekly advertisers: 800<\/li><li>Ink that is not discarded due to impurities: 50000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 50 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 20000<\/li><li>Time before the train carriages will need to be serviced: 120 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 5000 lines a day<\/li><li>Security rating: 96%<\/li><li>Number of potential customers in first year: 8 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 793-877.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 680-752.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 618-682.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 482-532.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 387-427.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        },
                        {
                          "allocation_table": ["<table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;'  id='allocation_task'>\n<thead>\n<tr>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>name<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project1<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project2<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project3<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project4<\/th>\n<th style='font-weight: 900; border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: left;'>Project5<\/th>\n<\/tr>\n<\/thead>\n<tbody>\n<tr>\n<td style='text-align: left;'>business_name<\/td>\n<td style='text-align: left;'>Erectic5<\/td>\n<td style='text-align: left;'>Pharmacore5<\/td>\n<td style='text-align: left;'>Pressbloom5<\/td>\n<td style='text-align: left;'>Railmont5<\/td>\n<td style='text-align: left;'>Zenix<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>project_type<\/td>\n<td style='text-align: left;'>high-rise construction<\/td>\n<td style='text-align: left;'>pharmaceutical<\/td>\n<td style='text-align: left;'>national newspaper<\/td>\n<td style='text-align: left;'>railway<\/td>\n<td style='text-align: left;'>software<\/td>\n<\/tr>\n<tr>\n<td style='text-align: left;'>html<\/td>\n<td style='text-align: left;'><ul><li>High-rises built: 80 a year<\/li><li>Probability that the builders complete construction within a month of the due date: 700%<\/li><li>Number of tenant expressions of interest: 1000<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Pills pressed: 3000000 an hour<\/li><li>Shelf life: 200 months<\/li><li>Probability of symptom reduction after a week: 900%<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Newspapers printed: 500000 a day<\/li><li>Number of weekly advertisers: 800<\/li><li>Ink that is not discarded due to impurities: 50000L a day<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Railway lines built: 50 a decade<\/li><li>Number of seats filled by paying customers at peak hour: 20000<\/li><li>Time before the train carriages will need to be serviced: 120 years<\/li><\/ul><\/td>\n<td style='text-align: left;'><ul><li>Code written: 5000 lines a day<\/li><li>Security rating: 96%<\/li><li>Number of potential customers in first year: 8 million<\/li><\/ul><\/td>\n<\/tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: left;'>npv<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>835 million.<br>(Midpoint: 125-1545.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>716 million.<br>(Midpoint: 107-1325.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>650 million.<br>(Midpoint: 98-1202.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>507 million.<br>(Midpoint: 76-938.)<\/td>\n<td style='border-bottom: 2px solid grey; text-align: left;'>407 million.<br>(Midpoint: 61-753.)<\/td>\n<\/tr>\n<\/tbody>\n<\/table>"]
                        }
                      ]
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.reliability_type == "implicit"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 5){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.alignment == "low"){
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
  "preload_images": ["resource/image/consent.png", "resource/image/debrief1.png", "resource/image/debrief2.png", "resource/image/distribution_20.png", "resource/image/distribution.png", "resource/image/gambles_plot_experiment2.png", "resource/image/gambles_plot_experiment3.png", "resource/image/gambles_plot_experiment4.png", "resource/image/pis1_prolific.png", "resource/image/pis1_sona.png", "resource/image/pis2_prolific.png", "resource/image/pis2_sona.png", "resource/image/pis3_prolific.png", "resource/image/pis3_sona.png"],
  "on_finish": function() {
      safe_to_close_window = true; // turn off verifyClose()
      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'SaveToDatabase.aspx'); // change 'write_data.php' to point to php script.
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        if (xhr.status == 200) {
          var response = JSON.parse(xhr.responseText);
          console.log(response.success);
        }
      };
      xhr.send(jsPsych.data.get().json());
      setTimeout('location.replace("https://app.prolific.co/submissions/complete?cc=8256C4AC");', 10000);
    }
}
);
