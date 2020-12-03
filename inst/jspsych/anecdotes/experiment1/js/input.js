var obj;

obj = {
  "img_preload": ["img/consent.png", "img/debrief1.png", "img/debrief2.png", "img/pis_online1.png", "img/pis_online2.png", "img/pis_online3.png", "img/pis1_sona.png", "img/pis2_sona.png", "img/pis3_sona.png"],
  "conditions": {
    "align": ["lowA", "highA"],
    "anecdote": ["anecdote", "statistics", "combined", "enhanced"]
  },
  "instructions": {
    "anecdote": ["<fieldset style='width:750px; text-align:left'>Imagine you are a executive in a multi-business company and that you are presented with two projects to potentially invest in. Your job is to decide how to allocate the capital available in your budget between these two projects.</fieldset>", "<fieldset style='width:750px; text-align:left'>In a moment you will see a table that details the two target projects and relevant information about them.</fieldset>", "<fieldset style='width:750px; text-align:left'><p>Managers often find it useful to consult with previous case studies before making important decisions. As well as seeing the two target projects, you will also be provided with an example of a failed project with some information that was available just before the company decided to invest in it. Further, you are also provided with an analysis of this investment decision after it became clear that the project will not meet its expected return on investment.</p></fieldset>"],
    "statistics": ["<fieldset style='width:750px; text-align:left'>Imagine you are a executive in a multi-business company and that you are presented with two projects to potentially invest in. Your job is to decide how to allocate the capital available in your budget between these two projects.</fieldset>", "<fieldset style='width:750px; text-align:left'>In a moment you will see a table that details the two target projects and relevant information about them.</fieldset>", "<fieldset style='width:750px; text-align:left'><p>As a part of the relevant information that will be provided for each target project, you will be provided with measures of overall reliability and Net Present Value (NPV). The NPV is the company\u2019s estimation of the future returns of the project. An NPV that is greater than 0 (zero) indicates that there is an expectation of profit. The higher the NPV, the better the expectations for each project. Both these measures were collected as part of a research study conducted by an international consulting company that aggregated data from thousands of other projects in relevant industries.</p></fieldset>"],
    "combined": ["<fieldset style='width:750px; text-align:left'>Imagine you are a executive in a multi-business company and that you are presented with two projects to potentially invest in. Your job is to decide how to allocate the capital available in your budget between these two projects.</fieldset>", "<fieldset style='width:750px; text-align:left'>In a moment you will see a table that details the two target projects and relevant information about them.</fieldset>", "<fieldset style='width:750px; text-align:left'><p>Managers often find it useful to consult with previous case studies before making important decisions. As well as seeing the two target projects, you will also be provided with an example of a failed project with some information that was available just before the company decided to invest in it. Further, you are also provided with an analysis of this investment decision after it became clear that the project will not meet its expected return on investment.</p><p>As a part of the relevant information that will be provided for each target project, you will be provided with measures of overall reliability and Net Present Value (NPV). The NPV is the company\u2019s estimation of the future returns of the project. An NPV that is greater than 0 (zero) indicates that there is an expectation of profit. The higher the NPV, the better the expectations for each project. Both these measures were collected as part of a research study conducted by an international consulting company that aggregated data from thousands of other projects in relevant industries.</p><p>Note that the project in the case study was included in the research study, so its features are subsumed in the aggregated data.</p></fieldset>"],
    "enhanced": ["<fieldset style='width:750px; text-align:left'>Imagine you are a executive in a multi-business company and that you are presented with two projects to potentially invest in. Your job is to decide how to allocate the capital available in your budget between these two projects.</fieldset>", "<fieldset style='width:750px; text-align:left'>In a moment you will see a table that details the two target projects and relevant information about them.</fieldset>", "<fieldset style='width:750px; text-align:left'><p>Managers often find it useful to consult with previous case studies before making important decisions. As well as seeing the two target projects, you will also be provided with an example of a failed project with some information that was available just before the company decided to invest in it. Further, you are also provided with an analysis of this investment decision after it became clear that the project will not meet its expected return on investment.</p><p>As a part of the relevant information that will be provided for each target project, you will be provided with measures of overall reliability and Net Present Value (NPV). The NPV is the company\u2019s estimation of the future returns of the project. An NPV that is greater than 0 (zero) indicates that there is an expectation of profit. The higher the NPV, the better the expectations for each project. Both these measures were collected as part of a research study conducted by an international consulting company that aggregated data from thousands of other projects in relevant industries.</p><p>Note that the project in the case study was included in the research study, so its features are subsumed in the aggregated data.</p><p><p>Alongside its results, the research study also encouraged managers to use 'scientific thinking'.</p><p>Scientific thinking can be characterized as a process of objectively analyzing information about a given topic. A scientific thinker is one who very carefully considers the quality of each piece of information so as not to be unduly swayed by insignificant and/or less significant facts.</p><p>Progress in science is generally achieved via the deliberate process of obtaining quantifiable evidence through observation and/or experimentation. The scientific method requires that experimental and observational findings be reproducible and cautions against drawing strong conclusions from any single study or observation. You may recall from statistics that this scientific principle is consistent with the fact that small samples of observations tend to have a higher probability of error while larger samples tend to be more accurate. Scientific knowledge is therefore based on an accumulation of carefully designed studies or observations which lend support to a given assertion.</p></p></fieldset>"]
  },
  "projects": {
    "anecdote": "<fieldset style='width:750px; text-align:left'><legend>Target projects</legend><p>Allocate your budget between the following two projects using percentage values (the two values should sum to 100):</p><table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;' >\n<thead>\n<tr>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Relevant information</th>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project A</th>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project B</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style='text-align: center;'>Business name</td>\n<td style='text-align: center;'>Enfuel</td>\n<td style='text-align: center;'>Microxy</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Investment</td>\n<td style='text-align: center;'>oil well</td>\n<td style='text-align: center;'>microchip</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Location</td>\n<td style='text-align: center;'>Texas, USA</td>\n<td style='text-align: center;'>Manchester, UK</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Integration</td>\n<td style='text-align: center;'>vertical</td>\n<td style='text-align: center;'>horizontal</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Structure</td>\n<td style='text-align: center;'>centralised</td>\n<td style='text-align: center;'>decentralised</td>\n</tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: center;'>Predicted project features</td>\n<td style='border-bottom: 2px solid grey; text-align: center;'><ul>  <li>Oil extracted: 2200L an hour</li>  <li>Time the machinery lasts before requiring maintenance: 8 years</li>  <li>Probability of finding oil: 88%</li>  <li>Type of well: onshore</li></ul></td>\n<td style='border-bottom: 2px solid grey; text-align: center;'><ul>  <li>Microchips produced: 4000 an hour</li>  <li>Usable semiconductor yield after testing: 60%</li>  <li>Compatible PCs in the market: 75%</li>  <li>Type of integrated circuit: digital</li></ul></td>\n</tr>\n</tbody>\n</table><p><label for=\"allocation_q_projectA\">Project A allocation: </label><input type=\"number\" id=\"allocation_q_projectA\" name=\"allocation_q_projectA\" min=\"0\" max=\"100\" required>%</p><p><label for=\"allocation_q_projectB\">Project B allocation: </label><input type=\"number\" id=\"allocation_q_projectB\" name=\"allocation_q_projectB\" min=\"0\" max=\"100\" required>%</p></fieldset>",
    "statistics": "<fieldset style='width:750px; text-align:left'><legend>Target projects</legend><p>Allocate your budget between the following two projects using percentage values (the two values should sum to 100):</p><table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;' >\n<thead>\n<tr>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Relevant information</th>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project A</th>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project B</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style='text-align: center;'>Business name</td>\n<td style='text-align: center;'>Enfuel</td>\n<td style='text-align: center;'>Microxy</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Investment</td>\n<td style='text-align: center;'>oil well</td>\n<td style='text-align: center;'>microchip</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Location</td>\n<td style='text-align: center;'>Texas, USA</td>\n<td style='text-align: center;'>Manchester, UK</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Integration</td>\n<td style='text-align: center;'>vertical</td>\n<td style='text-align: center;'>horizontal</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Structure</td>\n<td style='text-align: center;'>centralised</td>\n<td style='text-align: center;'>decentralised</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Predicted project features</td>\n<td style='text-align: center;'><ul>  <li>Oil extracted: 2200L an hour</li>  <li>Time the machinery lasts before requiring maintenance: 8 years</li>  <li>Probability of finding oil: 88%</li>  <li>Type of well: onshore</li></ul></td>\n<td style='text-align: center;'><ul>  <li>Microchips produced: 4000 an hour</li>  <li>Usable semiconductor yield after testing: 60%</li>  <li>Compatible PCs in the market: 75%</li>  <li>Type of integrated circuit: digital</li></ul></td>\n</tr>\n<tr>\n<td style='text-align: center;'>Overall reliability rating (%)</td>\n<td style='text-align: center;'>95</td>\n<td style='text-align: center;'>87</td>\n</tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: center;'>NPV ($)</td>\n<td style='border-bottom: 2px solid grey; text-align: center;'>900</td>\n<td style='border-bottom: 2px solid grey; text-align: center;'>100</td>\n</tr>\n</tbody>\n</table><p><label for=\"allocation_q_projectA\">Project A allocation: </label><input type=\"number\" id=\"allocation_q_projectA\" name=\"allocation_q_projectA\" min=\"0\" max=\"100\" required>%</p><p><label for=\"allocation_q_projectB\">Project B allocation: </label><input type=\"number\" id=\"allocation_q_projectB\" name=\"allocation_q_projectB\" min=\"0\" max=\"100\" required>%</p></fieldset>",
    "combined": "<fieldset style='width:750px; text-align:left'><legend>Target projects</legend><p>Allocate your budget between the following two projects using percentage values (the two values should sum to 100):</p><table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;' >\n<thead>\n<tr>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Relevant information</th>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project A</th>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project B</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style='text-align: center;'>Business name</td>\n<td style='text-align: center;'>Enfuel</td>\n<td style='text-align: center;'>Microxy</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Investment</td>\n<td style='text-align: center;'>oil well</td>\n<td style='text-align: center;'>microchip</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Location</td>\n<td style='text-align: center;'>Texas, USA</td>\n<td style='text-align: center;'>Manchester, UK</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Integration</td>\n<td style='text-align: center;'>vertical</td>\n<td style='text-align: center;'>horizontal</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Structure</td>\n<td style='text-align: center;'>centralised</td>\n<td style='text-align: center;'>decentralised</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Predicted project features</td>\n<td style='text-align: center;'><ul>  <li>Oil extracted: 2200L an hour</li>  <li>Time the machinery lasts before requiring maintenance: 8 years</li>  <li>Probability of finding oil: 88%</li>  <li>Type of well: onshore</li></ul></td>\n<td style='text-align: center;'><ul>  <li>Microchips produced: 4000 an hour</li>  <li>Usable semiconductor yield after testing: 60%</li>  <li>Compatible PCs in the market: 75%</li>  <li>Type of integrated circuit: digital</li></ul></td>\n</tr>\n<tr>\n<td style='text-align: center;'>Overall reliability rating (%)</td>\n<td style='text-align: center;'>95</td>\n<td style='text-align: center;'>87</td>\n</tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: center;'>NPV ($)</td>\n<td style='border-bottom: 2px solid grey; text-align: center;'>900</td>\n<td style='border-bottom: 2px solid grey; text-align: center;'>100</td>\n</tr>\n</tbody>\n</table><p><label for=\"allocation_q_projectA\">Project A allocation: </label><input type=\"number\" id=\"allocation_q_projectA\" name=\"allocation_q_projectA\" min=\"0\" max=\"100\" required>%</p><p><label for=\"allocation_q_projectB\">Project B allocation: </label><input type=\"number\" id=\"allocation_q_projectB\" name=\"allocation_q_projectB\" min=\"0\" max=\"100\" required>%</p></fieldset>",
    "enhanced": "<fieldset style='width:750px; text-align:left'><legend>Target projects</legend><p>Allocate your budget between the following two projects using percentage values (the two values should sum to 100):</p><table class='gmisc_table' style='border-collapse: collapse; margin-top: 1em; margin-bottom: 1em;' >\n<thead>\n<tr>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Relevant information</th>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project A</th>\n<th style='border-bottom: 1px solid grey; border-top: 2px solid grey; text-align: center;'>Project B</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td style='text-align: center;'>Business name</td>\n<td style='text-align: center;'>Enfuel</td>\n<td style='text-align: center;'>Microxy</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Investment</td>\n<td style='text-align: center;'>oil well</td>\n<td style='text-align: center;'>microchip</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Location</td>\n<td style='text-align: center;'>Texas, USA</td>\n<td style='text-align: center;'>Manchester, UK</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Integration</td>\n<td style='text-align: center;'>vertical</td>\n<td style='text-align: center;'>horizontal</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Structure</td>\n<td style='text-align: center;'>centralised</td>\n<td style='text-align: center;'>decentralised</td>\n</tr>\n<tr>\n<td style='text-align: center;'>Predicted project features</td>\n<td style='text-align: center;'><ul>  <li>Oil extracted: 2200L an hour</li>  <li>Time the machinery lasts before requiring maintenance: 8 years</li>  <li>Probability of finding oil: 88%</li>  <li>Type of well: onshore</li></ul></td>\n<td style='text-align: center;'><ul>  <li>Microchips produced: 4000 an hour</li>  <li>Usable semiconductor yield after testing: 60%</li>  <li>Compatible PCs in the market: 75%</li>  <li>Type of integrated circuit: digital</li></ul></td>\n</tr>\n<tr>\n<td style='text-align: center;'>Overall reliability rating (%)</td>\n<td style='text-align: center;'>95</td>\n<td style='text-align: center;'>87</td>\n</tr>\n<tr>\n<td style='border-bottom: 2px solid grey; text-align: center;'>NPV ($)</td>\n<td style='border-bottom: 2px solid grey; text-align: center;'>900</td>\n<td style='border-bottom: 2px solid grey; text-align: center;'>100</td>\n</tr>\n</tbody>\n</table><p><label for=\"allocation_q_projectA\">Project A allocation: </label><input type=\"number\" id=\"allocation_q_projectA\" name=\"allocation_q_projectA\" min=\"0\" max=\"100\" required>%</p><p><label for=\"allocation_q_projectB\">Project B allocation: </label><input type=\"number\" id=\"allocation_q_projectB\" name=\"allocation_q_projectB\" min=\"0\" max=\"100\" required>%</p></fieldset>"
  },
  "anecdote": {
    "lowA": "<fieldset style='width:750px; text-align:left'><legend>Case study</legend><ul>  <li>    Business details:    <ul>      <li>        Business name:         Refinera      </li>      <li>        Location:         Zhuhai, China      </li>      <li>        Integration:         horizontal      </li>    </ul>  </li>  <li>    Investment:    oil well  </li>  <li>    Predicted project features:    <ul>  <li>Oil extracted: 1400L an hour</li>  <li>Time the machinery lasts before requiring maintenance: 5 years</li>  <li>Probability of finding oil: 56%</li>  <li>Type of well: offshore</li></ul>  </li></ul>Refinera struggled to establish itself in the regional market because of what scientists now know is a hydrocarbon shortage in the Zhuhai area. A decentralised organisational structure meant that communication across relevant business units was delayed with what needed to be a timely process. Being horizontally integrated meant that these delays caused losses at the other well sites due to a drain on the collective resources. To make up for this, a post hoc analysis concluded that oil was needed to be extracted at a rate of 2100L an hour and sites have at least a 67% probability of finding oil before management approved the project. Further, machinery needed to have thought to last at least 8 years before requiring maintenance, because maintenance costs further offset the initial investment after the 5 years of development. Further, the well was quite difficult to construct due to it being an offshore well, and so added additional financial setbacks over the course of the project.</fieldset>",
    "highA": "<fieldset style='width:750px; text-align:left'><legend>Case study</legend><ul>  <li>    Business details:    <ul>      <li>        Business name:         Refinera      </li>      <li>        Location:         New Mexico, USA      </li>      <li>        Integration:         vertical      </li>    </ul>  </li>  <li>    Investment:    oil well  </li>  <li>    Predicted project features:    <ul>  <li>Oil extracted: 2000L an hour</li>  <li>Time the machinery lasts before requiring maintenance: 7 years</li>  <li>Probability of finding oil: 80%</li>  <li>Type of well: onshore</li></ul>  </li></ul>Refinera struggled to establish itself in the regional market because of what scientists now know is a hydrocarbon shortage in the New Mexico area. A centralised organisational structure meant that key operational decisions were delayed with what needed to be a timely process. Being vertically integrated meant that these delays caused losses at the retail sites due to miscalculations of petrol supply. To make up for this, a post hoc analysis concluded that oil was needed to be extracted at a rate of 3000L an hour and sites have at least a 96% probability of finding oil before management approved the project. Further, machinery needed to have thought to last at least 10 years before requiring maintenance, because maintenance costs further offset the initial investment after the 7 years of development. Further, the well was quite susceptible to crude oil price changes due to it being an onshore well, and so added additional financial setbacks over the course of the project.</fieldset>"
  },
  "follow_up": "Please answer the following:<fieldset style='width:750px; text-align:left'><legend>Follow up</legend><p><label for=\"follow_up_q_similarity_rating\">On a scale of 1 to 6, how similar do you think the Refinera project (the case study) is to the Enfuel project (the target oil project)? A choice of 1 indicates low similarity, and 6 indicates high similarity. </label><input type=\"number\" id=\"follow_up_q_similarity_rating\" name=\"follow_up_q_similarity_rating\" min=\"1\" max=\"6\" required></p><p><label for=\"follow_up_q_similarity_justify\">Justify your answer:</label><br><textarea id=\"follow_up_q_similarity_justify\" name=\"follow_up_q_similarity_justify\" rows=\"5\" cols=\"50\" required></textarea></p><p><label for=\"follow_up_q_relevance_specific_rating\">On a scale of 1 to 6, how relevant do you think the information about the Refinera project is for determining whether to invest in the Enfuel project? A choice of 1 indicates low relevance, and 6 indicates high relevance. </label><input type=\"number\" id=\"follow_up_q_relevance_specific_rating\" name=\"follow_up_q_relevance_specific_rating\" min=\"1\" max=\"6\" required></p><p><label for=\"follow_up_q_relevance_specific_justify\">Justify your answer:</label><br><textarea id=\"follow_up_q_relevance_specific_justify\" name=\"follow_up_q_relevance_specific_justify\" rows=\"5\" cols=\"50\" required></textarea></p><p><label for=\"follow_up_q_relevance_general_rating\">On a scale of 1 to 6, how relevant do you think the information about the Refinera project is for determining whether to invest in <i>any</i> oil well project? A choice of 1 indicates low relevance, and 6 indicates high relevance. </label><input type=\"number\" id=\"follow_up_q_relevance_general_rating\" name=\"follow_up_q_relevance_general_rating\" min=\"1\" max=\"6\" required></p><p><label for=\"follow_up_q_relevance_general_justify\">Justify your answer:</label><br><textarea id=\"follow_up_q_relevance_general_justify\" name=\"follow_up_q_relevance_general_justify\" rows=\"5\" cols=\"50\" required></textarea></p></fieldset>",
  "demographics": "<p>What is your sex? <input type=\"radio\" id=\"male\" name=\"sex\" value=\"male\" checked> <label for=\"male\">Male</label><input type=\"radio\" id=\"female\" name=\"sex\" value=\"female\"> <label for=\"female\">Female</label></p><p><label for=\"age\">What is your age? </label><input type=\"number\" id=\"age\" name=\"age\" min=\"10\" max=\"100\" required></p><p><label for=\"languages\">Do you speak a language other than English at home? </label><select id=\"languages\"><option value =\"No\"> No</option><option value =\"Chinese\"> Chinese</option><option value =\"Japanese\"> Japanese</option><option value =\"Vietnamese\"> Vietnamese</option><option value =\"Korean\"> Korean</option><option value =\"Arabic\"> Arabic</option><option value =\"Spanish\"> Spanish</option><option value =\"Italian\"> Italian</option><option value =\"Greek\"> Greek</option><option value =\"Hebrew\"> Hebrew</option><option value =\"Other\"> Other</option></select><p><label for=\"age\">If other language, please specify: </label><input type=\"text\" id=\"other\" name=\"other\"></p></p><p><label for=\"business_exp\">How many years of experience do you have working in a business setting? </label><input type=\"number\" id=\"business_exp\" name=\"business_exp\" min=\"0\" max=\"100\" required></p><p><label for=\"business_edu\">How many years of experience do you have studying business? </label><input type=\"number\" id=\"business_edu\" name=\"business_edu\" min=\"0\" max=\"100\" required></p>",
  "end_message": "<p>Press below to complete the experiment. <br >Thank you!</p>",
  "contact": "<p>I would like to receive feedback about the overall results of this study. <input type=\"radio\" id=\"contact_yes\" name=\"contact\" value = \"yes\"><label for=\"contact_yes\">YES</label> <input type=\"radio\" id=\"contact_no\" name=\"contact\" value = \"no\" checked> <label for=\"contact_no\">NO</label></p> <p>If you answered YES, please indicate your preferred form of feedback and address:</p> <p>Email: <input type=\"text\" id=\"address\" name=\"address\"></p>",
  "recruitment": {
    "sona": "<label for=\"sona\">Enter your name as it appears on SONA: </label><input type=\"text\" id=\"sona\" name=\"sona\" required size = 30></p>",
    "prolific": "<label for=\"prolific\">Enter your Prolific ID (24 alphanumeric characters, no spaces): </label><input type=\"text\" id=\"prolific\" name=\"prolific\" required minlength=\"24\" maxlength=\"24\" pattern=\"^[a-z0-9]+$\" size = 30></p>"
  }
};

