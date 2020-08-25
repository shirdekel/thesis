var safe_to_close_window = false;
function verifyClose() {
  if (safe_to_close_window == false) {
    event.returnValue = "Are you sure you want to exit? Your data has not been saved yet.";
  }
}
window.onbeforeunload = verifyClose;

var awareness_condition, project_variation_condition, urlvar;

project_variation_condition = jsPsych.randomization.sampleWithReplacement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1);

awareness_condition = jsPsych.randomization.sampleWithoutReplacement(['naive', 'aware'], 1)[0];

urlvar = jsPsych.data.urlVariables();

if (typeof urlvar.project_variation !== 'undefined') {
  project_variation_condition = urlvar.project_variation;
}

if (typeof urlvar.awareness !== 'undefined') {
  awareness_condition = urlvar.awareness;
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
  "experiment": ["aggregation_exp4"],
  "sample": ["prolific"],
  "similarity": 'low',
  "distribution": 'absent',
  "awareness": awareness_condition,
  "presentation": 'separate',
  "project_variation": project_variation_condition,
  "current_project_choice_order": 1
});

var timeline = {
  "timeline": [
    {
      "timeline": [
        {
          "type": ["html-button-response"],
          "stimulus": ["test"],
          "choices": ["button 0", "button 1", "button 2"],
          "margin_vertical": ["0px"],
          "margin_horizontal": ["8px"],
          "response_ends_trial": true,
          "post_trial_gap": [0]
        },
        {
          "timeline": [
            {
              "type": ["instructions"],
              "pages": ["We will now give you the instructions for the task. Use the arrow buttons to browse these instructions", "<div>\n  <p>Imagine that you are an executive in a large company composed of many individual businesses. You need to make decisions about projects that come across your desk.<\/p>\n  <p>Imagine that making a good investment decision will result in you receiving a generous bonus and a potential promotion, and that doing poorly will result in you receiving a large pay cut and a potential demotion. We want to know what choices you would actually make in this scenario.<\/p>\n<\/div>", "Press the 'Next' button to begin."],
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
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
        },
        {
          "timeline": [
            {
              "type": ["instructions"],
              "pages": ["We will now give you the instructions for the task. Use the arrow buttons to browse these instructions", "<div>\n  <p>Imagine that you are an executive in a large company composed of many individual businesses. You need to make decisions about projects that come across your desk.<\/p>\n  <p>Imagine that making good investment decisions will result in you receiving a generous bonus and a potential promotion, and that doing poorly will result in you receiving a large pay cut and a potential demotion. We want to know what choices you would actually make in these scenarios.<\/p>\n  <p>There will be 20 projects that you will make decisions on this quarter.<\/p>\n<\/div>", "Press the 'Next' button to begin."],
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
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
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
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of one project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Calgary, Canada in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Calgary-Canada_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current aerospace market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_aerospace_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their folk music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_folk_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a steel export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_steel_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of greek restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_greek_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about celebrity gossip","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_celebrity-gossip_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat angina","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_angina_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Dhaka Division, Bangladesh","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Dhaka-Division-Bangladesh_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified virus resistant orange","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_virus-resistant-orange_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 45-storey high-rise with a core and outrigger structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_45-core-and-outrigger_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Aberdeen, UK in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Aberdeen-UK_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current GPS tracking device market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_GPS-tracking-device_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their latin music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_latin_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wool export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_wool_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of buffet restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_buffet_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about foreign affairs","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_foreign-affairs_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Chronic kidney disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Chronic-kidney-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Oaxaca, Mexico","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Oaxaca-Mexico_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified bacteria for clean fuel development","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_bacteria-for-clean-fuel-development_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 55-storey high-rise with a tube structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_55-tube_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
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
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of one project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Daqing-China_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_microwave_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their R&B music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_R&B_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a kitchenware export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_kitchenware_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of mexican restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_mexican_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about fashion","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_fashion_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Sickle-cell-disease_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in California, USA","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_California-USA_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified trout with increased growth rate","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_trout-with-increased-growth-rate_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 20-storey high-rise with a rigid frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_20-rigid-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Houston, US in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Houston-US_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current personal computer market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_personal-computer_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their hip hop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_hip-hop_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a motorbike export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_motorbike_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of italian restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_italian_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about electronics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_electronics_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat leukaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_leukaemia_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Guangdong, China","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Guangdong-China_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified potato crop enriched with Vitamin A","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_potato-crop-enriched-with-Vitamin-A_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 10-storey high-rise with a coupled wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_10-coupled-wall_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
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
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of one project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_car-controls_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_soul_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_thai_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_indie-rock_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_business_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
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
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of one project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Basra-Iraq_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_gaming-console_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their heavy metal music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_heavy-metal_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wrist watch export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_wrist-watch_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of barbeque restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_barbeque_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about science","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_science_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat hypertension","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_hypertension_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Minas Gerais, Brazil","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Minas-Gerais-Brazil_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified herbicide tolerant melon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_herbicide-tolerant-melon_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 35-storey high-rise with a shear wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_35-shear-wall_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_car-controls_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_soul_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_thai_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
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
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of one project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_car-controls_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_soul_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_thai_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_indie-rock_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_business_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
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
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of one project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_indie-rock_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_business_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_car-controls_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_soul_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_thai_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 6){
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
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of one project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Kuala Lumpur, Malaysia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Kuala-Lumpur-Malaysia_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current smartphone market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_smartphone_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their classical music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_classical_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wheat export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_wheat_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of burger restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_burger_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about politics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_politics_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat anaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_anaemia_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Uttar Pradesh, India","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Uttar-Pradesh-India_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified tomato crop that induces a Hepatitis B immune response","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_tomato-crop-that-induces-a-Hepatitis-B-immune-response_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 15-storey high-rise with a flat plate and flat slab structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_15-flat-plate-and-flat-slab_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Houston, US in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Houston-US_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current personal computer market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_personal-computer_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their hip hop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_hip-hop_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a motorbike export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_motorbike_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of italian restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_italian_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about electronics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_electronics_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat leukaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_leukaemia_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Guangdong, China","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Guangdong-China_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified potato crop enriched with Vitamin A","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_potato-crop-enriched-with-Vitamin-A_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 10-storey high-rise with a coupled wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_10-coupled-wall_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 7){
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
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of one project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Calgary, Canada in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Calgary-Canada_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current aerospace market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_aerospace_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their folk music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_folk_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a steel export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_steel_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of greek restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_greek_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about celebrity gossip","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_celebrity-gossip_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat angina","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_angina_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Dhaka Division, Bangladesh","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Dhaka-Division-Bangladesh_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified virus resistant orange","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_virus-resistant-orange_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 45-storey high-rise with a core and outrigger structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_45-core-and-outrigger_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Basra-Iraq_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_gaming-console_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their heavy metal music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_heavy-metal_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wrist watch export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_wrist-watch_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of barbeque restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_barbeque_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about science","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_science_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat hypertension","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_hypertension_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Minas Gerais, Brazil","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Minas-Gerais-Brazil_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified herbicide tolerant melon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_herbicide-tolerant-melon_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 35-storey high-rise with a shear wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_35-shear-wall_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 8){
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
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of one project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_car-controls_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_soul_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_thai_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Basra-Iraq_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_gaming-console_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their heavy metal music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_heavy-metal_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wrist watch export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_wrist-watch_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of barbeque restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_barbeque_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about science","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_science_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat hypertension","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_hypertension_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Minas Gerais, Brazil","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Minas-Gerais-Brazil_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified herbicide tolerant melon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_herbicide-tolerant-melon_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 35-storey high-rise with a shear wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_35-shear-wall_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 9){
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
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": ["<div>\n  <p>Below is a description of one project.<\/p>\n  <p>Indicate below whether you would invest in the project:<\/p>\n<\/div>"],
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_indie-rock_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_business_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Omsk, Siberia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Omsk-Siberia_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current medical imaging machine market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_medical-imaging-machine_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their electronic music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_electronic_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a flat-screen TV export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_flat-screen-TV_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of seafood restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_seafood_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about current affairs","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_current-affairs_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Chronic lower respiratory disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Chronic-lower-respiratory-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Krasnodar Krai, Russia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Krasnodar-Krai-Russia_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified sunflower oil with healthier fatty acid composition","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_sunflower-oil-with-healthier-fatty-acid-composition_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 50-storey high-rise with a hybrid structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_50-hybrid_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "naive"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 10){
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
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Calgary, Canada in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Calgary-Canada_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current aerospace market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_aerospace_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their folk music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_folk_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a steel export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_steel_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of greek restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_greek_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about celebrity gossip","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_celebrity-gossip_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat angina","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_angina_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Dhaka Division, Bangladesh","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Dhaka-Division-Bangladesh_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified virus resistant orange","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_virus-resistant-orange_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 45-storey high-rise with a core and outrigger structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_45-core-and-outrigger_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Aberdeen, UK in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Aberdeen-UK_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current GPS tracking device market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_GPS-tracking-device_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their latin music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_latin_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wool export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_wool_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of buffet restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_buffet_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about foreign affairs","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_foreign-affairs_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Chronic kidney disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Chronic-kidney-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Oaxaca, Mexico","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Oaxaca-Mexico_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified bacteria for clean fuel development","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_bacteria-for-clean-fuel-development_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 55-storey high-rise with a tube structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_55-tube_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
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
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Daqing-China_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_microwave_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their R&B music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_R&B_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a kitchenware export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_kitchenware_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of mexican restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_mexican_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about fashion","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_fashion_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Sickle-cell-disease_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in California, USA","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_California-USA_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified trout with increased growth rate","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_trout-with-increased-growth-rate_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 20-storey high-rise with a rigid frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_20-rigid-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Houston, US in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Houston-US_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current personal computer market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_personal-computer_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their hip hop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_hip-hop_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a motorbike export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_motorbike_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of italian restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_italian_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about electronics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_electronics_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat leukaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_leukaemia_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Guangdong, China","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Guangdong-China_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified potato crop enriched with Vitamin A","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_potato-crop-enriched-with-Vitamin-A_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 10-storey high-rise with a coupled wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_10-coupled-wall_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
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
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_car-controls_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_soul_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_thai_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_indie-rock_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_business_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
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
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Basra-Iraq_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_gaming-console_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their heavy metal music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_heavy-metal_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wrist watch export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_wrist-watch_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of barbeque restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_barbeque_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about science","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_science_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat hypertension","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_hypertension_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Minas Gerais, Brazil","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Minas-Gerais-Brazil_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified herbicide tolerant melon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_herbicide-tolerant-melon_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 35-storey high-rise with a shear wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_35-shear-wall_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_car-controls_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_soul_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_thai_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
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
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_car-controls_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_soul_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_thai_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_indie-rock_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_business_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
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
        },
        {
          "timeline": [
            {
              "timeline": [
                {
                  "timeline": [
                    {
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_indie-rock_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_business_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_car-controls_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_soul_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_thai_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 6){
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
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Kuala Lumpur, Malaysia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Kuala-Lumpur-Malaysia_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current smartphone market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_smartphone_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their classical music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_classical_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wheat export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_wheat_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of burger restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_burger_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about politics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_politics_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat anaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_anaemia_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Uttar Pradesh, India","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Uttar-Pradesh-India_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified tomato crop that induces a Hepatitis B immune response","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_tomato-crop-that-induces-a-Hepatitis-B-immune-response_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 15-storey high-rise with a flat plate and flat slab structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_15-flat-plate-and-flat-slab_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Houston, US in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Houston-US_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current personal computer market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_personal-computer_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their hip hop music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_hip-hop_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a motorbike export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_motorbike_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of italian restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_italian_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about electronics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_electronics_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat leukaemia","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_leukaemia_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Guangdong, China","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Guangdong-China_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified potato crop enriched with Vitamin A","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_potato-crop-enriched-with-Vitamin-A_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 10-storey high-rise with a coupled wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_10-coupled-wall_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 7){
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
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Calgary, Canada in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Calgary-Canada_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current aerospace market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_aerospace_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their folk music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_folk_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a steel export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_steel_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of greek restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_greek_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about celebrity gossip","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_celebrity-gossip_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat angina","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_angina_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Dhaka Division, Bangladesh","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Dhaka-Division-Bangladesh_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified virus resistant orange","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_virus-resistant-orange_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 45-storey high-rise with a core and outrigger structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_45-core-and-outrigger_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Basra-Iraq_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_gaming-console_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their heavy metal music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_heavy-metal_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wrist watch export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_wrist-watch_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of barbeque restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_barbeque_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about science","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_science_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat hypertension","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_hypertension_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Minas Gerais, Brazil","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Minas-Gerais-Brazil_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified herbicide tolerant melon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_herbicide-tolerant-melon_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 35-storey high-rise with a shear wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_35-shear-wall_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 8){
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
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Abu-Dhabi-UAE_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_car-controls_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_soul_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_liquor_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_thai_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_Christian-topics_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Hunter-syndrome_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_West-Java-Indonesia_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_corn-crop-with-faster-maturation_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_25-infilled-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_offshore-Basra-Iraq_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_gaming-console_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their heavy metal music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_heavy-metal_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wrist watch export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_wrist-watch_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of barbeque restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_barbeque_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about science","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_science_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat hypertension","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_hypertension_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Minas Gerais, Brazil","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Minas-Gerais-Brazil_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified herbicide tolerant melon","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_herbicide-tolerant-melon_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 35-storey high-rise with a shear wall structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_35-shear-wall_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 9){
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
                      "type": ["survey-multi-choice"],
                      "questions": [
                        {
                          "prompt": jsPsych.timelineVariable('prompt'),
                          "options": ["Yes", "No"],
                          "horizontal": false,
                          "required": true,
                          "name": jsPsych.timelineVariable('name')
                        }
                      ],
                      "randomize_question_order": false,
                      "preamble": function() {
        preamble_awareness = '<div><p>Below is a description of project ' +
        jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0] +
        ' of 20.</p><p>Indicate below whether you would invest in the project:</p></div>'
        return preamble_awareness
        },
                      "button_label": ["Continue"],
                      "required_message": ["You must choose at least one response for this question"],
                      "post_trial_gap": [0],
                      "on_finish": function() {
        current_project_choice_order_value = 1 + jsPsych.data.getLastTrialData().select('current_project_choice_order').values[0];
        jsPsych.data.addProperties({
        current_project_choice_order: current_project_choice_order_value
        });
        },
                      "data": {
                        "stage": ["project_choice"]
                      }
                    }
                  ],
                  "timeline_variables": [
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $190 million and a 70% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_190_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $120 million and a 40% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_DSLR-camera_120_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their indie rock music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $90 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $150 million and a 45% chance of losing $90 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_indie-rock_150_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a power tools export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $105 million and a 30% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_power-tools_105_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of chinese restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $140 million and a 40% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_chinese_140_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about business","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise this investment, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_business_110_240_0.7"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_immune-dysregulation_190_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Punjab, Pakistan","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $55 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 25% chance that these forecasts are accurate","To summarise this investment, there is a 25% chance of gaining $185 million and a 75% chance of losing $55 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Punjab-Pakistan_185_240_0.25"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $115 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $125 million and a 35% chance of losing $115 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_125_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 30-storey high-rise with a braced frame structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $120 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $120 million and a 45% chance of losing $120 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_30-braced-frame_120_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Omsk, Siberia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Refinera's research team has been investigating a possible site in an as yet unexplored area. Due to the location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $75 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $165 million and a 55% chance of losing $75 million on this investment"], 1).join('. ') + '.',
                      "name": ["oil-well_onshore-Omsk-Siberia_165_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current medical imaging machine market","Microxy's research team has been investigating the necessary components and infrastructure. Due to the complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $155 million and a 45% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["microchip_medical-imaging-machine_155_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their electronic music market","Vital Records's research team has been investigating the necessary production and promotion. Due to the recording time, marketing requirements, and producer fees, they forecast the entire project to cost $70 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $170 million and a 55% chance of losing $70 million on this investment"], 1).join('. ') + '.',
                      "name": ["record-deal_electronic_170_240_0.45"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a flat-screen TV export market","Logivia's research team has been investigating the relevant storage and insurance requirements. Due to the median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $45 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise this investment, there is a 30% chance of gaining $195 million and a 70% chance of losing $45 million on this investment"], 1).join('. ') + '.',
                      "name": ["shipping-logistics_flat-screen-TV_195_240_0.3"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of seafood restaurants","Savoro's research team has been investigating the relevant food and marketing requirements. Due to the menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $65 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise this investment, there is a 35% chance of gaining $175 million and a 65% chance of losing $65 million on this investment"], 1).join('. ') + '.',
                      "name": ["restaurant-chain_seafood_175_240_0.35"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about current affairs","Grown Media's research team has been investigating the relevant print and distribution requirements. Due to the printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                      "name": ["national-newspaper_current-affairs_130_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Chronic lower respiratory disease","Biotechly's research team has been investigating the necessary testing and laboratory requirements. Due to the chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 60% chance that these forecasts are accurate","To summarise this investment, there is a 60% chance of gaining $135 million and a 40% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["pharmaceutical_Chronic-lower-respiratory-disease_135_240_0.6"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Krasnodar Krai, Russia","FreightCog's research team has been investigating the required track construction and electrification system relevant to the region. Due to the material and insurance costs, and construction worker salaries, they forecast the entire project to cost $105 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise this investment, there is a 55% chance of gaining $135 million and a 45% chance of losing $105 million on this investment"], 1).join('. ') + '.',
                      "name": ["railway_Krasnodar-Krai-Russia_135_240_0.55"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified sunflower oil with healthier fatty acid composition","Evogenic's research team has been investigating the relevant gene to be modified and potential environmental impact. Due to the cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $135 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise this investment, there is a 65% chance of gaining $105 million and a 35% chance of losing $135 million on this investment"], 1).join('. ') + '.',
                      "name": ["GMO_sunflower-oil-with-healthier-fatty-acid-composition_105_240_0.65"]
                    },
                    {
                      "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 50-storey high-rise with a hybrid structural system","Erectic's research team has been investigating the relevant geotechnical and construction requirements. Due to the material and land costs, and engineering firm contracts, they forecast the entire project to cost $85 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 45% chance that these forecasts are accurate","To summarise this investment, there is a 45% chance of gaining $155 million and a 55% chance of losing $85 million on this investment"], 1).join('. ') + '.',
                      "name": ["high-rise-construction_50-hybrid_155_240_0.45"]
                    }
                  ],
                  "randomize_order": [true]
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.awareness == "aware"){
        return true;
      } else {
        return false;
      }
    }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.project_variation == 10){
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
          "type": ["survey-html-form"],
          "html": ["<p>\n  <p>\n    <label for=\"project_number\">In total, how many projects did you just see?<\/label>\n  <\/p>\n  \n  <input type=\"number\" id=\"project_number\" name=\"project_number\" min=\"0\" max=\"20\" required style=\"width:70px\"/>\n  projects\n<\/p>"],
          "data": {
            "stage": ["project_number"]
          }
        },
        {
          "timeline": [
            {
              "type": ["html-button-response"],
              "stimulus": ["<p>\n  <strong>Consider all the projects you saw. If you had to choose between investing in all of them, or investing in none of them, which would you choose?<\/strong>\n<\/p>"],
              "choices": ["Invest in all of the projects", "Invest in none of the projects"],
              "margin_vertical": ["0px"],
              "margin_horizontal": ["8px"],
              "response_ends_trial": true,
              "post_trial_gap": [0],
              "data": {
                "stage": ["portfolio_binary"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.distribution == "absent"){
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
              "html": ["<p>\n  <p>\n    <label for=\"portfolio_number\">\n      <p>\n        <strong>The total number of projects you were shown is 10. If you could choose to invest in a certain number of those 10 projects, how many would you invest in?<\/strong>\n      <\/p>\n    <\/label>\n  <\/p>\n  \n  <input type=\"number\" id=\"portfolio_number\" name=\"portfolio_number\" min=\"0\" max=\"10\" required style=\"width:70px\"/>\n  projects\n<\/p>"],
              "data": {
                "stage": ["portfolio_number"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.distribution == "absent"){
        return true;
      } else {
        return false;
      }
    }
        },
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
          "stimulus": ["<div>\n  <p>Press below to complete the experiment.<\/p>\n  <p>It will take a few seconds to save your data, after which you will be automatically redirected back to Prolific.<\/p>\n  <p>Thank you!<\/p>\n<\/div>"],
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
  "preload_images": ["resource/image/consent.png", "resource/image/debrief1.png", "resource/image/debrief2.png", "resource/image/distribution_20.png", "resource/image/distribution.png", "resource/image/pis1_prolific.png", "resource/image/pis1_sona.png", "resource/image/pis2_prolific.png", "resource/image/pis2_sona.png", "resource/image/pis3_prolific.png", "resource/image/pis3_sona.png"],
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
