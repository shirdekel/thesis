var safe_to_close_window = false;
function verifyClose() {
  if (safe_to_close_window == false) {
    event.returnValue = "Are you sure you want to exit? Your data has not been saved yet.";
  }
}
window.onbeforeunload = verifyClose;

var awareness_condition, condition, distribution_condition, presentation_condition, regex_awareness, regex_distribution, regex_presentation, urlvar;

condition = jsPsych.randomization.sampleWithoutReplacement(["naive_separate_absent", "naive_joint_absent", "naive_separate_present", "aware_separate_absent"], 1)[0];

regex_awareness = /(.*)_.*_.*/;

regex_presentation = /.*_(.*)_.*/;

regex_distribution = /.*_.*_(.*)/;

awareness_condition = condition.match(regex_awareness)[1];

presentation_condition = condition.match(regex_presentation)[1];

distribution_condition = condition.match(regex_distribution)[1];

urlvar = jsPsych.data.urlVariables();

if (typeof urlvar.presentation !== 'undefined') {
  presentation_condition = urlvar.presentation;
}

if (typeof urlvar.awareness !== 'undefined') {
  awareness_condition = urlvar.awareness;
}

if (typeof urlvar.distribution !== 'undefined') {
  distribution_condition = urlvar.distribution;
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
  "experiment": "aggregation_exp2",
  "sample": "prolific",
  "awareness": awareness_condition,
  "presentation": presentation_condition,
  "distribution": distribution_condition
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
              "stimulus": ["You will now see the 10 projects."],
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
                  "type": ["survey-multi-choice"],
                  "questions": [
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $40 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 30% chance of the project succeeding. Therefore, <strong>there is 30% chance of gaining $200 million and a 70% chance of losing $40 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_200_240_0.3"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $110 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 65% chance of the project succeeding. Therefore, <strong>there is 65% chance of gaining $130 million and a 35% chance of losing $110 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_130_240_0.65"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $100 million and a 30% chance of losing $140 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_100_240_0.7"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $140 million and a 45% chance of losing $100 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_140_240_0.55"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $50 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $190 million and a 65% chance of losing $50 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_190_240_0.35"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 75% chance of the project succeeding. Therefore, <strong>there is 75% chance of gaining $100 million and a 25% chance of losing $140 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_100_240_0.75"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $110 million and a 30% chance of losing $130 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_110_240_0.7"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 65% chance of the project succeeding. Therefore, <strong>there is 65% chance of gaining $110 million and a 35% chance of losing $130 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_110_240_0.65"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 40% chance of the project succeeding. Therefore, <strong>there is 40% chance of gaining $180 million and a 60% chance of losing $60 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_180_240_0.4"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $180 million and a 65% chance of losing $60 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_180_240_0.35"]
                    }
                  ],
                  "randomize_question_order": false,
                  "preamble": ["<div>\n  <p>Below is the probability distribution of final outcomes if all projects were chosen.<\/p>\n  <p>The numbers on the x-axis (labelled 'Outcome') represent the final amounts of money possible if you chose to invest in all the projects. The numbers on the y-axis (labelled 'Probability') represent the likelihoods of each of the possible outcomes. Negative final outcomes (losses) are shown in red, positive final outcomes (gains) are shown in green, and a final outcome of zero (no loss or gain) is shown in blue.<\/p>\n<\/div><div><img src=\"resource/image/gambles_plot_experiment2.png\" width=\"600\" height=\"400\"/><\/div><p>Indicate below whether you would invest in the following:<\/p>"],
                  "button_label": ["Continue"],
                  "required_message": ["You must choose at least one response for this question"],
                  "post_trial_gap": [0],
                  "data": {
                    "stage": ["project_choice"]
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
            }
          ],
          "conditional_function": function(){
      var data = jsPsych.data.get().last(1).values()[0];
      if(data.presentation == "joint"){
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
                  "type": ["survey-multi-choice"],
                  "questions": [
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $40 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 30% chance of the project succeeding. Therefore, <strong>there is 30% chance of gaining $200 million and a 70% chance of losing $40 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_200_240_0.3"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $110 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 65% chance of the project succeeding. Therefore, <strong>there is 65% chance of gaining $130 million and a 35% chance of losing $110 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_130_240_0.65"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $100 million and a 30% chance of losing $140 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_100_240_0.7"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $140 million and a 45% chance of losing $100 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_140_240_0.55"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $50 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $190 million and a 65% chance of losing $50 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_190_240_0.35"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 75% chance of the project succeeding. Therefore, <strong>there is 75% chance of gaining $100 million and a 25% chance of losing $140 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_100_240_0.75"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $110 million and a 30% chance of losing $130 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_110_240_0.7"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 65% chance of the project succeeding. Therefore, <strong>there is 65% chance of gaining $110 million and a 35% chance of losing $130 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_110_240_0.65"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 40% chance of the project succeeding. Therefore, <strong>there is 40% chance of gaining $180 million and a 60% chance of losing $60 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_180_240_0.4"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $180 million and a 65% chance of losing $60 million on the investment.<\/strong>"],
                      "options": ["Yes", "No"],
                      "horizontal": false,
                      "required": true,
                      "name": ["oil-well_180_240_0.35"]
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
      if(data.presentation == "joint"){
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
                      "preamble": ["<div>\n  <p>Below is the probability distribution of final outcomes if all projects were chosen.<\/p>\n  <p>The numbers on the x-axis (labelled 'Outcome') represent the final amounts of money possible if you chose to invest in all the projects. The numbers on the y-axis (labelled 'Probability') represent the likelihoods of each of the possible outcomes. Negative final outcomes (losses) are shown in red, positive final outcomes (gains) are shown in green, and a final outcome of zero (no loss or gain) is shown in blue.<\/p>\n<\/div><div><img src=\"resource/image/gambles_plot_experiment2.png\" width=\"600\" height=\"400\"/><\/div><p>Indicate below whether you would invest in the following:<\/p>"],
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
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $40 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 30% chance of the project succeeding. Therefore, <strong>there is 30% chance of gaining $200 million and a 70% chance of losing $40 million on the investment.<\/strong>"],
                      "name": ["oil-well_200_240_0.3"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $110 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 65% chance of the project succeeding. Therefore, <strong>there is 65% chance of gaining $130 million and a 35% chance of losing $110 million on the investment.<\/strong>"],
                      "name": ["oil-well_130_240_0.65"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $100 million and a 30% chance of losing $140 million on the investment.<\/strong>"],
                      "name": ["oil-well_100_240_0.7"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $140 million and a 45% chance of losing $100 million on the investment.<\/strong>"],
                      "name": ["oil-well_140_240_0.55"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $50 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $190 million and a 65% chance of losing $50 million on the investment.<\/strong>"],
                      "name": ["oil-well_190_240_0.35"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 75% chance of the project succeeding. Therefore, <strong>there is 75% chance of gaining $100 million and a 25% chance of losing $140 million on the investment.<\/strong>"],
                      "name": ["oil-well_100_240_0.75"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $110 million and a 30% chance of losing $130 million on the investment.<\/strong>"],
                      "name": ["oil-well_110_240_0.7"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 65% chance of the project succeeding. Therefore, <strong>there is 65% chance of gaining $110 million and a 35% chance of losing $130 million on the investment.<\/strong>"],
                      "name": ["oil-well_110_240_0.65"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 40% chance of the project succeeding. Therefore, <strong>there is 40% chance of gaining $180 million and a 60% chance of losing $60 million on the investment.<\/strong>"],
                      "name": ["oil-well_180_240_0.4"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $180 million and a 65% chance of losing $60 million on the investment.<\/strong>"],
                      "name": ["oil-well_180_240_0.35"]
                    }
                  ],
                  "randomize_order": false
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
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $40 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 30% chance of the project succeeding. Therefore, <strong>there is 30% chance of gaining $200 million and a 70% chance of losing $40 million on the investment.<\/strong>"],
                      "name": ["oil-well_200_240_0.3"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $110 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 65% chance of the project succeeding. Therefore, <strong>there is 65% chance of gaining $130 million and a 35% chance of losing $110 million on the investment.<\/strong>"],
                      "name": ["oil-well_130_240_0.65"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $100 million and a 30% chance of losing $140 million on the investment.<\/strong>"],
                      "name": ["oil-well_100_240_0.7"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $140 million and a 45% chance of losing $100 million on the investment.<\/strong>"],
                      "name": ["oil-well_140_240_0.55"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $50 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $190 million and a 65% chance of losing $50 million on the investment.<\/strong>"],
                      "name": ["oil-well_190_240_0.35"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 75% chance of the project succeeding. Therefore, <strong>there is 75% chance of gaining $100 million and a 25% chance of losing $140 million on the investment.<\/strong>"],
                      "name": ["oil-well_100_240_0.75"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $110 million and a 30% chance of losing $130 million on the investment.<\/strong>"],
                      "name": ["oil-well_110_240_0.7"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 65% chance of the project succeeding. Therefore, <strong>there is 65% chance of gaining $110 million and a 35% chance of losing $130 million on the investment.<\/strong>"],
                      "name": ["oil-well_110_240_0.65"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 40% chance of the project succeeding. Therefore, <strong>there is 40% chance of gaining $180 million and a 60% chance of losing $60 million on the investment.<\/strong>"],
                      "name": ["oil-well_180_240_0.4"]
                    },
                    {
                      "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $180 million and a 65% chance of losing $60 million on the investment.<\/strong>"],
                      "name": ["oil-well_180_240_0.35"]
                    }
                  ],
                  "randomize_order": false
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
              "stimulus": ["<div>\n  <p>Below is the probability distribution of final outcomes if all projects were chosen.<\/p>\n  <p>The numbers on the x-axis (labelled 'Outcome') represent the final amounts of money possible if you chose to invest in all the projects. The numbers on the y-axis (labelled 'Probability') represent the likelihoods of each of the possible outcomes. Negative final outcomes (losses) are shown in red, positive final outcomes (gains) are shown in green, and a final outcome of zero (no loss or gain) is shown in blue.<\/p>\n<\/div><div><img src=\"resource/image/gambles_plot_experiment2.png\" width=\"600\" height=\"400\"/><\/div><p>Indicate below whether you would invest in the following:<\/p><p>\n  <strong>Consider all the projects you saw. If you had to choose between investing in all of them, or investing in none of them, which would you choose?<\/strong>\n<\/p>"],
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
              "html": ["<div>\n  <p>Below is the probability distribution of final outcomes if all projects were chosen.<\/p>\n  <p>The numbers on the x-axis (labelled 'Outcome') represent the final amounts of money possible if you chose to invest in all the projects. The numbers on the y-axis (labelled 'Probability') represent the likelihoods of each of the possible outcomes. Negative final outcomes (losses) are shown in red, positive final outcomes (gains) are shown in green, and a final outcome of zero (no loss or gain) is shown in blue.<\/p>\n<\/div><div><img src=\"resource/image/gambles_plot_experiment2.png\" width=\"600\" height=\"400\"/><\/div><p>Indicate below whether you would invest in the following:<\/p><p>\n  <p>\n    <label for=\"portfolio_number\">\n      <p>\n        <strong>\n          The total number of projects you were shown is \n          10\n          . If you could choose to invest in a certain number of those \n          10\n           projects, how many would you invest in?\n        <\/strong>\n      <\/p>\n    <\/label>\n  <\/p>\n  \n  <input type=\"number\" id=\"portfolio_number\" name=\"portfolio_number\" min=\"0\" max=\"10\" required style=\"width:70px\"/>\n  projects\n<\/p>"],
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
              "html": ["<p>\n  <p>\n    <label for=\"portfolio_number\">\n      <p>\n        <strong>\n          The total number of projects you were shown is \n          10\n          . If you could choose to invest in a certain number of those \n          10\n           projects, how many would you invest in?\n        <\/strong>\n      <\/p>\n    <\/label>\n  <\/p>\n  \n  <input type=\"number\" id=\"portfolio_number\" name=\"portfolio_number\" min=\"0\" max=\"10\" required style=\"width:70px\"/>\n  projects\n<\/p>"],
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
  "preload_images": ["resource/image/consent.png", "resource/image/debrief1.png", "resource/image/debrief2.png", "resource/image/gambles_plot_experiment2.png", "resource/image/pis1_prolific.png", "resource/image/pis1_sona.png", "resource/image/pis2_prolific.png", "resource/image/pis2_sona.png", "resource/image/pis3_prolific.png", "resource/image/pis3_sona.png"],
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
