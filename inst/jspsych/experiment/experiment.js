var timeline = {
  "timeline": [
    {
      "type": ["survey-multi-choice"],
      "questions": [
        {
          "prompt": ["Refinera is a business in your company that proposes to construct an oil well project, which they forecast will cost $100 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $140 million and a 40% chance of losing $100 million on the investment.<\/strong>"],
          "options": ["Yes", "No"],
          "horizontal": false,
          "required": false,
          "name": ["project"]
        },
        {
          "prompt": ["Microxy is a business in your company that proposes to construct a microchip project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $100 million and a 40% chance of losing $140 million on the investment.<\/strong>"],
          "options": ["Yes", "No"],
          "horizontal": false,
          "required": false,
          "name": ["project"]
        },
        {
          "prompt": ["Vital Records is a business in your company that proposes to construct a record deal project, which they forecast will cost $50 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 35% chance of the project succeeding. Therefore, <strong>there is 35% chance of gaining $190 million and a 65% chance of losing $50 million on the investment.<\/strong>"],
          "options": ["Yes", "No"],
          "horizontal": false,
          "required": false,
          "name": ["project"]
        },
        {
          "prompt": ["Logivia is a business in your company that proposes to construct a shipping logistics project, which they forecast will cost $60 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 40% chance of the project succeeding. Therefore, <strong>there is 40% chance of gaining $180 million and a 60% chance of losing $60 million on the investment.<\/strong>"],
          "options": ["Yes", "No"],
          "horizontal": false,
          "required": false,
          "name": ["project"]
        },
        {
          "prompt": ["Savoro is a business in your company that proposes to construct a restaurant chain project, which they forecast will cost $140 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 75% chance of the project succeeding. Therefore, <strong>there is 75% chance of gaining $100 million and a 25% chance of losing $140 million on the investment.<\/strong>"],
          "options": ["Yes", "No"],
          "horizontal": false,
          "required": false,
          "name": ["project"]
        },
        {
          "prompt": ["Grown Media is a business in your company that proposes to construct a national newspaper project, which they forecast will cost $120 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 70% chance of the project succeeding. Therefore, <strong>there is 70% chance of gaining $120 million and a 30% chance of losing $120 million on the investment.<\/strong>"],
          "options": ["Yes", "No"],
          "horizontal": false,
          "required": false,
          "name": ["project"]
        },
        {
          "prompt": ["Biotechly is a business in your company that proposes to construct a pharmaceutical project, which they forecast will cost $110 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 65% chance of the project succeeding. Therefore, <strong>there is 65% chance of gaining $130 million and a 35% chance of losing $110 million on the investment.<\/strong>"],
          "options": ["Yes", "No"],
          "horizontal": false,
          "required": false,
          "name": ["project"]
        },
        {
          "prompt": ["FreightCog is a business in your company that proposes to construct a railway project, which they forecast will cost $110 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 60% chance of the project succeeding. Therefore, <strong>there is 60% chance of gaining $130 million and a 40% chance of losing $110 million on the investment.<\/strong>"],
          "options": ["Yes", "No"],
          "horizontal": false,
          "required": false,
          "name": ["project"]
        },
        {
          "prompt": ["Evogenic is a business in your company that proposes to construct a GMO project, which they forecast will cost $50 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 25% chance of the project succeeding. Therefore, <strong>there is 25% chance of gaining $190 million and a 75% chance of losing $50 million on the investment.<\/strong>"],
          "options": ["Yes", "No"],
          "horizontal": false,
          "required": false,
          "name": ["project"]
        },
        {
          "prompt": ["Erectic is a business in your company that proposes to construct a high-rise construction project, which they forecast will cost $80 million. If the project succeeds, forecasts show the company would make $240 million. Research suggests that there is a 55% chance of the project succeeding. Therefore, <strong>there is 55% chance of gaining $160 million and a 45% chance of losing $80 million on the investment.<\/strong>"],
          "options": ["Yes", "No"],
          "horizontal": false,
          "required": false,
          "name": ["project"]
        }
      ],
      "randomize_question_order": false,
      "preamble": ["<div>\n  <p>Decide whether you would like to invest in the following projects.<\/p>\n  <p>Below is the probability distribution of final outcomes if all 10 gambles were chosen.<\/p>\n<\/div><div>\n  <img src=\"resource/image/distribution.png\" width=\"600\" height=\"400\"/>\n<\/div>"],
      "button_label": ["Continue"],
      "required_message": ["You must choose at least one response for this question"],
      "post_trial_gap": [0]
    }
  ]
};

jsPsych.init(
{
  "timeline": [timeline],
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
