var awareness_presentation, regex_awareness, regex_presentation;

awareness_presentation = jsPsych.randomization.sampleWithoutReplacement(['aware_separate', 'naive_joint', 'naive_separate'], 1)[0];

regex_awareness = /.*(?=_)/;

regex_presentation = /(?<=_).*/;

jsPsych.data.addProperties({
  "experiment": ["aggregation_exp2"],
  "sample": ["prolific"],
  "distribution": jsPsych.randomization.sampleWithoutReplacement(['present', 'absent'], 1),
  "awareness": awareness_presentation.match(regex_awareness),
  "presentation": awareness_presentation.match(regex_presentation)
});

var timeline = {
  "timeline": [
    {
      "type": ["instructions"],
      "pages": ["<div>\n  <p>Welcome to the study.<\/p>\n  <p>Make sure to scroll down to the bottom of each page to see the navigation buttons.<\/p>\n<\/div>", "<img src=\"resource/image/pis1_prolific.png\" width=\"750\"/>", "<img src=\"resource/image/pis2_prolific.png\" width=\"750\"/>", "<img src=\"resource/image/pis3_prolific.png\" width=\"750\"/>"],
      "key_forward": [39],
      "key_backward": [37],
      "allow_backward": true,
      "allow_keys": true,
      "show_clickable_nav": true,
      "button_label_previous": ["Previous"],
      "button_label_next": ["Next"],
      "post_trial_gap": [0]
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
}
    },
    {
      "type": ["survey-html-form"],
      "html": ["<div>\n  <div>\n    <p>I would like to receive feedback about the overall results of this study.<\/p>\n    <input type=\"radio\" id=\"contact_yes\" name=\"contact\" value=\"yes\"/>\n    <label for=\"contact_yes\">YES<\/label>\n    <input type=\"radio\" id=\"contact_no\" name=\"contact\" value=\"no\" checked/>\n    <label for=\"contact_no\">NO<\/label>\n  <\/div>\n  <div>\n    <p>If you answered YES, please indicate your preferred form of feedback and address:<\/p>\n    <p>\n      Email:\n      <input type=\"text\" id=\"address\" name=\"address\"/>\n    <\/p>\n  <\/div>\n<\/div>"]
    },
    {
      "type": ["survey-html-form"],
      "html": ["<div>\n  <label for=\"prolific\">Enter your Prolific ID (24 alphanumeric characters, no spaces):<\/label>\n  <input type=\"text\" id=\"prolific\" name=\"prolific\" required minlength=\"24\" maxlength=\"24\" pattern=\"^[a-z0-9]+$\" size=\"30\"/>\n<\/div>"]
    },
    {
      "type": ["instructions"],
      "pages": ["Welcome! Use the arrow buttons to browse these instructions", "Imagine that you are an executive in a large company composed of many individual businesses. You will see various projects from these businesses and have to decide whether you would like to invest in them. Imagine that making good investment decisions will result in you receiving a generous bonus and a potential promotion, and that doing poorly will result in you receiving a large pay cut and a potential demotion. We want to know what choices you would actually make in these scenarios.", "You will respond by clicking a button", "Press the 'Next' button to begin!"],
      "key_forward": [39],
      "key_backward": [37],
      "allow_backward": true,
      "allow_keys": true,
      "show_clickable_nav": true,
      "button_label_previous": ["Previous"],
      "button_label_next": ["Next"],
      "post_trial_gap": [0]
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
          "post_trial_gap": [0]
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
          "post_trial_gap": [0]
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
                  "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $140 million and a 45% chance of losing $100 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["oil-well_140_240_0.55"]
                },
                {
                  "prompt": ["Microxy is a business in your company that proposes to construct a microchip project, which they forecast will cost $70 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 45% chance of the project succeeding. Therefore, <strong>there is 45% chance of gaining $170 million and a 55% chance of losing $70 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["microchip_170_240_0.45"]
                },
                {
                  "prompt": ["Vital Records is a business in your company that proposes to construct a record deal project, which they forecast will cost $40 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 30% chance of the project succeeding. Therefore, <strong>there is 30% chance of gaining $200 million and a 70% chance of losing $40 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["record-deal_200_240_0.3"]
                },
                {
                  "prompt": ["Logivia is a business in your company that proposes to construct a shipping logistics project, which they forecast will cost $120 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $120 million and a 40% chance of losing $120 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["shipping-logistics_120_240_0.6"]
                },
                {
                  "prompt": ["Savoro is a business in your company that proposes to construct a restaurant chain project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $110 million and a 30% chance of losing $130 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["restaurant-chain_110_240_0.7"]
                },
                {
                  "prompt": ["Grown Media is a business in your company that proposes to construct a national newspaper project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $180 million and a 65% chance of losing $60 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["national-newspaper_180_240_0.35"]
                },
                {
                  "prompt": ["Biotechly is a business in your company that proposes to construct a pharmaceutical project, which they forecast will cost $90 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $150 million and a 45% chance of losing $90 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["pharmaceutical_150_240_0.55"]
                },
                {
                  "prompt": ["FreightCog is a business in your company that proposes to construct a railway project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $140 million and a 40% chance of losing $100 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["railway_140_240_0.6"]
                },
                {
                  "prompt": ["Evogenic is a business in your company that proposes to construct a GMO project, which they forecast will cost $110 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $130 million and a 40% chance of losing $110 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["GMO_130_240_0.6"]
                },
                {
                  "prompt": ["Erectic is a business in your company that proposes to construct a high-rise construction project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 75% chance of the project succeeding. Therefore, <strong>there is 75% chance of gaining $100 million and a 25% chance of losing $140 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["high-rise-construction_100_240_0.75"]
                }
              ],
              "randomize_question_order": true,
              "preamble": ["<div>\n  <p>Below is the probability distribution of final outcomes if all gambles were chosen.<\/p>\n  <p>The numbers on the x-axis (labelled 'Outcome') represent the final amounts of money possible if you chose to invest in all the projects. The numbers on the y-axis (labelled 'Probability') represent the likelihoods of each of the possible outcomes. Negative final outcomes (losses) are shown in red, positive final outcomes (gains) are shown in green, and a final outcome of zero (no loss or gain) is shown in blue.<\/p>\n<\/div><div><img src=\"resource/image/distribution.png\" width=\"600\" height=\"400\"/><\/div><p>Indicate below whether you would invest in the following projects:<\/p>"],
              "button_label": ["Continue"],
              "required_message": ["You must choose at least one response for this question"],
              "post_trial_gap": [0]
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
                  "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $140 million and a 45% chance of losing $100 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["oil-well_140_240_0.55"]
                },
                {
                  "prompt": ["Microxy is a business in your company that proposes to construct a microchip project, which they forecast will cost $70 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 45% chance of the project succeeding. Therefore, <strong>there is 45% chance of gaining $170 million and a 55% chance of losing $70 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["microchip_170_240_0.45"]
                },
                {
                  "prompt": ["Vital Records is a business in your company that proposes to construct a record deal project, which they forecast will cost $40 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 30% chance of the project succeeding. Therefore, <strong>there is 30% chance of gaining $200 million and a 70% chance of losing $40 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["record-deal_200_240_0.3"]
                },
                {
                  "prompt": ["Logivia is a business in your company that proposes to construct a shipping logistics project, which they forecast will cost $120 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $120 million and a 40% chance of losing $120 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["shipping-logistics_120_240_0.6"]
                },
                {
                  "prompt": ["Savoro is a business in your company that proposes to construct a restaurant chain project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $110 million and a 30% chance of losing $130 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["restaurant-chain_110_240_0.7"]
                },
                {
                  "prompt": ["Grown Media is a business in your company that proposes to construct a national newspaper project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $180 million and a 65% chance of losing $60 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["national-newspaper_180_240_0.35"]
                },
                {
                  "prompt": ["Biotechly is a business in your company that proposes to construct a pharmaceutical project, which they forecast will cost $90 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $150 million and a 45% chance of losing $90 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["pharmaceutical_150_240_0.55"]
                },
                {
                  "prompt": ["FreightCog is a business in your company that proposes to construct a railway project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $140 million and a 40% chance of losing $100 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["railway_140_240_0.6"]
                },
                {
                  "prompt": ["Evogenic is a business in your company that proposes to construct a GMO project, which they forecast will cost $110 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $130 million and a 40% chance of losing $110 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["GMO_130_240_0.6"]
                },
                {
                  "prompt": ["Erectic is a business in your company that proposes to construct a high-rise construction project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 75% chance of the project succeeding. Therefore, <strong>there is 75% chance of gaining $100 million and a 25% chance of losing $140 million on the investment.<\/strong>"],
                  "options": ["Yes", "No"],
                  "horizontal": false,
                  "required": true,
                  "name": ["high-rise-construction_100_240_0.75"]
                }
              ],
              "randomize_question_order": true,
              "preamble": ["<p>Indicate below whether you would invest in the following projects:<\/p>"],
              "button_label": ["Continue"],
              "required_message": ["You must choose at least one response for this question"],
              "post_trial_gap": [0]
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
                  "preamble": ["<div>\n  <p>Below is the probability distribution of final outcomes if all gambles were chosen.<\/p>\n  <p>The numbers on the x-axis (labelled 'Outcome') represent the final amounts of money possible if you chose to invest in all the projects. The numbers on the y-axis (labelled 'Probability') represent the likelihoods of each of the possible outcomes. Negative final outcomes (losses) are shown in red, positive final outcomes (gains) are shown in green, and a final outcome of zero (no loss or gain) is shown in blue.<\/p>\n<\/div><div><img src=\"resource/image/distribution.png\" width=\"600\" height=\"400\"/><\/div><p>Indicate below whether you would invest in the following projects:<\/p>"],
                  "button_label": ["Continue"],
                  "required_message": ["You must choose at least one response for this question"],
                  "post_trial_gap": [0]
                }
              ],
              "timeline_variables": [
                {
                  "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $140 million and a 45% chance of losing $100 million on the investment.<\/strong>"],
                  "name": ["oil-well_140_240_0.55"]
                },
                {
                  "prompt": ["Microxy is a business in your company that proposes to construct a microchip project, which they forecast will cost $70 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 45% chance of the project succeeding. Therefore, <strong>there is 45% chance of gaining $170 million and a 55% chance of losing $70 million on the investment.<\/strong>"],
                  "name": ["microchip_170_240_0.45"]
                },
                {
                  "prompt": ["Vital Records is a business in your company that proposes to construct a record deal project, which they forecast will cost $40 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 30% chance of the project succeeding. Therefore, <strong>there is 30% chance of gaining $200 million and a 70% chance of losing $40 million on the investment.<\/strong>"],
                  "name": ["record-deal_200_240_0.3"]
                },
                {
                  "prompt": ["Logivia is a business in your company that proposes to construct a shipping logistics project, which they forecast will cost $120 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $120 million and a 40% chance of losing $120 million on the investment.<\/strong>"],
                  "name": ["shipping-logistics_120_240_0.6"]
                },
                {
                  "prompt": ["Savoro is a business in your company that proposes to construct a restaurant chain project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $110 million and a 30% chance of losing $130 million on the investment.<\/strong>"],
                  "name": ["restaurant-chain_110_240_0.7"]
                },
                {
                  "prompt": ["Grown Media is a business in your company that proposes to construct a national newspaper project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $180 million and a 65% chance of losing $60 million on the investment.<\/strong>"],
                  "name": ["national-newspaper_180_240_0.35"]
                },
                {
                  "prompt": ["Biotechly is a business in your company that proposes to construct a pharmaceutical project, which they forecast will cost $90 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $150 million and a 45% chance of losing $90 million on the investment.<\/strong>"],
                  "name": ["pharmaceutical_150_240_0.55"]
                },
                {
                  "prompt": ["FreightCog is a business in your company that proposes to construct a railway project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $140 million and a 40% chance of losing $100 million on the investment.<\/strong>"],
                  "name": ["railway_140_240_0.6"]
                },
                {
                  "prompt": ["Evogenic is a business in your company that proposes to construct a GMO project, which they forecast will cost $110 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $130 million and a 40% chance of losing $110 million on the investment.<\/strong>"],
                  "name": ["GMO_130_240_0.6"]
                },
                {
                  "prompt": ["Erectic is a business in your company that proposes to construct a high-rise construction project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 75% chance of the project succeeding. Therefore, <strong>there is 75% chance of gaining $100 million and a 25% chance of losing $140 million on the investment.<\/strong>"],
                  "name": ["high-rise-construction_100_240_0.75"]
                }
              ],
              "randomize_order": [true]
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
                  "preamble": ["<p>Indicate below whether you would invest in the following projects:<\/p>"],
                  "button_label": ["Continue"],
                  "required_message": ["You must choose at least one response for this question"],
                  "post_trial_gap": [0]
                }
              ],
              "timeline_variables": [
                {
                  "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $140 million and a 45% chance of losing $100 million on the investment.<\/strong>"],
                  "name": ["oil-well_140_240_0.55"]
                },
                {
                  "prompt": ["Microxy is a business in your company that proposes to construct a microchip project, which they forecast will cost $70 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 45% chance of the project succeeding. Therefore, <strong>there is 45% chance of gaining $170 million and a 55% chance of losing $70 million on the investment.<\/strong>"],
                  "name": ["microchip_170_240_0.45"]
                },
                {
                  "prompt": ["Vital Records is a business in your company that proposes to construct a record deal project, which they forecast will cost $40 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 30% chance of the project succeeding. Therefore, <strong>there is 30% chance of gaining $200 million and a 70% chance of losing $40 million on the investment.<\/strong>"],
                  "name": ["record-deal_200_240_0.3"]
                },
                {
                  "prompt": ["Logivia is a business in your company that proposes to construct a shipping logistics project, which they forecast will cost $120 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $120 million and a 40% chance of losing $120 million on the investment.<\/strong>"],
                  "name": ["shipping-logistics_120_240_0.6"]
                },
                {
                  "prompt": ["Savoro is a business in your company that proposes to construct a restaurant chain project, which they forecast will cost $130 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $110 million and a 30% chance of losing $130 million on the investment.<\/strong>"],
                  "name": ["restaurant-chain_110_240_0.7"]
                },
                {
                  "prompt": ["Grown Media is a business in your company that proposes to construct a national newspaper project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $180 million and a 65% chance of losing $60 million on the investment.<\/strong>"],
                  "name": ["national-newspaper_180_240_0.35"]
                },
                {
                  "prompt": ["Biotechly is a business in your company that proposes to construct a pharmaceutical project, which they forecast will cost $90 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $150 million and a 45% chance of losing $90 million on the investment.<\/strong>"],
                  "name": ["pharmaceutical_150_240_0.55"]
                },
                {
                  "prompt": ["FreightCog is a business in your company that proposes to construct a railway project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $140 million and a 40% chance of losing $100 million on the investment.<\/strong>"],
                  "name": ["railway_140_240_0.6"]
                },
                {
                  "prompt": ["Evogenic is a business in your company that proposes to construct a GMO project, which they forecast will cost $110 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $130 million and a 40% chance of losing $110 million on the investment.<\/strong>"],
                  "name": ["GMO_130_240_0.6"]
                },
                {
                  "prompt": ["Erectic is a business in your company that proposes to construct a high-rise construction project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 75% chance of the project succeeding. Therefore, <strong>there is 75% chance of gaining $100 million and a 25% chance of losing $140 million on the investment.<\/strong>"],
                  "name": ["high-rise-construction_100_240_0.75"]
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
    },
    {
      "timeline": [
        {
          "type": ["survey-multi-choice"],
          "questions": [
            {
              "prompt": ["Regardless of what you chose previously, would you accept investing in all the projects that you saw?"],
              "options": ["Yes", "No"],
              "horizontal": false,
              "required": true,
              "name": ["portfolio"]
            }
          ],
          "randomize_question_order": false,
          "preamble": ["<div>\n  <p>Below is the probability distribution of final outcomes if all gambles were chosen.<\/p>\n  <p>The numbers on the x-axis (labelled 'Outcome') represent the final amounts of money possible if you chose to invest in all the projects. The numbers on the y-axis (labelled 'Probability') represent the likelihoods of each of the possible outcomes. Negative final outcomes (losses) are shown in red, positive final outcomes (gains) are shown in green, and a final outcome of zero (no loss or gain) is shown in blue.<\/p>\n<\/div><div><img src=\"resource/image/distribution.png\" width=\"600\" height=\"400\"/><\/div>"],
          "button_label": ["Continue"],
          "required_message": ["You must choose at least one response for this question"],
          "post_trial_gap": [0]
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
          "type": ["survey-multi-choice"],
          "questions": [
            {
              "prompt": ["Regardless of what you chose previously, would you accept investing in all the projects that you saw?"],
              "options": ["Yes", "No"],
              "horizontal": false,
              "required": true,
              "name": ["portfolio"]
            }
          ],
          "randomize_question_order": false,
          "preamble": [""],
          "button_label": ["Continue"],
          "required_message": ["You must choose at least one response for this question"],
          "post_trial_gap": [0]
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
      "type": ["html-button-response"],
      "stimulus": ["<div>\n  <p>Press below to complete the experiment.<\/p>\n  <p>Thank you!<\/p>\n<\/div>"],
      "choices": ["End experiment"],
      "margin_vertical": ["0px"],
      "margin_horizontal": ["8px"],
      "response_ends_trial": true,
      "post_trial_gap": [0]
    }
  ]
};

jsPsych.init(
{
  "timeline": [timeline],
  "on_close":  function(){
    event.preventDefault();
    event.returnValue = '';
  },
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
