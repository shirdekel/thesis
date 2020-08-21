var safe_to_close_window = false;
function verifyClose() {
  if (safe_to_close_window == false) {
    event.returnValue = "Are you sure you want to exit? Your data has not been saved yet.";
  }
}
window.onbeforeunload = verifyClose;

function checkOther(val, id){
 var element=document.getElementById(id);
 if(val=='Other')
   element.style.display='block';
 else
   element.style.display='none';
}
jsPsych.data.addProperties({
  "subject": jsPsych.randomization.randomID(15),
  "experiment": ["aggregation_exp2"],
  "sample": ["prolific"],
  "distribution": 'absent',
  "awareness": 'naive',
  "presentation": 'separate',
  "similarity": 'high',
  "project_variation": jsPsych.randomization.sampleWithReplacement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1)
});

var timeline = {
  "timeline": [
    {
      "timeline": [
        {
          "type": ["instructions"],
          "pages": ["We will now give you the instructions for the task. Use the arrow buttons to browse these instructions", "<div>\n  <p>Imagine that you are an executive in a large company composed of many individual businesses. You will see various projects from these businesses and have to decide whether you would like to invest in them.<\/p>\n  <p>Imagine that making good investment decisions will result in you receiving a generous bonus and a potential promotion, and that doing poorly will result in you receiving a large pay cut and a potential demotion. We want to know what choices you would actually make in these scenarios.<\/p>\n<\/div>", "Press the 'Next' button to begin."],
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
              "type": ["html-button-response"],
              "stimulus": ["You will now see the projects."],
              "choices": ["Continue"],
              "margin_vertical": ["0px"],
              "margin_horizontal": ["8px"],
              "response_ends_trial": true,
              "post_trial_gap": [0],
              "data": {
                "stage": ["awareness"]
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
              "timeline": [
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Houston, US in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_onshore-Houston-US_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current personal computer market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_personal-computer_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their hip hop music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_hip-hop_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a motorbike export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_motorbike_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of italian restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_italian_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about electronics","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_electronics_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat leukaemia","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_leukaemia_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Guangdong, China","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Guangdong-China_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified potato crop enriched with Vitamin A","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_potato-crop-enriched-with-Vitamin-A_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 10-storey high-rise with a coupled wall structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_10-coupled-wall_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "low"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Kuala Lumpur, Malaysia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_offshore-Kuala-Lumpur-Malaysia_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current smartphone market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_smartphone_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their classical music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_classical_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wheat export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_wheat_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of burger restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_burger_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about politics","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_politics_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat anaemia","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_anaemia_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Uttar Pradesh, India","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Uttar-Pradesh-India_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified tomato crop that induces a Hepatitis B immune response","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_tomato-crop-that-induces-a-Hepatitis-B-immune-response_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 15-storey high-rise with a flat plate and flat slab structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_15-flat-plate-and-flat-slab_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "low"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_onshore-Daqing-China_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_microwave_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their R&B music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_R&B_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a kitchenware export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_kitchenware_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of mexican restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_mexican_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about fashion","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_fashion_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_Sickle-cell-disease_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in California, USA","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_California-USA_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified trout with increased growth rate","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_trout-with-increased-growth-rate_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 20-storey high-rise with a rigid frame structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_20-rigid-frame_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "low"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_offshore-Abu-Dhabi-UAE_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_car-controls_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_soul_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_liquor_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_thai_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_Christian-topics_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_Hunter-syndrome_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_West-Java-Indonesia_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_corn-crop-with-faster-maturation_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_25-infilled-frame_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "low"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_DSLR-camera_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their indie rock music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_indie-rock_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a power tools export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_power-tools_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of chinese restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_chinese_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about business","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_business_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_immune-dysregulation_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Punjab, Pakistan","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Punjab-Pakistan_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 30-storey high-rise with a braced frame structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_30-braced-frame_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "low"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_offshore-Basra-Iraq_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_gaming-console_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their heavy metal music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_heavy-metal_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wrist watch export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_wrist-watch_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of barbeque restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_barbeque_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about science","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_science_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat hypertension","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_hypertension_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Minas Gerais, Brazil","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Minas-Gerais-Brazil_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified herbicide tolerant melon","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_herbicide-tolerant-melon_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 35-storey high-rise with a shear wall structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_35-shear-wall_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "low"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Stavanger, Norway in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_onshore-Stavanger-Norway_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current military communication market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_military-communication_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their pop music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_pop_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a artwork export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_artwork_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of sushi restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_sushi_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about sport","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_sport_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat pneumonia","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_pneumonia_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Kano State, Nigera","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Kano-State-Nigera_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified insect resistant mango","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_insect-resistant-mango_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 40-storey high-rise with a wall-frame structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_40-wall-frame_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "low"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Calgary, Canada in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_offshore-Calgary-Canada_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current aerospace market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_aerospace_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their folk music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_folk_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a steel export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_steel_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of greek restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_greek_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about celebrity gossip","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_celebrity-gossip_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat angina","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_angina_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Dhaka Division, Bangladesh","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Dhaka-Division-Bangladesh_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified virus resistant orange","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_virus-resistant-orange_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 45-storey high-rise with a core and outrigger structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_45-core-and-outrigger_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "low"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Omsk, Siberia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_onshore-Omsk-Siberia_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current medical imaging machine market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_medical-imaging-machine_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their electronic music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_electronic_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a flat-screen TV export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_flat-screen-TV_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of seafood restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_seafood_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about current affairs","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_current-affairs_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Chronic lower respiratory disease","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_Chronic-lower-respiratory-disease_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Krasnodar Krai, Russia","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Krasnodar-Krai-Russia_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified sunflower oil with healthier fatty acid composition","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_sunflower-oil-with-healthier-fatty-acid-composition_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 50-storey high-rise with a hybrid structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_50-hybrid_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "low"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Aberdeen, UK in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_offshore-Aberdeen-UK_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current GPS tracking device market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_GPS-tracking-device_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their latin music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_latin_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wool export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_wool_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of buffet restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_buffet_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about foreign affairs","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_foreign-affairs_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Chronic kidney disease","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_Chronic-kidney-disease_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Oaxaca, Mexico","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Oaxaca-Mexico_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified bacteria for clean fuel development","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_bacteria-for-clean-fuel-development_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 55-storey high-rise with a tube structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_55-tube_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "low"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Houston, US in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_onshore-Houston-US_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Kuala Lumpur, Malaysia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_offshore-Kuala-Lumpur-Malaysia_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Daqing, China in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_onshore-Daqing-China_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Abu Dhabi, UAE in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_offshore-Abu-Dhabi-UAE_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Dhahran, Saudi Arabia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_onshore-Dhahran-Saudi-Arabia_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Basra, Iraq in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_offshore-Basra-Iraq_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Stavanger, Norway in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_onshore-Stavanger-Norway_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Calgary, Canada in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_offshore-Calgary-Canada_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an onshore location in Omsk, Siberia in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_onshore-Omsk-Siberia_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Refinera is a business in your company that proposes to construct an oil well project. That is, they want to establish an exploration site at an offshore location in Aberdeen, UK in order to see if the hydrocarbon supply is sufficient to establish a more permanent well","Their research team has been investigating a possible site in an as yet unexplored area. Due to location and size of the site, and consultant fees (e.g., geologists), they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted concentration and quality of recoverable hydrocarbons at the site eventuates. A geological and seismic study of the site, and an analysis of the previous similar sites suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["oil-well_offshore-Aberdeen-UK_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "high"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current personal computer market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_personal-computer_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current smartphone market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_smartphone_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current microwave market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_microwave_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current car controls market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_car-controls_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current DSLR camera market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_DSLR-camera_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current gaming console market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_gaming-console_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current military communication market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_military-communication_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current aerospace market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_aerospace_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current medical imaging machine market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_medical-imaging-machine_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Microxy is a business in your company that proposes to construct a microchip project. That is, they want to develop a new type of Integrated Circuit (IC) with a higher complexity than those in the current GPS tracking device market","Their research team has been investigating the necessary components and infrastructure. Due to complexity and novelty of the IC, and IC design engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted yield (percentage of working ICs produced) eventuates. An electrical engineering and design study of the site, and an analysis of the yield rates of previous similar ICs suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["microchip_GPS-tracking-device_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "high"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their hip hop music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_hip-hop_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their classical music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_classical_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their R&B music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_R&B_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their soul music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_soul_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their indie rock music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_indie-rock_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their heavy metal music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_heavy-metal_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their pop music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_pop_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their folk music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_folk_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their electronic music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_electronic_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Vital Records is a business in your company that proposes to construct a record deal project. That is, they want to sign a new recording artist for their latin music market","Their research team has been investigating the necessary production and promotion. Due to recording time, marketing requirements, and producer fees, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted record sales eventuate. A study of the distribution market, and an analysis of the record sales of previous similar recording artists suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["record-deal_latin_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "high"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a motorbike export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_motorbike_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wheat export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_wheat_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a kitchenware export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_kitchenware_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a liquor export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_liquor_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a power tools export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_power-tools_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wrist watch export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_wrist-watch_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a artwork export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_artwork_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a steel export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_steel_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a flat-screen TV export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_flat-screen-TV_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Logivia is a business in your company that proposes to construct a shipping logistics project. That is, they want to develop a new shipping route for a wool export market","Their research team has been investigating the relevant storage and insurance requirements. Due to median size and volume of the cargo, and couriers rates, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted exporter demand eventuates. A study of freight risks, and an analysis of the demand of previous similar export markets suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["shipping-logistics_wool_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "high"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of italian restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_italian_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of burger restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_burger_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of mexican restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_mexican_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of thai restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_thai_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of chinese restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_chinese_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of barbeque restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_barbeque_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of sushi restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_sushi_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of greek restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_greek_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of seafood restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_seafood_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Savoro is a business in your company that proposes to construct a restaurant chain project. That is, they want to develop a new franchise of buffet restaurants","Their research team has been investigating the relevant food and marketing requirements. Due to menu items, furnishings, and back- and front-of-house salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted customer attendance eventuates. A study of culinary preference trends, and an analysis of the demand of previous similar restaurants suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["restaurant-chain_buffet_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "high"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about electronics","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_electronics_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about politics","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_politics_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about fashion","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_fashion_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about Christian topics","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_Christian-topics_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about business","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_business_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about science","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_science_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about sport","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_sport_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about celebrity gossip","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_celebrity-gossip_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about current affairs","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_current-affairs_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Grown Media is a business in your company that proposes to construct a national newspaper project. That is, they want to develop a new nationally-distributed newspaper about foreign affairs","Their research team has been investigating the relevant print and distribution requirements. Due to printing fees, marketing, and writer and editorial salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted sales eventuate. A study of the target readership, impact of online publications, and an analysis of the sales of previous similar newspapers suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["national-newspaper_foreign-affairs_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "high"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat leukaemia","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_leukaemia_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat anaemia","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_anaemia_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Sickle-cell disease","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_Sickle-cell-disease_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Hunter syndrome","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_Hunter-syndrome_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat immune dysregulation","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_immune-dysregulation_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat hypertension","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_hypertension_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat pneumonia","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_pneumonia_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat angina","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_angina_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Chronic lower respiratory disease","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_Chronic-lower-respiratory-disease_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Biotechly is a business in your company that proposes to construct a pharmaceutical project. That is, they want to develop a new pharmaceutical drug to help treat Chronic kidney disease","Their research team has been investigating the necessary testing and laboratory requirements. Due to chemical and equipment costs, and the pharmaceutical scientist salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted sales eventuate. A biomedical study of the proposed compound, its possible side effects, and an analysis of the efficacy of previous similar compounds suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["pharmaceutical_Chronic-kidney-disease_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "high"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Guangdong, China","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Guangdong-China_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Uttar Pradesh, India","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Uttar-Pradesh-India_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in California, USA","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_California-USA_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in West Java, Indonesia","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_West-Java-Indonesia_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Punjab, Pakistan","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Punjab-Pakistan_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Minas Gerais, Brazil","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Minas-Gerais-Brazil_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Kano State, Nigera","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Kano-State-Nigera_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Dhaka Division, Bangladesh","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Dhaka-Division-Bangladesh_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Krasnodar Krai, Russia","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Krasnodar-Krai-Russia_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["FreightCog is a business in your company that proposes to construct a railway project. That is, they want to develop a new railway line in Oaxaca, Mexico","Their research team has been investigating the required track construction and electrification system relevant to the region. Due to material and insurance costs, and construction worker salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted ticket sales and freight revenues eventuate. A study of the regional market, current commuter trends, and an analysis of the performance of previous similar lines suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["railway_Oaxaca-Mexico_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "high"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified potato crop enriched with Vitamin A","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_potato-crop-enriched-with-Vitamin-A_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified tomato crop that induces a Hepatitis B immune response","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_tomato-crop-that-induces-a-Hepatitis-B-immune-response_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified trout with increased growth rate","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_trout-with-increased-growth-rate_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified corn crop with faster maturation","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_corn-crop-with-faster-maturation_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified animal feed with enzymes to enhance digestion","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_animal-feed-with-enzymes-to-enhance-digestion_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified herbicide tolerant melon","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_herbicide-tolerant-melon_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified insect resistant mango","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_insect-resistant-mango_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified virus resistant orange","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_virus-resistant-orange_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified sunflower oil with healthier fatty acid composition","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_sunflower-oil-with-healthier-fatty-acid-composition_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Evogenic is a business in your company that proposes to construct a GMO project. That is, they want to develop a new genetically modified bacteria for clean fuel development","Their research team has been investigating the relevant gene to be modified and potential environmental impact. Due to cultivation and labratory costs, and genetic engineer salaries, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted consumer demand and regulatory approval eventuate. A study of the potential health and ecological risks, current genetic engineering innovations, and an analysis of the demand for previous similar GMOs suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["GMO_bacteria-for-clean-fuel-development_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "high"){
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
                              "preamble": ["<p>Indicate below whether you would invest in the following:<\/p>"],
                              "button_label": ["Continue"],
                              "required_message": ["You must choose at least one response for this question"],
                              "post_trial_gap": [0],
                              "data": {
                                "stage": ["project_choice"]
                              }
                            }
                          ],
                          "timeline_variables": [
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 10-storey high-rise with a coupled wall structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $40 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 30% chance that these forecasts are accurate","To summarise, there is a 30% chance of gaining $200 million and a 70% chance of losing $40 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_10-coupled-wall_200_240_0.3"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 15-storey high-rise with a flat plate and flat slab structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $110 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $130 million and a 35% chance of losing $110 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_15-flat-plate-and-flat-slab_130_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 20-storey high-rise with a rigid frame structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $100 million and a 30% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_20-rigid-frame_100_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 25-storey high-rise with a infilled frame structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $100 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 55% chance that these forecasts are accurate","To summarise, there is a 55% chance of gaining $140 million and a 45% chance of losing $100 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_25-infilled-frame_140_240_0.55"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 30-storey high-rise with a braced frame structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $50 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $190 million and a 65% chance of losing $50 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_30-braced-frame_190_240_0.35"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 35-storey high-rise with a shear wall structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $140 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 75% chance that these forecasts are accurate","To summarise, there is a 75% chance of gaining $100 million and a 25% chance of losing $140 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_35-shear-wall_100_240_0.75"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 40-storey high-rise with a wall-frame structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 70% chance that these forecasts are accurate","To summarise, there is a 70% chance of gaining $110 million and a 30% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_40-wall-frame_110_240_0.7"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 45-storey high-rise with a core and outrigger structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $130 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 65% chance that these forecasts are accurate","To summarise, there is a 65% chance of gaining $110 million and a 35% chance of losing $130 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_45-core-and-outrigger_110_240_0.65"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 50-storey high-rise with a hybrid structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 40% chance that these forecasts are accurate","To summarise, there is a 40% chance of gaining $180 million and a 60% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_50-hybrid_180_240_0.4"]
                            },
                            {
                              "prompt": jsPsych.randomization.repeat(["Erectic is a business in your company that proposes to construct a high-rise construction project. That is, they want to develop a new 55-storey high-rise with a tube structural system","Their research team has been investigating the relevant geotechnical and construction requirements. Due to material and land costs, and engineering firm contracts, they forecast the entire project to cost $60 million","The company would make $240 million if the forecasted residential and commercial property sales eventuate. A study of the geotechnical risk and local regulations, and an analysis of the property market for previous similar properties suggest that there is a 35% chance that these forecasts are accurate","To summarise, there is a 35% chance of gaining $180 million and a 65% chance of losing $60 million on this investment"], 1).join('. ') + '.',
                              "name": ["high-rise-construction_55-tube_180_240_0.35"]
                            }
                          ],
                          "randomize_order": [true]
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
                    }
                  ],
                  "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "separate"){
        return true;
      } else {
        return false;
      }
    }
                }
              ],
              "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.similarity == "high"){
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
              "stimulus": ["<div>\n  <p>Below is the probability distribution of final outcomes if all projects were chosen.<\/p>\n  <p>The numbers on the x-axis (labelled 'Outcome') represent the final amounts of money possible if you chose to invest in all the projects. The numbers on the y-axis (labelled 'Probability') represent the likelihoods of each of the possible outcomes. Negative final outcomes (losses) are shown in red, positive final outcomes (gains) are shown in green, and a final outcome of zero (no loss or gain) is shown in blue.<\/p>\n<\/div><div><img src=\"resource/image/distribution.png\" width=\"600\" height=\"400\"/><\/div><p>\n  <strong>Consider all the projects you saw. If you had to choose between investing in all of them, or investing in none of them, which would you choose?<\/strong>\n<\/p>"],
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
      if(data.distribution == "present"){
        return true;
      } else {
        return false;
      }
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
              "html": ["<div>\n  <p>Below is the probability distribution of final outcomes if all projects were chosen.<\/p>\n  <p>The numbers on the x-axis (labelled 'Outcome') represent the final amounts of money possible if you chose to invest in all the projects. The numbers on the y-axis (labelled 'Probability') represent the likelihoods of each of the possible outcomes. Negative final outcomes (losses) are shown in red, positive final outcomes (gains) are shown in green, and a final outcome of zero (no loss or gain) is shown in blue.<\/p>\n<\/div><div><img src=\"resource/image/distribution.png\" width=\"600\" height=\"400\"/><\/div><p>\n  <p>\n    <label for=\"portfolio_number\">\n      <p>\n        <strong>The total number of projects you were shown is 10. If you could choose to invest in a certain number of those 10 projects, how many would you invest in?<\/strong>\n      <\/p>\n    <\/label>\n  <\/p>\n  \n  <input type=\"number\" id=\"portfolio_number\" name=\"portfolio_number\" min=\"0\" max=\"10\" required style=\"width:70px\"/>\n  projects\n<\/p>"],
              "data": {
                "stage": ["portfolio_number"]
              }
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.distribution == "present"){
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
  "preload_images": ["resource/image/consent.png", "resource/image/debrief1.png", "resource/image/debrief2.png", "resource/image/distribution.png", "resource/image/pis1_prolific.png", "resource/image/pis1_sona.png", "resource/image/pis2_prolific.png", "resource/image/pis2_sona.png", "resource/image/pis3_prolific.png", "resource/image/pis3_sona.png"],
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
