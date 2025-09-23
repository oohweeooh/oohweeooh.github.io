/* global campaignTrail_temp, jQuery, $ */

let e = campaignTrail_temp;

async function evalFromUrl(url, callback = null) {
    const evalRes = await fetch(url);
    const code = await evalRes.text();
    eval(code);

    if (callback !== null) {
        callback();
    }
}

function changeFontColour() {
    // Just to stop breaking mods
}

const baseScenarioDict = {
    1844: "1844_Clay_Fillmore.html",
    1860: "1860_Douglas_Guthrie.html",
    1896: "1896_Bryan_Boies.html",
    1916: "1916_Hughes_Burkett.html",
    1948: "1948_Dewey_Bricker.html",
    1960: "1960_Kennedy_Humphrey.html",
    1964: "1964_Goldwater_Miller.html",
    1968: "1968_Humphrey_Connally.html",
    1976: "1976_Carter_Church.html",
    1988: "1988_Bush_Dole.html",
    2000: "2000_Bush_Cheney.html",
    2012: "2012_Obama_Clinton.html",
    2016: "2016_Clinton_Booker.html",
    "2016a": "2016a_Clinton_Booker.html",
    2020: "2020_Biden_Bass.html",
};

// Global Text Variables

// Code 1 Text
e.SelectText = "Please select the election you will run in:";
e.CandidText = "Please select your candidate:";
e.VpText = "Please select your running mate:";
e.PartyText = "Party:";
e.HomeStateText = "Home State:";
// Ending Popups
e.ElectionPopup = "Election night has arrived. Settle in and wait for the returns, however                 long it may take. Best of luck!";
e.WinPopup = "Congratulations! You won this year's election! Click OK to view the                     rest of the returns, or skip straight to the final results. We hope                     you have a nice victory speech prepared for your supporters.";
e.LosePopup = "Sorry. You have lost the election this time. Click OK to view the                     rest of the returns, or skip straight to the final results. We hope                     you have a nice concession speech prepared.";

e.finalPercentDigits = 1; // for PV % in final results
e.statePercentDigits = 2;
e.SelAnsContText = "Please select an answer before continuing!";

function substitutePlaceholders(str) {
    if (!str || typeof str !== "string") return str;
    return str.replace(/\{\{(.*?)\}\}/g, (_, varName) => {
        try {
            return (window[varName] !== undefined) ? window[varName] : `{{${varName}}}`;
        } catch {
            return `{{${varName}}}`;
        }
    });
}

const DEBUG = false;

campaignTrail_temp.issue_font_size = null;
e.shining_data = {};

function debugConsole(...args) {
    if (DEBUG) {
        console.log(...args);
    }
}

function removeIssueDuplicates(array) {
    return array.filter(
        (item, index) => array.map((f) => f.issue).indexOf(item.issue) === index,
    );
}

function openTab(evt, tabName) {
    $(".tabcontent").css("display", "none");
    $(".tablinks").removeClass("active");
    $(".tablinks").attr("disabled", false);
    $(`#${tabName}`).css("display", "block");
    if (evt) {
        evt.currentTarget.classList.add("active");
        evt.currentTarget.disabled = true;
    } else {
        $("#funds")[0].classList.add("active");
        $(".tablinks")[0].disabled = true;
    }
}

let AdvisorFeedbackArr = [1, 0];

function visitState(e, s, o, t) {
    setTimeout(() => mapCache((skip = true)), 0); // cache the correct map and prevent visit glitch
    e.player_visits.push(e.states_json[s].pk), o(t);
}

function dHondtAllocation(votes, seats, thresh = 0.15) {
    const quotients = votes.splice();
    const allocations = [];
    votes.forEach(() => {
        allocations.push(0);
    });
    const total_votes = votes.reduce((sum, value) => sum + value);
    const perc_votes = [];
    votes.forEach((f) => {
        perc_votes.push(f / total_votes);
    });

    for (let i = 0; i < seats; i++) {
        for (let w = 0; w < votes.length; w++) {
            if (perc_votes[w] < thresh) {
                quotients[w] = 0;
            } else {
                quotients[w] = votes[w] / (allocations[w] + 1);
            }
        }
        index = quotients.indexOf(Math.max(...quotients));
        allocations[index] += 1;
    }

    return allocations;
}

let states = [];
const initIt = 0;

window.setInterval(() => {
    if (
        campaignTrail_temp.candidate_json
        && campaignTrail_temp.candidate_json.filter
    ) {
        campaignTrail_temp.candidate_json = campaignTrail_temp.candidate_json.filter((n) => n);
    }
}, 200);

const fileExists = function (url) {
    const req = new XMLHttpRequest();
    req.open("GET", url, false);
    console.log(`trying to get file from url ${url}`);
    req.send();
    return req.status === 200;
};

lastUpdatedDate = "2023-08-20";
let RecReading;

function simpleAdventure(ans) {
    return 1203;
}

let HistHexcolour = ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
let HistName = ["N/A", "N/A", "N/A", "N/A"];
let HistEV = [0, 0, 0, 0];
let HistPV = [0, 0, 0, 0];
let HistPVP = [0, 0, 0, 0];

function histFunction() {
    if (modded === false) {
        switch (campaignTrail_temp.election_id) {
            case 21: // 2020
                HistHexcolour = ["#0000FF", "#FF0000", "#FFFF00", "#00C100"];
                HistName = [
                    " Joe Biden",
                    " Donald Trump",
                    " Jo Jorgensen",
                    " Howie Hawkins",
                ];
                HistEV = [306, 232, 0, 0];
                HistPV = ["81,268,924", "74,216,154", "1,865,724", "405,035"];
                HistPVP = ["51.3%", "46.9%", "1.2%", "0.4%"];
                break;
            case 20: // 2016
            case 16: // 2016a
                HistHexcolour = ["#FF0000", "#0000FF", "#FFFF00", "#00C100"];
                HistName = [
                    " Donald Trump",
                    " Hillary Clinton",
                    " Gary Johnson",
                    " Jill Stein",
                ];
                HistEV = [306, 232, 0, 0];
                HistPV = ["62,984,828", "65,853,514", "4,489,341", "405,035"];
                HistPVP = ["46.1%", "48.2%", "3.3%", "1.1%"];
                break;
            case 3: // 2012
                HistHexcolour = ["#0000FF", "#FF0000", "#FFFF00", "#00C100"];
                HistName = [
                    " Barack Obama",
                    " Mitt Romney",
                    " Gary Johnson",
                    " Jill Stein",
                ];
                HistEV = [332, 206, 0, 0];
                HistPV = ["65,915,795", "60,933,504", "1,275,971", "469,627"];
                HistPVP = ["51.1%", "47.2%", "1.0%", "0.4%"];
                break;
            case 9: // 2000
                HistHexcolour = ["#FF0000", "#0000FF", "#00C100", "#FFFF00"];
                HistName = [" George W. Bush", " Al Gore", " Ralph Nader", " Pat Buchanan"];
                HistEV = [271, 267, 0, 0];
                HistPV = ["50,456,002", "50,999,897", "2,882,955", "448,895"];
                HistPVP = ["47.9%", "48.4%", "2.7%", "0.4%"];
                break;
            case 15: // 1988
                HistHexcolour = ["#FF0000", "#0000FF", "#FFFF00", "#00C100"];
                HistName = [
                    " George Bush",
                    " Michael Dukakis",
                    " Ron Paul",
                    " Lenora Fulani",
                ];
                HistEV = [426, 112, 0, 0];
                HistPV = ["48,886,597", "41,809,476", "431,750", "217,221"];
                HistPVP = ["53.4%", "45.7%", "0.5%", "0.2%"];
                break;
            case 10: // 1976
                HistHexcolour = ["#0000FF", "#FF0000", "#00C100", "#FFFF00"];
                HistName = [
                    " Jimmy Carter",
                    " Gerald Ford",
                    " Eugene McCarthy",
                    " Roger MacBride",
                ];
                HistEV = [297, 241, 0, 0];
                HistPV = ["40,831,881", "39,148,634", "744,763", "172,557"];
                HistPVP = ["50.1", "48.0", "0.9%", "0.2%"];
                break;
            case 4: // 1968
                HistHexcolour = ["#FF0000", "#0000FF", "#FFFF00", "#FFFFFF"];
                HistName = [
                    " Richard Nixon",
                    " Hubert Humphrey",
                    " George Wallace",
                    " Other",
                ];
                HistEV = [302, 191, 45, 0];
                HistPV = ["31,783,783", "31,271,839", "9,901,118", "243,259"];
                HistPVP = ["43.4%", "42.7%", "13.5%", "0.3%"];
                break;
            case 69: // 1964
                HistHexcolour = ["#0000FF", "#FF0000", "#FFFF00", "#00C100"];
                HistName = [
                    " Lyndon B. Johnson",
                    " Barry Goldwater",
                    " Unpledged electors",
                    " Eric Hass",
                ];
                HistEV = [486, 52, 0, 0];
                HistPV = ["43,129,040", "27,175,754", "210,732", "45,189"];
                HistPVP = ["61.1%", "38.5%", "0.3%", ">0.1%"];
                break;
            case 11: // 1960
                HistHexcolour = ["#0000FF", "#FF0000", "#FFFF00", "#FFFFFF"];
                HistName = [
                    " John Kennedy",
                    " Richard Nixon",
                    " Harry Byrd",
                    " Unpledged",
                ];
                HistEV = [303, 219, 15, 0];
                HistPV = ["34,220,984", "34,108,157", "0", "286,359"];
                HistPVP = ["49.7%", "49.5%", "0", "0.4%"];
                break;
            case 12: // 1948
                HistHexcolour = ["#0000FF", "#FF0000", "#FFFF00", "#00C100"];
                HistName = [
                    " Harry Truman",
                    " Thomas Dewey",
                    " Strom Thurmond",
                    " Henry Wallace",
                ];
                HistEV = [303, 189, 39, 0];
                HistPV = ["24,179,347", "21,991,292", "1,175,930", "1,157,328"];
                HistPVP = ["49.6%", "45.1%", "2.4%", "2.4%"];
                break;
            case 14: // 1916
                HistHexcolour = ["#0000FF", "#FF0000", "#00C100", "#FFFF00"];
                HistName = [
                    " Woodrow Wilson",
                    " Charles Evans Hughes",
                    " Allan Benson",
                    " James Hanly",
                ];
                HistEV = [277, 254, 0, 0];
                HistPV = ["9,126,868", "8,548,728", "590,524", "221,302"];
                HistPVP = ["49.2%", "46.1%", "3.2%", "1.2%"];
                break;
            case 5: // 1896
                HistHexcolour = ["#FF0000", "#0000FF", "#FFFF00", "#FF00FF"];
                HistName = [
                    " William McKinley",
                    " William Jennings Bryan",
                    " John Palmer",
                    " Joshua Levering",
                ];
                HistEV = [271, 176, 0, 0];
                HistPV = ["7,111,607", "6,509,052", "134,645", "131,312"];
                HistPVP = ["51.0%", "46.7%", "1.0%", "0.9%"];
                break;
            case 8: // 1860
                HistHexcolour = ["#FF0000", "#FFFF00", "#00C100", "#0000FF"];
                HistName = [
                    " Abraham Lincoln",
                    " John C. Breckinridge",
                    " John Bell",
                    " Stephen Douglas",
                ];
                HistEV = [180, 72, 39, 12];
                HistPV = ["1,865,908", "848,019", "590,901", "1,380,202"];
                HistPVP = ["39.8%", "18.1%", "12.6%", "29.5%"];
                break;
            case 13: // 1844
                HistHexcolour = ["#0000FF", "#F0C862", "#FFFF00"];
                HistName = [
                    " James K. Polk",
                    " Henry Clay",
                    " James Birney",
                ];
                HistEV = [170, 105, 0];
                HistPV = ["1,339,494", "1,300,004", "62,103"];
                HistPVP = ["49.5%", "48.1%", "2.3%"];
                break;
        }
    }
}

function cyoAdventure(question) {
    latestAnswer = campaignTrail_temp.player_answers[
    campaignTrail_temp.player_answers.length - 1
        ];
    for (i = 0; i < campaignTrail_temp.questions_json.length; i++) {
        if (campaignTrail_temp.questions_json[i].pk == question.pk) {
            for (v = 0; v < campaignTrail_temp.questions_json.length; v++) {
                if (
                    campaignTrail_temp.questions_json[v].pk
                    === simpleAdventure(latestAnswer)
                ) {
                    campaignTrail_temp.questions_json[
                        campaignTrail_temp.question_number
                        ] = campaignTrail_temp.questions_json[v];
                    break;
                }
            }
            break;
        }
    }
}

campaignTrail_temp.margin_format = window.localStorage.getItem("margin_form") ?? "#FFFFFF";

function encode(str) {
    const revArray = [];
    const length = str.length - 1;

    for (let i = length; i >= 0; i--) {
        revArray.push(str[i]);
    }

    return revArray.join("");
}

function gradient(interval, min, max) {
    if (interval < min) return min;
    if (interval > max) return max;
    return interval;
}

function csrfToken() {
    return (function (e) {
        let t = null;
        if (document.cookie && document.cookie != "") {
            for (let i = document.cookie.split(";"), a = 0; a < i.length; a++) {
                const s = jQuery.trim(i[a]);
                if (s.substring(0, e.length + 1) == `${e}=`) {
                    t = decodeURIComponent(s.substring(e.length + 1));
                    break;
                }
            }
        }
        return t;
    }("csrftoken"));
}

slrr = "";
rrr = "";
starting_mult = 0;
encrypted = Math.round(Math.random() * 100);
t = "";
nnn = "";

function switchPV() {
    // switchingEst, rrr, _, pvswitcher
    swE = document.getElementById("switchingEst");
    if (swE.innerHTML == rrr) {
        swE.innerHTML = slrr;
        pvswitcher.innerText = "PV Estimate";
    } else {
        swE.innerHTML = rrr;
        pvswitcher.innerText = "Switch to State Estimate";
    }
    document.getElementById("ev_est").style.display = "";
}

function evest() {
    document.getElementById("ev_est").style.display = "none";
    swE = document.getElementById("switchingEst");
    swE.innerHTML = nnn;
}

function containsObject(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

function copy(mainObject) {
    const objectCopy = {}; // objectCopy will store a copy of the mainObject
    let key;
    for (key in mainObject) {
        objectCopy[key] = mainObject[key]; // copies each property to the objectCopy object
    }
    return objectCopy;
}

modded = false;
i = 1;
moddercheckeror = false;
code222 = [];
kill = false;
important_info = "";

// getResults is a way to get results for an election without using custom endings
// Mainly for backporting achivements to old mods
getResults = function (out, totv, aa, quickstats) {
    // To override
};

function endingPicker(out, totv, aa, quickstats) {
    // out = "win", "loss", or "tie" for your candidate
    // totv = total votes in entire election
    // aa = all final overall results data
    // quickstat = relevant data on candidate performance (format: your candidate's electoral vote count, your candidate's popular vote share, your candidate's raw vote total)

    if (important_info.indexOf("404") > -1) {
        important_info = "return false";
    }

    if (important_info != "") {
        a = new Function("out", "totv", "aa", "quickstats", important_info)(
            out,
            totv,
            aa,
            quickstats,
        );
        return a;
    }

    return "ERROR";
}

function modSelectChange() {
    if ($("#modSelect")[0].value == "other") {
        $("#customMenu")[0].style.display = "block";
    } else {
        $("#customMenu")[0].style.display = "none";
    }
}

function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], {
        type: contentType,
    });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function exportResults() {
    const results = {
        election_id: campaignTrail_temp.election_id,
        player_candidate: campaignTrail_temp.candidate_id,
        results: campaignTrail_temp.final_state_results.map((stateResult) => {
            // Get state abbreviation
            const stateAbbreviation = stateResult.abbr;

            // Total votes in the state for percentage calculation
            const totalPopularVotes = stateResult.result.reduce(
                (total, candidateResult) => total + (candidateResult.votes || 0), // Add up all popular votes
                0,
            );

            return {
                state: stateAbbreviation,
                results: stateResult.result.map((candidateResult) => {
                    const candidate = campaignTrail_temp.candidate_json.find(
                        (candidate) => candidate.pk === candidateResult.candidate,
                    );

                    return {
                        candidate_name: `${candidate.fields.first_name} ${candidate.fields.last_name}`,
                        electoral_votes: candidateResult.electoral_votes,
                        popular_votes: candidateResult.votes || 0,
                        vote_percentage: totalPopularVotes
                            ? ((candidateResult.votes || 0) / totalPopularVotes) * 100
                            : 0, // Avoid NaN if no votes exist
                    };
                }),
            };
        }),
    };

    // Convert the data to JSON and download as a file
    const fileContent = JSON.stringify(results, null, 2);
    const fileName = `election_results_${campaignTrail_temp.election_id}.json`;

    const element = document.createElement("a");
    const fileBlob = new Blob([fileContent], {type: "application/json"});
    element.href = URL.createObjectURL(fileBlob);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

diff_mod = false;

$("#submitMod").click(() => {
    document.getElementById("featured-mods-area").style.display = "none";
    if ($("#importfile")[0].value != "") {
        const content = document.querySelector(".content");
        const [file] = document.querySelector("input[type=file]").files;
        const reader = new FileReader();

        reader.onload = function (fle) {
            importedtext = fle.target.result;
            importedtext = encode(importedtext);
            importedtext = atob(importedtext);
            campaignTrail_temp.dagakotowaru = importedtext;
        };
        reader.readAsText(file);
    }
    if ($("#modSelect")[0].value == "other") {
        important_info = $("#codeset3")[0].value;
        if (important_info != "") {
            campaignTrail_temp.multiple_endings = true;
        }
        if (!moddercheckeror) {
            e = campaignTrail_temp;
            eval($("#codeset1")[0].value);
            moddercheckeror = true;
        }
    } else {
        evalFromUrl(`../static/mods/${$("#modSelect")[0].value}_init.html`);
        diff_mod = true;
    }
    $("#modloaddiv")[0].style.display = "none";
    $("#modLoadReveal")[0].style.display = "none";
    modded = true;
});
const F = () => {
    let e;
    let t;
    let
        i;
    do {
        i = (e = 2 * Math.random() - 1) * e + (t = 2 * Math.random() - 1) * t;
    } while (i >= 1 || i == 0);
    return e * Math.sqrt((-2 * Math.log(i)) / i);
};

function divideElectoralVotesProp(e, t) {
    for (var i = [], a = 0, s = 0; s < e.length; s++) {
        const n = Math.floor(e[s] * t);
        i.push(n), (a += n);
    }
    return (i[0] += t - a), i;
}

!(function () {
    let e = campaignTrail_temp;

    const shining_menu = (polling, e = campaignTrail_temp) => {
        const game_winArr = Array.from($("#game_window")[0].children);

        const inflation_factor = 1.04 ** (2020 - e.election_json.find((f) => f.pk === e.election_id).fields.year);

        const uninflatedBalance = e.shining_data.balance / inflation_factor;
        const uninflatedPrev = e.shining_data.prev_balance / inflation_factor;
        const change = uninflatedBalance - uninflatedPrev;

        let projected_change = change;

        const update_projection = () => {
            const our_info = campaignTrail_temp.shining_info.find(
                (f) => f.pk === e.election_id && f.candidate === e.candidate_id,
            );

            projected_change = 0;
            projected_change
                += 5000000
                * e.shining_data.times.fundraising_time
                * (our_info ? our_info.fundraising_effect : 1);
            projected_change -= 500000;

            our_info.lobby.forEach((f) => {
                const x = f.opinion;
                const r = 0.097;
                const x0 = 65.3;
                const y = f.fund_base / (1 + Math.exp(-r * (x - x0)));
                projected_change += y;
            });

            e.shining_data.ad_spending.forEach((f) => {
                projected_change -= f.amount;
            });

            projected_change /= inflation_factor;

            $("#projected_change").html(
                `<b>Estimated change for next turn:</b> <span style='${projected_change > 0 ? "color:green" : projected_change == 0 ? "color:yellow" : "color:red"};'>${projected_change < 0 ? "-$" : "$"}${Math.abs(Math.floor(projected_change)).toLocaleString()}</span>`,
            );
        };

        const DEBT_STRING = uninflatedBalance < 0
            ? "<p style='color:red;font-weight:bolder;'>Campaign currently in debt. Effectiveness will suffer.</p>"
            : "";

        let a_states = "";
        for (const i in e.states_json) {
            a_states += `<option value='${e.states_json[i].pk}'>${e.states_json[i].fields.name}</option>\n`;
        }

        const adSpendTable = `
            <table id="ad_spend_table" style='text-align:center;width: 60%; margin-top: .1em; margin-left: auto; margin-right: auto; background-color: #F9F9F9;color:black;'>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Amount per Turn</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Table rows will be added dynamically -->
                </tbody>
            </table>
        `;

        const staffTable = `
            <table id="staff_table" style='text-align:center;width: 60%; margin-top: .1em; margin-left: auto; margin-right: auto; background-color: #F9F9F9;color:black;'>
                <thead>
                    <tr>
                        <th>Staff</th>
                        <th style="width: 250px;">Description</th>
                        <th>Cost (one time)</th>
                        <th>Hired?</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Table rows will be added dynamically -->
                </tbody>
            </table>
        `;

        const lobbyTable = `
            <table id="pac_table" style='text-align:center;width: 60%; margin-top: .1em; margin-left: auto; margin-right: auto; background-color: #F9F9F9;color:black;'>
                <thead>
                    <tr>
                        <th style="width: 200px;">Organisation</th>
                        <th style="width: 150px;">Description</th>
                        <th>Relationship</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Table rows will be added dynamically -->
                </tbody>
            </table>
        `;

        const z = `

        <div class="inner_window_front" id="shining_menu_header" style="height: 50px; background-color:#2d2d2d">
            <h1 style='position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);font-family: Arial, "Helvetica Neue", Helvetica, sans-serif; text-align: center; font-size: 3em; line-height: normal; font-style: italic; color: white; margin: 0;font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;'>
                State of the Campaign
            </h1>
        </div>
        <div class="shining_tab" style='position: absolute;bottom: 65px;left:50%;transform:translateX(-50%)'>
            <button class="tablinks" onclick="openTab(event, 'funds')">Funds</button>
            <button class="tablinks" onclick="openTab(event, 'campaign_time')">Campaign Time</button>
            <button class="tablinks" onclick="openTab(event, 'ad_campaign')">Ad Campaign</button>
            <button class="tablinks" onclick="openTab(event, 'staff')">Staff</button>
            <button class="tablinks" onclick="openTab(event, 'lobbies')">Lobbies</button>
        </div>
        <div class="inner_window_front" id="shining_menu" style="height: 260px; overflow-y: auto; background-color:#2d2d2d; color:white;">
            <div id="funds" class="tabcontent">
                <h2>Funds</h2>
                <p><b>Current balance:</b> <span id='shining_balance'>$${Math.floor(uninflatedBalance).toLocaleString()}</span></p>
                <p><b>Change in balance from previous turn:</b> <span style='${change > 0 ? "color:green" : change == 0 ? "color:yellow" : "color:red"};'>${change < 0 ? "-$" : "$"}${Math.abs(Math.floor(change)).toLocaleString()}</span></p>
                <p id='projected_change'><b>Estimated change for next turn:</b> <span style='${projected_change > 0 ? "color:green" : projected_change == 0 ? "color:yellow" : "color:red"};'>${projected_change < 0 ? "-$" : "$"}${Math.abs(Math.floor(projected_change)).toLocaleString()}</span></p>
                ${DEBT_STRING}
            </div>
            <div id="campaign_time" class="tabcontent">
                <h2>Campaign Time</h2>
                <div class="time_slider_group">
                    <div class="time_slider">
                        <label for="campaign_time_physical">Physically Campaigning:</label>
                        <input type="range" id="campaign_time_physical" min="0" max="1" step="0.01" value="0.33">
                    </div>
                    <div class="time_slider">
                        <label for="campaign_time_fundraising">Fundraising:</label>
                        <input type="range" id="campaign_time_fundraising" min="0" max="1" step="0.01" value="0.33">
                    </div>
                    <div class="time_slider">
                        <label for="campaign_time_media">Media Engagement:</label>
                        <input type="range" id="campaign_time_media" min="0" max="1" step="0.01" value="0.34">
                    </div>
                </div>
            </div>
            <div id="ad_campaign" class="tabcontent">
                <h2>Ad Campaign</h2>
                <p>Select a state to add ad spending for it:</p>
                <select id='shining_ad_state_sel'>${a_states}</select>
                <p>Enter ad spending amount:</p>
                <input id="ad_spending_amount" placeholder="Amount">
                <input type="range" id="ad_spending_slider" min="0" step="1">
                <button id="add_ad_spending">Add Spending</button>
                <h2>Current Ad Spends</h2>
                <em>Note: will <b>all</b> automatically be cancelled in the event of your campaign running a debt.</em>
                <p>
                <center> <!-- This tag can be explained by laziness -->
                ${adSpendTable}
                </center>
                </p>
            </div>
            <div id="staff" class="tabcontent">
                <h2>Staff</h2>
                <center> <!-- This tag can be explained by laziness -->
                ${staffTable}
                </center>
            </div>
            <div id="lobbies" class="tabcontent">
                <h2>Lobbies</h2>
                <em>Align your answers with an organisation's values in order to have them contribute to fundraising.</em>
                <p>
                <center> <!-- This tag can be explained by laziness -->
                ${lobbyTable}
                </center>
                </p>
            </div>
        </div>
            <button id="shining_back" style="position: relative; bottom: -13px; left: -380px; width: 150px; height: 80px; font-size: 40px; padding-top: 5px; padding-left: 8px;">
                <b>BACK</b>
            </button>

            <style>
                .time_slider_group {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .time_slider {
                    display: flex;
                    align-items: center;
                    margin-bottom: 8px;
                }

                .time_slider label {
                    margin-right: 10px;
                    width: 180px; /* Adjust this width as needed */
                }
            </style>
            `;
        for (i in game_winArr) {
            if (
                game_winArr[i].getAttribute("id") != "main_content_area"
                && game_winArr[i].getAttribute("class") != "game_header"
            ) {
                game_winArr[i].remove();
            }
        }

        const game_window = $("#game_window")[0];
        if ($("#main_content_area")[0]) $("#main_content_area")[0].style.display = "none";

        const inner_window_question = document.createElement("div");
        // inner_window_question.setAttribute("class", "inner_window_question");
        inner_window_question.innerHTML = z;
        game_window.appendChild(inner_window_question);

        $("#shining_back").click(() => {
            o(polling);
        });

        $("#add_ad_spending").click(() => {
            let currval = $("#ad_spending_amount").val();
            currval = currval.replaceAll(",", "");
            currval = Math.abs(Number(currval));
            currval = isNaN(currval) ? 0 : Math.floor(currval);
            currval = Math.min(e.shining_data.balance / inflation_factor, currval);
            currval = Math.max(0, currval);

            const selectedStatePk = Number($("#shining_ad_state_sel").val());
            const adSpendingAmount = currval;

            const currentState = e.shining_data.ad_spending.find(
                (f) => f.state == selectedStatePk,
            );

            if (currentState) {
                e.shining_data.balance += currentState.amount;
                currentState.amount = adSpendingAmount * inflation_factor;
            } else {
                e.shining_data.ad_spending.push({
                    state: selectedStatePk,
                    amount: adSpendingAmount * inflation_factor,
                });
            }

            e.shining_data.balance -= adSpendingAmount * inflation_factor;

            update_projection();

            $("#ad_spending_slider").val(0);
            $("#ad_spending_amount").val(0);
            updateSliderMax();
            update_projection();

            const stateName = $("#shining_ad_state_sel option:selected").text();
            update_ad_table();
        });

        const updateSliderMax = () => {
            const currentBalance = parseFloat(
                e.shining_data.balance / inflation_factor,
            );
            const slider = $("#ad_spending_slider");
            slider.attr("max", currentBalance);
            slider.val(0);
            $("#shining_balance").html(
                `$${Math.floor(e.shining_data.balance / inflation_factor).toLocaleString()}`,
            );
        };

        const update_staff_table = () => {
            const tableBody = $("#staff_table tbody");
            tableBody.html("");

            const our_info = campaignTrail_temp.shining_info.find(
                (f) => f.pk === e.election_id && f.candidate === e.candidate_id,
            );

            for (const i in our_info.staff) {
                const targ = our_info.staff[i];
                const hire_str = targ.hired == true
                    ? `<em>Hired.</em>`
                    : `<button class="hire_button" data-pk="${targ.pk}" style='color:green'>Hire</button>`;
                const newRow = `
                <tr>
                    <td><h4>${targ.name}</h4><img style='width:100px' src='${targ.image}'></img></td>
                    <td>${targ.description}</td>
                    <td>$${Math.floor(targ.cost / inflation_factor).toLocaleString()}</td>
                    <td>${hire_str}</td>
                </tr>
                `;
                tableBody.append(newRow);
                $(`button.hire_button[data-pk="${targ.pk}"]`).click(() => {
                    if (e.shining_data.balance < 0) {
                        return;
                    }

                    e.shining_data.balance -= targ.cost;

                    our_info.staff[i].hired = true;
                    our_info.staff[i].execute();

                    updateSliderMax();
                    update_projection();
                    update_staff_table();
                });
            }
        };

        const update_pac_table = () => {
            const tableBody = $("#pac_table tbody");
            tableBody.html("");

            const our_info = campaignTrail_temp.shining_info.find(
                (f) => f.pk === e.election_id && f.candidate === e.candidate_id,
            );

            for (const i in our_info.lobby) {
                const targ = our_info.lobby[i];
                const newRow = `
                <tr>
                    <td><h4>${targ.name}</h4><img style='width:100px' src='${targ.image}'></img></td>
                    <td>${targ.description}</td>
                    <td>Opinion: ${Math.floor(targ.opinion)}<br>Max Bonus: $${Math.floor(targ.fund_base / inflation_factor).toLocaleString()}</td>
                </tr>
                `;
                tableBody.append(newRow);
            }
        };

        const update_ad_table = () => {
            const tableBody = $("#ad_spend_table tbody");
            tableBody.html("");

            for (const i in e.shining_data.ad_spending) {
                const targ = e.shining_data.ad_spending[i];
                const newRow = `
                <tr>
                    <td>${e.states_json.find((f) => f.pk === targ.state).fields.name}</td>
                    <td>$${Math.floor(targ.amount / inflation_factor).toLocaleString()}</td>
                    <td><button class="remove_ad_spend" data-state-pk="${targ.state}" style='color:red'>Remove</button></td>
                </tr>
                `;
                tableBody.append(newRow);
                $(`button.remove_ad_spend[data-state-pk="${targ.state}"]`).click(() => {
                    e.shining_data.balance += targ.amount;

                    e.shining_data.ad_spending.splice(i, 1);

                    updateSliderMax();
                    update_ad_table();
                    update_projection();
                });
            }
        };

        $("#ad_spending_slider").change(() => {
            $("#ad_spending_amount").val($("#ad_spending_slider").val());
            $("#ad_spending_amount").val(Number($("#ad_spending_amount").val()));
        });

        $("#ad_spending_amount").change(() => {
            let currval = $("#ad_spending_amount").val();
            currval = currval.replaceAll(",", "");
            currval = Math.abs(Number(currval));
            currval = isNaN(currval) ? 0 : Math.floor(currval);
            currval = Math.min(e.shining_data.balance / inflation_factor, currval);
            currval = Math.max(0, currval);

            $("#ad_spending_amount").val(currval);
            $("#ad_spending_slider").val(currval);
        });

        function updateSliders(physicalTime, fundraisingTime, mediaTime) {
            $("#campaign_time_physical").val(physicalTime);
            $("#campaign_time_fundraising").val(fundraisingTime);
            $("#campaign_time_media").val(mediaTime);

            e.shining_data.times.physical_time = physicalTime;
            e.shining_data.times.fundraising_time = fundraisingTime;
            e.shining_data.times.media_time = mediaTime;

            update_projection();
        }

        $(
            "#campaign_time_physical, #campaign_time_fundraising, #campaign_time_media",
        ).on("input", () => {
            const physicalTime = parseFloat($("#campaign_time_physical").val());
            const fundraisingTime = parseFloat($("#campaign_time_fundraising").val());
            const mediaTime = parseFloat($("#campaign_time_media").val());

            const total = physicalTime + fundraisingTime + mediaTime;

            // ensure the total time adds up to 1
            if (total !== 0) {
                const adjustment = 1 / total;
                updateSliders(
                    physicalTime * adjustment,
                    fundraisingTime * adjustment,
                    mediaTime * adjustment,
                );
            } else {
                updateSliders(0.33, 0.33, 0.34);
            }
        });

        updateSliders(
            e.shining_data.times.physical_time,
            e.shining_data.times.fundraising_time,
            e.shining_data.times.media_time,
        );

        updateSliderMax();
        $("#ad_spending_slider").val(0);
        $("#ad_spending_amount").val(0);
        update_ad_table();
        update_staff_table();
        update_pac_table();
        update_projection();

        openTab(null, "funds");
    };

    const shining_cal = (polling) => {
        // run at the start of every turn

        const our_info = campaignTrail_temp.shining_info.find(
            (f) => f.pk === e.election_id && f.candidate === e.candidate_id,
        );

        // opponent visit logic
        if (
            (e.question_number + 1) % 2 == 0
            && e.election_json.find((f) => f.pk === e.election_id).fields.has_visits == 1
        ) {
            const active_opps = e.opponents_list.filter(
                (f) => e.candidate_json.find((_f) => _f.pk === f).fields.is_active === 1,
            );

            // calculate closest state for each oppo
            const closests = {};
            active_opps.forEach((opp) => {
                let closest = polling[0];
                polling.forEach((state) => {
                    if (
                        state.result[0].candidate === opp
                        || state.result[1].candidate === opp
                    ) {
                        if (
                            Math.abs(state.result[0].percent - state.result[1].percent)
                            < Math.abs(closest.result[0].percent - closest.result[1].percent)
                        ) {
                            closest = state;
                        }
                    }
                });
                closests[opp] = closest;
            });

            e.opponent_visits.push({});
            active_opps.forEach((f) => {
                e.opponent_visits[e.opponent_visits.length - 1][f] = closests[f].state;
                const target = e.candidate_state_multiplier_json.find(
                    (_f) => _f.fields.state === closests[f].state && _f.fields.candidate === f,
                );

                target.fields.state_multiplier
                    += 0.001 * (our_info ? our_info.opponent_visit_effect : 1);
            });
        }

        // update PAC opinions

        our_info.lobby.forEach((f) => {
            const relevant = e.answer_score_issue_json.filter(
                (_f) => _f.fields.issue === f.issue_tie
                    && _f.fields.answer === e.player_answers[e.player_answers.length - 1],
            );
            for (const i in relevant) {
                const op_raw = f.issue_link(
                    relevant[i].fields.issue_score * relevant[i].fields.issue_importance,
                );
                const op_final = op_raw * 10;
                f.opinion += op_final;
                f.opinion = Math.min(100, f.opinion);
            }
        });

        // update previous balance before we go into the current balance
        e.shining_data.prev_balance = e.shining_data.balance;

        // deal with time spent

        e.shining_data.balance
            += 5000000
            * e.shining_data.times.fundraising_time
            * (our_info ? our_info.fundraising_effect : 1); // base fundraising value
        e.shining_data.balance -= 500000 - 100000 * F(e.candidate_id); // base upkeep cost with normalised RNG element

        // add to balance based on PAC opinions

        our_info.lobby.forEach((f) => {
            const x = f.opinion;
            const r = 0.097;
            const x0 = 65.3;
            const y = f.fund_base / (1 + Math.exp(-r * (x - x0)));
            e.shining_data.balance += y;
        });

        // if >0.5 of the player's time is not spent on media, this will hurt them
        let media_boost = (e.shining_data.times.media_time - 0.5) * 0.0025;
        media_boost = e.shining_data.balance < 0 ? media_boost - 0.0025 : media_boost; // debt penalty
        e.candidate_state_multiplier_json.forEach((f) => {
            if (f.fields.candidate === e.candidate_id) {
                f.fields.state_multiplier += media_boost;
            }
        });

        // visit multiplier; same deal as above. will halve your visit effects at 0 and double at 1.
        e.shining_data.visit_multiplier
            += (e.shining_data.times.physical_time * 2 - 1) / 50;
        e.shining_data.visit_multiplier = Math.max(
            0,
            e.shining_data.visit_multiplier,
        );
        e.shining_data.visit_multiplier = Math.min(
            2,
            e.shining_data.visit_multiplier,
        );

        // ads
        e.shining_data.ad_spending.forEach((f) => {
            const target = e.candidate_state_multiplier_json.find(
                (_f) => f.state === _f.fields.state && _f.fields.candidate === e.candidate_id,
            );
            const currMult = target.fields.state_multiplier;
            const boost = (currMult * f.amount) / 750000000;
            console.log(target.fields.state_multiplier);
            target.fields.state_multiplier
                += boost * (our_info ? our_info.ad_effect : 1);
            console.log(target.fields.state_multiplier);

            e.shining_data.balance -= f.amount;
        });

        if (e.shining_data.balance < 0) {
            e.shining_data.ad_spending = [];
        }
    };

    e.answer_count = 4;

    const o = (t, e = campaignTrail_temp) => {
        for (
            var i = [], a = 0;
            a < e.answers_json.length
            && (e.answers_json[a].fields.question
                != e.questions_json[e.question_number].pk
                || (i.push({
                    key: a,
                    order: Math.random(),
                }),
                e.answer_count != i.length));
            a++
        ) ;
        P(i, "order");
        let s = "";
        for (a = 0; a < i.length; a++) {
            s
                += `<input type="radio" name="game_answers" class="game_answers"             id="game_answers[${
                a.toString()
            }]" value="${
                e.answers_json[i[a].key].pk
            }"/>\t\t    <label for="game_answers[${
                a.toString()
            }]">${
                substitutePlaceholders(e.answers_json[i[a].key].fields.description)
            }</label><br>`;
        }
        const l = `<img id="candidate_pic" src="${
            e.candidate_image_url
        }">    <img id="running_mate_pic" src="${
            e.running_mate_image_url
        }">    <div class="inner_window_sign_display">        <div id="progress_bar">\t    <h3>Question ${
            e.question_number + 1
        } of ${
            e.global_parameter_json[0].fields.question_count
        }</h3>        </div>        <div id="campaign_sign">        <p>${
            e.candidate_last_name
        }</p>        <p>${
            e.running_mate_last_name
        }</p>        </div>    </div>`;
        const game_winArr = Array.from($("#game_window")[0].children);
        const shining_button = e.game_type_id == "3"
            ? `
            <button id="shining_menu_button" class="answer_select_button" style='color:navy;font-weight:bolder;margin-left:1.5em;'>The Campaign</button>
        `
            : "";
        const z = `
        <div class="inner_inner_window">
            <h3>${substitutePlaceholders(e.questions_json[e.question_number].fields.description)}</h3>
            <div id="question_form">
                <form name="question">${s}</form>
            </div>
        </div>
        <p>
            <button id="answer_select_button" class="answer_select_button">CONTINUE</button>
            <button id="view_electoral_map">Latest Polls/Electoral Map</button>
            ${shining_button}
        </p>
        `;
        for (i in game_winArr) {
            if (
                game_winArr[i].getAttribute("id") != "main_content_area"
                && game_winArr[i].getAttribute("class") != "game_header"
            ) {
                game_winArr[i].remove();
            }
        }
        const game_window = $("#game_window")[0];
        if ($("#main_content_area")[0]) $("#main_content_area")[0].style.display = "none";

        const inner_window_question = document.createElement("div");
        inner_window_question.setAttribute("class", "inner_window_question");
        inner_window_question.innerHTML = z;
        game_window.appendChild(inner_window_question);

        const ports = document.createElement("g");
        ports.innerHTML = l;
        game_window.appendChild(ports);

        // $("#game_window").html(l)

        $("#view_electoral_map").click(() => {
            openMap(t);
        });

        $("#shining_menu_button").click(() => {
            shining_menu(t);
        });

        const answerButton = $("#answer_select_button")[0];
        answerButton.addEventListener("click", onAnswerSelectButtonClicked);
    };

    function onAnswerSelectButtonClicked() {
        const selectedAnswerPk = $("input:radio[name=game_answers]:checked").val();
        debugConsole(
            "answer button clicked, skip question? ",
            campaignTrail_temp.skippingQuestion,
            "selected answer",
            selectedAnswerPk,
        );
        if (selectedAnswerPk == null && !campaignTrail_temp.skippingQuestion) {
            // Show "you must select answer"
            C(e.election_id);
        } else {
            // Apply effects
            n(selectedAnswerPk);
        }
        campaignTrail_temp.skippingQuestion = false;
    }

    function electionNight() {
        !(function () {
            for (var t = u(), i = "", a = 0; a < t.length; a++) {
                i
                    += `            <li><span style="color:${
                    t[a].color
                }; background-color: ${
                    t[a].color
                }">--</span> ${
                    t[a].last_name
                }:  0</li>`;
            }
            const s = S(e.election_id);
            const n = e.election_json[s].fields.winning_electoral_vote_number;
            $("#game_window").html(
                `        <div class="game_header">            ${
                    corrr
                }        </div>        <div id="main_content_area">            <div id="map_container"></div>            <div id="menu_container">                <div id="overall_result_container">                    <div id="overall_result">                        <h3>ELECTORAL VOTES</h3>                        <ul>${
                    i
                }</ul>                        <p>0% complete</br>${
                    n
                } to win</p>                    </div>                </div>                <div id="state_result_container">                    <div id="state_result">                        <h3>STATE RESULTS</h3>                        <p>Click on a state to view detailed results (once returns for that state arrive).</p>                    </div>                </div>            </div>        </div>        <div id="map_footer">        <button id="final_result_button">Go to Final Results</button>        </div>        <div class="overlay" id="election_night_overlay"></div>        <div class="overlay_window" id="election_night_window">            <div class="overlay_window_content" id="election_night_content">            <h3>Advisor Feedback</h3>            <img src="${
                    e.election_json[s].fields.advisor_url
                }" width="208" height="128"/>            <p>${e.ElectionPopup}</p>            </div>            <div class="overlay_buttons" id="election_night_buttons">            <button id="ok_button">OK</button><br>            </div>        </div>`,
            );
            const lTemp = (function () {
                for (var t = {}, i = 0; i < e.states_json.length; i++) {
                    t[e.states_json[i].fields.abbr] = {
                        fill: "#C9C9C9",
                    };
                }
                return {
                    stateStyles: {
                        fill: "#EAFDFF",
                    },
                    stateHoverStyles: {
                        fill: "#EAFDFF",
                    },
                    stateSpecificStyles: t,
                    stateSpecificHoverStyles: t,
                };
            }());
            $("#map_container").usmap(lTemp),
                $("#ok_button").click(() => {
                    $("#election_night_overlay").remove(),
                        $("#election_night_window").remove();
                }),
                $("#final_result_button").click(() => {
                    clearTimeout(results_timeout),
                        $("#map_footer").html(
                            "<i>Processing Results, wait one moment...</i>",
                        );
                    v(500);
                    m();
                });
        }());
        e.final_overall_results = [];
        for (let t = 0; t < e.final_state_results[0].result.length; t++) {
            e.final_overall_results.push({
                candidate: e.final_state_results[0].result[t].candidate,
                electoral_votes: 0,
                popular_votes: 0,
            });
        }
        !(function () {
            for (let t = 0; t < e.final_state_results.length; t++) {
                const i = R(e.final_state_results[t].state);
                const a = c(
                    e.final_state_results[t].result,
                    e.states_json[i].fields.poll_closing_time,
                );
                e.final_state_results[t].result_time = a;
            }
        }()),
            $("#ok_button").click(() => {
                results_timeout = setTimeout(() => {
                    !(function t(i, a) {
                        const s = [0, 0];
                        for (var n = 0; n < e.final_overall_results.length; n++) {
                            e.final_overall_results[n].electoral_votes > s[0]
                            && (s[0] = e.final_overall_results[n].electoral_votes);
                        }
                        total_votes = 0;
                        for (
                            iterator = 0;
                            iterator < e.final_overall_results.length;
                            iterator++
                        ) {
                            total_votes += e.final_overall_results[iterator].popular_votes;
                        }
                        pop_vs = [];
                        for (
                            iterator = 0;
                            iterator < e.final_overall_results.length;
                            iterator++
                        ) {
                            if (
                                e.final_overall_results[iterator].popular_votes / total_votes
                                > 0
                            ) {
                                pop_vs.push(
                                    e.final_overall_results[iterator].popular_votes / total_votes,
                                );
                            } else {
                                pop_vs.push(0);
                            }
                        }
                        var a = v(i);
                        const l = S(e.election_id);
                        const o = e.election_json[l].fields.winning_electoral_vote_number;
                        const _ = u();
                        let r = "";
                        for (var n = 0; n < _.length; n++) {
                            for (let d = 0; d < e.final_overall_results.length; d++) {
                                const can1 = e.final_overall_results[d].candidate;
                                const can2 = _[n].candidate;

                                if (DEBUG) {
                                    console.log(
                                        "final_overall_results. d:",
                                        d,
                                        "n: ",
                                        n,
                                        "_: ",
                                        _,
                                        " e:",
                                        e,
                                        can1,
                                        can2,
                                    );
                                }

                                if (can1 == can2) {
                                    var c = e.final_overall_results[d].electoral_votes;
                                    var popvthing = (pop_vs[d] * 100).toFixed(1);
                                }
                            }
                            r
                                += `            <span style="color:${
                                _[n].color
                            }; background-color: ${
                                _[n].color
                            }">--</span> <b>${
                                _[n].last_name
                            }</b> -  ${
                                c
                            } / ${
                                popvthing
                            }%<br>`;
                        }
                        const p = f(i);
                        let h = Math.floor((i / 480) * 100);
                        const g = $("#state_result_container").html();
                        $("#game_window").html("");
                        $("#game_window").html(
                            `        <div class="game_header">            ${
                                corrr
                            }        </div>        <div id="main_content_area">            <div id="map_container"></div>            <div id="menu_container">                <div id="overall_result_container">                    <div id="overall_result">                        <h3>ELECTION TALLY</h3>                        <ul>${
                                r
                            }</ul>                        <p>${
                                h
                            }% complete</br>${
                                o
                            } to win</p>                    </div>                </div>                <div id="state_result_container">${
                                g
                            }</div>            </div>        </div>        <div id="map_footer">        <button id="final_result_button">Go to Final Results</button>        </div>`,
                        );
                        $("#map_container").usmap(p);
                        $("#final_result_button").click(() => {
                            clearTimeout(results_timeout),
                                $("#map_footer").html(
                                    "<i>Processing Results, wait one moment...</i>",
                                );
                            v(500);
                            m();
                        });
                        for (var n = 0; n < e.final_overall_results.length; n++) {
                            e.final_overall_results[n].electoral_votes > s[1]
                            && (s[1] = e.final_overall_results[n].electoral_votes);
                        }
                        if (s[0] < o && s[1] >= o) {
                            if (e.final_overall_results[0].candidate == e.candidate_id) var b = `${e.WinPopup}`;
                            else if (e.final_overall_results[0].candidate != e.candidate_id) var b = `${e.LosePopup}`;
                            $("#game_window").append(
                                `            <div class="overlay" id="election_night_overlay"></div>            <div class="overlay_window" id="election_night_window">                <div class="overlay_window_content" id="election_night_content">                <h3>Advisor Feedback</h3>                <img src="${
                                    e.election_json[l].fields.advisor_url
                                }" width="208" height="128"/><p>${
                                    b
                                }</p></div>                <div class="overlay_buttons" id="winner_buttons">                <button id="ok_button">OK</button><br>                <button id="overlay_result_button">Go to Final Results</button>                </div>            </div>`,
                            ),
                                $("#ok_button").click(() => {
                                    $("#election_night_overlay").remove(),
                                        $("#election_night_window").remove(),
                                        (results_timeout = setTimeout(() => {
                                            t(i, a);
                                        }, 2e3));
                                }),
                                $("#overlay_result_button").click(() => {
                                    $("#election_night_overlay").remove(),
                                        $("#election_night_window").remove(),
                                        clearTimeout(results_timeout),
                                        $("#map_footer").html(
                                            "<i>Processing Results, wait one moment...</i>",
                                        );
                                    v(500);
                                    m();
                                });
                        } else {
                            i >= 480 || a >= e.states_json.length
                                ? ((h = 100),
                                    $("#overall_result").html(
                                        `            <h3>ELECTION TALLY</h3>            <ul>${
                                            r
                                        }</ul>            <p>${
                                            h
                                        }% complete</br>${
                                            o
                                        } to win</p>`,
                                    ))
                                : (results_timeout = setTimeout(() => {
                                    t(i, a);
                                }, 2e3));
                        }
                        i += 10;
                    }(0, 0));
                }, 2e3);
            });
    }

    function t() {
        for (var t = -1, i = 0; i < e.candidate_json.length; i++) {
            if (e.candidate_json[i].pk == candidate_id.value) {
                t = i;
                break;
            }
        }
        $("#candidate_description_window").html(
            `<div class="person_image" id="candidate_image">            <img src="${
                e.candidate_json[t].fields.image_url
            }" width="210" height="250"/>        </div>        <div class="person_summary" id="candidate_summary">        <ul><li>Name: ${
                e.candidate_json[t].fields.first_name
            } ${
                e.candidate_json[t].fields.last_name
            }</li>        <li>${e.PartyText} ${
                e.candidate_json[t].fields.party
            }</li>        <li>${e.HomeStateText} ${
                e.candidate_json[t].fields.state
            }</li>        </ul>${
                e.candidate_json[t].fields.description
            }</div>`,
        );
    }

    function i() {
        for (var t = -1, i = 0; i < e.candidate_json.length; i++) {
            if (e.candidate_json[i].pk == running_mate_id.value) {
                t = i;
                break;
            }
        }
        $("#running_mate_description_window").html(
            `<div class="person_image" id="running_mate_image">            <img src="${
                e.candidate_json[t].fields.image_url
            }" width="210" height="250"/>        </div>        <div class="person_summary" id="running_mate_summary">        <ul><li>Name: ${
                e.candidate_json[t].fields.first_name
            } ${
                e.candidate_json[t].fields.last_name
            }</li>        <li>${e.PartyText} ${
                e.candidate_json[t].fields.party
            }</li>        <li>${e.HomeStateText} ${
                e.candidate_json[t].fields.state
            }</li>        </ul>${
                e.candidate_json[t].fields.description_as_running_mate
            }</div>`,
        );
    }

    function a(e) {
        let t;
        switch (e) {
            case "1":
                t = "<p><strong>Use the default method of allocating electoral votes for each state.</strong></p>                 <p>In the vast majority of cases, states use a winner-take-all method. For instance,                 if Candiate A defeats Candidate B in a state, worth 20 electoral votes, Candidate                 A will usually win all 20 votes.</p>                 <p>This method tends to concentrate the election into a handful of swing states.                 It also makes it difficult for third-party candidates to win electoral votes. On                 the other hand, it is easier for a single candidate to gain an overall majority of the                 electoral votes.</p>";
                break;
            case "2":
                t = "<p><strong>Allocate each state's electoral votes proportionally.</strong></p>                <p>Under this method, all candidates split the electoral votes in a state, in                 proportion to their popular vote %.</p>                <p>There is still an advantage to winning a state -- the winner of the state will                 always receive a plurality of electoral votes. For instance, in a state with                 4 electoral votes, if Candidate A wins 51% of the vote, they will be awarded 3                 electoral votes.</p>                <p>Compared to a winner-take-all method, this method aligns the electoral vote                 more closely with the popular vote. It also makes it easier to third party                 candidates to increase their electoral vote totals. In some scenarios, this effect                 is highly significant on the final outcome. Some examples are 1860, 1948, 1968, and 2000. </p>";
                break;
            case "3":
                t = `
                    <p><strong style='color:navy'>From sea to shining sea!</strong> - <em>The "advanced mode" Campaign Trail experience.</em></p>
                    <p>You will play with significantly increased control over the financial and internal aspects of your campaign, including:</p>
                    <p>
                    - Campaign finance<br>
                    - Staffing your campaign<br>
                    - Interactions with lobbies<br>
                    - Ad buys
                    </p>
                    <p><b>This is not the recommended experience for new players.</b></p>
                    <p><b>Originally from New Campaign Trail, added with permission.</b></p>
                    `;
                break;
        }
        $("#opponent_selection_description_window").html(t);
    }

    function findFromPK(array, pk) {
        a = array.map((zzzz) => zzzz.pk).indexOf(Number(pk));
        return a;
    }

    function realityCheck(cand, running_mate, ree) {
        // checks if we are actually looking at a real candidate pairing
        pairs = e.running_mate_json
            .map((f) => f.fields)
            .map((f) => [f.candidate, f.running_mate]);
        pair = [cand, running_mate];
        for (i in pairs) {
            if (JSON.stringify(pairs[i]) == JSON.stringify(pair)) return true;
        }
        return false;
    }

    // Loads up the html for an election when loading the game. From my understanding this sets up the map and such.
    // Important for mods because it will load the base scenario code 2 for the mod before loading the custom code 2.
    // That way you have less boilerplate
    function election_HTML(id, cand, running_mate) {
        if (id != 16) {
            if (modded) {
                try {
                    // ree = the actual base election json unmodded
                    yearbit = ree.election_json[findFromPK(ree.election_json, id)].fields.year;
                    lastnamebit = ree.candidate_json[
                        findFromPK(ree.candidate_json, campaignTrail_temp.candidate_id)
                        ].fields.last_name;
                    veeplastname = ree.candidate_json[
                        findFromPK(ree.candidate_json, campaignTrail_temp.running_mate_id)
                        ].fields.last_name;
                } catch {
                }

                // Check if this is a base scenario and if so we need the specific base scenario code 2. Otherwise we can use whatever one with the same year.
                real = realityCheck(cand, running_mate, ree);

                if (real) {
                    return `${yearbit}_${lastnamebit}_${veeplastname}.html`;
                }

                return baseScenarioDict[yearbit];
            }
            // If it's not modded then it must bea real base scenario so just return the real info
            return (
                `${campaignTrail_temp.election_json[
                    findFromPK(campaignTrail_temp.election_json, id)
                    ].fields.year
                }_${
                    campaignTrail_temp.candidate_json[
                        findFromPK(campaignTrail_temp.candidate_json, cand)
                        ].fields.last_name
                }_${
                    campaignTrail_temp.candidate_json[
                        findFromPK(campaignTrail_temp.candidate_json, running_mate)
                        ].fields.last_name
                }.html`
            );
        }
        if (id == 16) {
            // If it's a mod we don't need to get the specific 2016a scenario
            if (modded) {
                return baseScenarioDict["2016a"];
            }
            return (
                `2016a_${
                    campaignTrail_temp.candidate_json[
                        findFromPK(campaignTrail_temp.candidate_json, cand)
                        ].fields.last_name
                }_${
                    campaignTrail_temp.candidate_json[
                        findFromPK(campaignTrail_temp.candidate_json, running_mate)
                        ].fields.last_name
                }.html`
            );
        }
    }

    function s(t, i, l) {
        let difficultyStr;
        for (difficultyStr = "", r = 0; r < e.difficulty_level_json.length; r++) {
            e.difficulty_level_json[r].fields.name == "Normal"
                ? (difficultyStr
                    += `<option value=${
                    e.difficulty_level_json[r].pk
                } selected>${
                    e.difficulty_level_json[r].fields.name
                }</option>`)
                : (difficultyStr
                    += `<option value=${
                    e.difficulty_level_json[r].pk
                }>${
                    e.difficulty_level_json[r].fields.name
                }</option>`);
        }
        let shining = "";
        if (e.shining) {
            shining = `<option value=3 style="">Sea to Shining Sea</option>`;
        }
        const d = `
        <div class="game_header">        ${corrr}        </div>
        <div class="inner_window_w_desc" id="inner_window_4">
        <div id="game_options">
        <form name="game_type_selection">
        <p><h3>Select your game mode.</h3>
        <select name="game_type_id" id="game_type_id">
        <option value=1>Default (Winner-Take-All)</option>
        <option value=2>Proportional</option>
        ${shining}
        </select>
        </p>
        </form>            </div>
        <div class="description_window_small"                 id="opponent_selection_description_window">            </div>
        <div id="difficulty_level">            <form name="difficulty_level_selection">            <p><h3>Please choose your difficulty level:</h3>
        <select name="difficulty_level_id" id="difficulty_level_id"> ${difficultyStr} </select>            </p>            </form>            </div>        <p id="opponent_selection_id_button_p"><button class="person_button" id="opponent_selection_id_back">Back</button> <button class="person_button" id="opponent_selection_id_button">Continue</button>        </p>        </div>`;
        $("#game_window").html(d),
            $("#game_type_id").ready(() => {
                a($("select[name=game_type_id]").val());
            }),
            $("#game_type_id").change(() => {
                a($("select[name=game_type_id]").val());
            });
        // if (e.shining) $("#game_type_id").val("3");
        $("#opponent_selection_id_back").click(vpSelect);
        $("#opponent_selection_id_button").click(() => {
            $("#opponent_selection_id_button").replaceWith("<em>One moment...</em>");
            for (
                var a = [], opponents = [], r = 0;
                r < e.candidate_dropout_json.length;
                r++
            ) {
                e.candidate_dropout_json[r].fields.candidate == i
                && a.push(e.candidate_dropout_json[r].fields.affected_candidate);
            }
            let d = -1;
            for (r = 0; r < e.opponents_default_json.length; r++) {
                if (e.opponents_default_json[r].election == t) {
                    d = r;
                    break;
                }
            }
            for (r = 0; r < e.opponents_default_json[d].candidates.length; r++) {
                e.opponents_default_json[d].candidates[r] != i
                && a.indexOf(e.opponents_default_json[d].candidates[r]) == -1
                && opponents.push(e.opponents_default_json[d].candidates[r]);
            }
            // define ONLY if not already defined - necessary for code 1 base switching gimmicks
            e.election_id = e.election_id ? e.election_id : t;
            e.candidate_id = e.candidate_id ? e.candidate_id : i;
            e.running_mate_id = e.running_mate_id ? e.running_mate_id : l;

            t = e.election_id;
            i = e.candidate_id;
            l = e.running_mate_id;

            (e.opponents_list = opponents),
                (e.game_type_id = $("select[name=game_type_id]").val()),
                (e.difficulty_level_id = $("select[name=difficulty_level_id]").val());
            const c = $("select[name=difficulty_level_id]").val();
            for (
                $("select[name=game_type_id]").val(), d = -1, r = 0;
                r < e.difficulty_level_json.length;
                r++
            ) {
                if (
                    e.difficulty_level_json[r].pk
                    == $("select[name=difficulty_level_id]").val()
                ) {
                    d = r;
                    break;
                }
            }
            (e.difficulty_level_multiplier = e.difficulty_level_json[d].fields.multiplier),
                (starting_mult = encrypted + e.difficulty_level_json[d].fields.multiplier);

            if (e.game_type_id === "3") {
                const default_init = 50000000;
                const boost = F(e.candidate_id)
                    * default_init
                    * e.global_parameter_json[0].fields.global_variance
                    * 4;

                e.shining_data = {
                    balance: (default_init + boost) * e.difficulty_level_multiplier,
                    ad_spending: [],
                    times: {
                        fundraising_time: 0.33,
                        media_time: 0.33,
                        physical_time: 0.34,
                    },
                    visit_multiplier: 1,
                };

                e.shining_data.prev_balance = e.shining_data.balance;
            }

            const oFunc = o;
            ((t, i, a, l, o) => {
                if (campaignTrail_temp.musicOn) {
                    document.getElementById("music_player").style.display = "";
                    document.getElementById("campaigntrailmusic").src = campaignTrail_temp.musicSrc;
                }
                if (modded == false) {
                    aaa = election_HTML(t, i, a);
                    aaa = `../static/questionset/${aaa}`;
                    $("#game_window").load(aaa, () => {
                        const e = A(2);
                        oFunc(e);
                    });
                    (e.question_number = 0),
                        (e.questions_json = campaignTrail_temp.questions_json),
                        (e.answers_json = campaignTrail_temp.answers_json),
                        (e.states_json = campaignTrail_temp.states_json),
                        (e.issues_json = campaignTrail_temp.issues_json),
                        (e.state_issue_score_json = campaignTrail_temp.state_issue_score_json),
                        (e.candidate_issue_score_json = campaignTrail_temp.candidate_issue_score_json),
                        (e.running_mate_issue_score_json = campaignTrail_temp.running_mate_issue_score_json),
                        (e.candidate_state_multiplier_json = campaignTrail_temp.candidate_state_multiplier_json),
                        (e.answer_score_global_json = campaignTrail_temp.answer_score_global_json),
                        (e.answer_score_issue_json = campaignTrail_temp.answer_score_issue_json),
                        (e.answer_score_state_json = campaignTrail_temp.answer_score_state_json),
                        (e.answer_feedback_json = campaignTrail_temp.answer_feedback_json),
                        (e.candidate_image_url = campaignTrail_temp.candidate_image_url),
                        (e.running_mate_image_url = campaignTrail_temp.running_mate_image_url),
                        (e.candidate_last_name = campaignTrail_temp.candidate_last_name),
                        (e.running_mate_last_name = campaignTrail_temp.running_mate_last_name),
                        (e.running_mate_state_id = campaignTrail_temp.running_mate_state_id),
                        (e.player_answers = campaignTrail_temp.player_answers),
                        (e.player_visits = campaignTrail_temp.player_visits),
                        (e.answer_feedback_flg = campaignTrail_temp.answer_feedback_flg),
                        (e.election_id = Number(e.election_id)),
                        (e.candidate_id = Number(e.candidate_id)),
                        (e.running_mate_id = Number(e.running_mate_id)),
                        (e.difficulty_level_id = Number(e.difficulty_level_id)),
                        (e.game_start_logging_id = Number(
                            campaignTrail_temp.game_start_logging_id,
                        ));
                    var important_code = setInterval(() => {
                        $("#view_electoral_map").click(() => {
                            const e = A((return_type = 2));
                            openMap(e);
                        });
                        const answerButton = $("#answer_select_button")[0];
                        if (answerButton != null) {
                            answerButton.addEventListener(
                                "click",
                                onAnswerSelectButtonClicked,
                            );
                            clearInterval(important_code);
                        }
                    }, 1000);
                } else if (
                    $("#modSelect")[0].value != "other"
                    || e.hotload
                    || loadingFromModButton
                ) {
                    aaa = election_HTML(t, i, a);
                    aaa = `../static/questionset/${aaa}`;
                    try {
                        $("#game_window").load(aaa, () => {
                            e = campaignTrail_temp;
                            eArr = e.temp_election_list
                                .map((a) => a.id)
                                .indexOf(e.election_id);
                            year = e.temp_election_list[eArr].display_year;
                            cand = e.candidate_json[
                                e.candidate_json
                                    .map((a) => Number(a.pk))
                                    .indexOf(Number(e.candidate_id))
                                ].fields.last_name;
                            run = e.candidate_json[
                                e.candidate_json
                                    .map((a) => Number(a.pk))
                                    .indexOf(Number(e.running_mate_id))
                                ].fields.last_name;

                            theorId = `${year}_${cand}${run}`;
                            // theorId = $("#modSelect")[0].value

                            if (customMod === false) {
                                evalFromUrl(`../static/mods/${theorId}.html`, () => {
                                    tempFuncO = function (e, i = campaignTrail_temp) {
                                        if (e.collect_results) {
                                            const a = A(2);
                                            e.current_results = [getLatestRes(a)[0], a];
                                        }
                                        for (
                                            var s = [], a = 0;
                                            a < i.answers_json.length
                                            && (i.answers_json[a].fields.question
                                                != i.questions_json[i.question_number].pk
                                                || (s.push({key: a, order: Math.random()}),
                                                s.length != 4));
                                            a += 1
                                        ) {
                                        }
                                        P(s, "order");
                                        for (var t = "", a = 0; a < s.length; a += 1) {
                                            t
                                                += `<input type="radio" name="game_answers" class="game_answers"             id="game_answers[${
                                                a.toString()
                                            }]" value="${
                                                i.answers_json[s[a].key].pk
                                            }"/>\t\t    <label for="game_answers[${
                                                a.toString()
                                            }]">${
                                                substitutePlaceholders(i.answers_json[s[a].key].fields.description)
                                            }</label><br>`;
                                        }
                                        const r = `<div class="game_header">    <h2>CAMPAIGN TRAIL SHOWCASE</h2>    </div>    <div class="inner_window_question">        <div class="inner_inner_window">        <h3>${
                                            substitutePlaceholders(i.questions_json[i.question_number].fields.description)
                                        }</h3>            <div id="question_form">                <form name="question">${
                                            t
                                        }</form>            </div>        </div>        <p><button id="answer_select_button" class="answer_select_button">CONTINUE</button>        <button id="view_electoral_map">Latest Polls/Electoral Map</button></p>    </div>    <img id="candidate_pic" src="${
                                            i.candidate_image_url
                                        }">    <img id="running_mate_pic" src="${
                                            i.running_mate_image_url
                                        }">    <div class="inner_window_sign_display">        <div id="progress_bar">\t    <h3>Question ${
                                            i.question_number + 1
                                        } of ${
                                            i.global_parameter_json[0].fields.question_count
                                        }</h3>        </div>        <div id="campaign_sign">        <p>${
                                            i.candidate_last_name
                                        }</p>        <p>${
                                            i.running_mate_last_name
                                        }</p>        </div>    </div>`;
                                        $("#game_window").html(r);
                                    };
                                    tempFuncO(e);
                                });
                            } else {
                                eval(localStorage.getItem(`${customMod}_code2`));
                                tempFuncO = function (e, i = campaignTrail_temp) {
                                    if (e.collect_results) {
                                        const a = A(2);
                                        e.current_results = [getLatestRes(a)[0], a];
                                    }
                                    for (
                                        var s = [], a = 0;
                                        a < i.answers_json.length
                                        && (i.answers_json[a].fields.question
                                            != i.questions_json[i.question_number].pk
                                            || (s.push({key: a, order: Math.random()}),
                                            s.length != 4));
                                        a += 1
                                    ) {
                                    }
                                    P(s, "order");
                                    for (var t = "", a = 0; a < s.length; a += 1) {
                                        t
                                            += `<input type="radio" name="game_answers" class="game_answers"             id="game_answers[${
                                            a.toString()
                                        }]" value="${
                                            i.answers_json[s[a].key].pk
                                        }"/>\t\t    <label for="game_answers[${
                                            a.toString()
                                        }]">${
                                            i.answers_json[s[a].key].fields.description
                                        }</label><br>`;
                                    }
                                    const r = `<div class="game_header">    <h2>CAMPAIGN TRAIL SHOWCASE</h2>    </div>    <div class="inner_window_question">        <div class="inner_inner_window">        <h3>${
                                        substitutePlaceholders(i.questions_json[i.question_number].fields.description)
                                    }</h3>            <div id="question_form">                <form name="question">${
                                        t
                                    }</form>            </div>        </div>        <p><button id="answer_select_button" class="answer_select_button">CONTINUE</button>        <button id="view_electoral_map">Latest Polls/Electoral Map</button></p>    </div>    <img id="candidate_pic" src="${
                                        i.candidate_image_url
                                    }">    <img id="running_mate_pic" src="${
                                        i.running_mate_image_url
                                    }">    <div class="inner_window_sign_display">        <div id="progress_bar">\t    <h3>Question ${
                                        i.question_number + 1
                                    } of ${
                                        i.global_parameter_json[0].fields.question_count
                                    }</h3>        </div>        <div id="campaign_sign">        <p>${
                                        i.candidate_last_name
                                    }</p>        <p>${
                                        i.running_mate_last_name
                                    }</p>        </div>    </div>`;
                                    $("#game_window").html(r);
                                };

                                tempFuncO(e);
                            }

                            endingUrl = `../static/mods/${theorId}_ending.html`;

                            try {
                                if (fileExists(endingUrl)) {
                                    const client2 = new XMLHttpRequest();
                                    client2.open("GET", endingUrl);
                                    client2.onreadystatechange = function () {
                                        important_info = client2.responseText;
                                    };
                                    client2.send();
                                }
                            } catch (err) {
                                console.error("Error loading code 2", err);
                            }
                        });
                    } catch (err) {
                        console.error("Error loading code 2", err);
                    }
                    (e.question_number = 0),
                        (e.questions_json = campaignTrail_temp.questions_json),
                        (e.answers_json = campaignTrail_temp.answers_json),
                        (e.states_json = campaignTrail_temp.states_json),
                        (e.issues_json = campaignTrail_temp.issues_json),
                        (e.state_issue_score_json = campaignTrail_temp.state_issue_score_json),
                        (e.candidate_issue_score_json = campaignTrail_temp.candidate_issue_score_json),
                        (e.running_mate_issue_score_json = campaignTrail_temp.running_mate_issue_score_json),
                        (e.candidate_state_multiplier_json = campaignTrail_temp.candidate_state_multiplier_json),
                        (e.answer_score_global_json = campaignTrail_temp.answer_score_global_json),
                        (e.answer_score_issue_json = campaignTrail_temp.answer_score_issue_json),
                        (e.answer_score_state_json = campaignTrail_temp.answer_score_state_json),
                        (e.answer_feedback_json = campaignTrail_temp.answer_feedback_json),
                        (e.candidate_image_url = campaignTrail_temp.candidate_image_url),
                        (e.running_mate_image_url = campaignTrail_temp.running_mate_image_url),
                        (e.candidate_last_name = campaignTrail_temp.candidate_last_name),
                        (e.running_mate_last_name = campaignTrail_temp.running_mate_last_name),
                        (e.running_mate_state_id = campaignTrail_temp.running_mate_state_id),
                        (e.player_answers = campaignTrail_temp.player_answers),
                        (e.player_visits = campaignTrail_temp.player_visits),
                        (e.answer_feedback_flg = campaignTrail_temp.answer_feedback_flg),
                        (e.election_id = Number(e.election_id)),
                        (e.candidate_id = Number(e.candidate_id)),
                        (e.running_mate_id = Number(e.running_mate_id)),
                        (e.difficulty_level_id = Number(e.difficulty_level_id)),
                        (e.game_start_logging_id = Number(
                            campaignTrail_temp.game_start_logging_id,
                        ));
                    var important_code = setInterval(() => {
                        $("#view_electoral_map").click(() => {
                            const e = A((return_type = 2));
                            console.log("e", e);
                            openMap(e);
                        });

                        if ($("#answer_select_button")[0] != null) {
                            const answerButton = $("#answer_select_button")[0];
                            answerButton.addEventListener(
                                "click",
                                onAnswerSelectButtonClicked,
                            );
                            clearInterval(important_code);
                        }
                    }, 1000);
                } else {
                    // other block case
                    aaa = election_HTML(t, i, a);
                    aaa = `../static/questionset/${aaa}`;
                    $("#game_window").load(aaa, () => {
                        eval($("#codeset2")[0].value);
                        tempFuncO = function (e, i = campaignTrail_temp) {
                            if (e.collect_results) {
                                const a = A(2);
                                e.current_results = [getLatestRes(a)[0], a];
                            }
                            for (
                                var s = [], a = 0;
                                a < i.answers_json.length
                                && (i.answers_json[a].fields.question
                                    != i.questions_json[i.question_number].pk
                                    || (s.push({key: a, order: Math.random()}), s.length != 4));
                                a += 1
                            ) {
                            }
                            P(s, "order");
                            for (var t = "", a = 0; a < s.length; a += 1) {
                                t
                                    += `<input type="radio" name="game_answers" class="game_answers"             id="game_answers[${
                                    a.toString()
                                }]" value="${
                                    i.answers_json[s[a].key].pk
                                }"/>\t\t    <label for="game_answers[${
                                    a.toString()
                                }]">${
                                    substitutePlaceholders(i.answers_json[s[a].key].fields.description)
                                }</label><br>`;
                            }
                            const r = `<div class="game_header">    <h2>CAMPAIGN TRAIL SHOWCASE</h2>    </div>    <div class="inner_window_question">        <div class="inner_inner_window">        <h3>${
                                substitutePlaceholders(i.questions_json[i.question_number].fields.description)
                            }</h3>            <div id="question_form">                <form name="question">${
                                t
                            }</form>            </div>        </div>        <p><button id="answer_select_button" class="answer_select_button">CONTINUE</button>        <button id="view_electoral_map">Latest Polls/Electoral Map</button></p>    </div>    <img id="candidate_pic" src="${
                                i.candidate_image_url
                            }">    <img id="running_mate_pic" src="${
                                i.running_mate_image_url
                            }">    <div class="inner_window_sign_display">        <div id="progress_bar">\t    <h3>Question ${
                                i.question_number + 1
                            } of ${
                                i.global_parameter_json[0].fields.question_count
                            }</h3>        </div>        <div id="campaign_sign">        <p>${
                                i.candidate_last_name
                            }</p>        <p>${
                                i.running_mate_last_name
                            }</p>        </div>    </div>`;
                            $("#game_window").html(r);
                        };
                        tempFuncO(e);
                    });
                    (e.question_number = 0),
                        (e.questions_json = campaignTrail_temp.questions_json),
                        (e.answers_json = campaignTrail_temp.answers_json),
                        (e.states_json = campaignTrail_temp.states_json),
                        (e.issues_json = campaignTrail_temp.issues_json),
                        (e.state_issue_score_json = campaignTrail_temp.state_issue_score_json),
                        (e.candidate_issue_score_json = campaignTrail_temp.candidate_issue_score_json),
                        (e.running_mate_issue_score_json = campaignTrail_temp.running_mate_issue_score_json),
                        (e.candidate_state_multiplier_json = campaignTrail_temp.candidate_state_multiplier_json),
                        (e.answer_score_global_json = campaignTrail_temp.answer_score_global_json),
                        (e.answer_score_issue_json = campaignTrail_temp.answer_score_issue_json),
                        (e.answer_score_state_json = campaignTrail_temp.answer_score_state_json),
                        (e.answer_feedback_json = campaignTrail_temp.answer_feedback_json),
                        (e.candidate_image_url = campaignTrail_temp.candidate_image_url),
                        (e.running_mate_image_url = campaignTrail_temp.running_mate_image_url),
                        (e.candidate_last_name = campaignTrail_temp.candidate_last_name),
                        (e.running_mate_last_name = campaignTrail_temp.running_mate_last_name),
                        (e.running_mate_state_id = campaignTrail_temp.running_mate_state_id),
                        (e.player_answers = campaignTrail_temp.player_answers),
                        (e.player_visits = campaignTrail_temp.player_visits),
                        (e.answer_feedback_flg = campaignTrail_temp.answer_feedback_flg),
                        (e.election_id = Number(e.election_id)),
                        (e.candidate_id = Number(e.candidate_id)),
                        (e.running_mate_id = Number(e.running_mate_id)),
                        (e.difficulty_level_id = Number(e.difficulty_level_id)),
                        (e.game_start_logging_id = Number(
                            campaignTrail_temp.game_start_logging_id,
                        ));
                    var important_code = setInterval(() => {
                        $("#view_electoral_map").click(() => {
                            const e = A((return_type = 2));
                            openMap(e);
                        });
                        const answerButton = $("#answer_select_button")[0];
                        answerButton.addEventListener("click", onAnswerSelectButtonClicked);
                        if ($("#answer_select_button")[0] != null) {
                            clearInterval(important_code);
                        }
                    }, 1000);
                }
                histFunction();
            })(t, i, l, opponents, c);
        });
    }

    mapCache = function (skip = false) {
        // preloads poll map
        if (!skip) {
            if (!$("#main_content_area")[0]) {
                return false;
            }
            const i = S(e.election_id);
            if (
                (e.question_number - 1) % 2 != 0
                && e.election_json[i].fields.has_visits == 1
            ) {
                return false;
            }
            if (
                e.question_number == e.global_parameter_json[0].fields.question_count
            ) {
                return false;
            }
            if (
                e.primary_code
                && e.primary_code.map((f) => f.breakQ).includes(e.question_number)
            ) {
                return false;
            }
        }
        $("#map_container").remove();
        $("#main_content_area").html(
            '<div id="map_container"></div>            <div id="menu_container">                <div id="overall_result_container">                    <div id="overall_result">                        <h3>ESTIMATED SUPPORT</h3>                        <p>Click on a state to view more info.</p>                    </div>                </div>                <div id="state_result_container">                    <div id="state_info">                        <h3>STATE SUMMARY</h3>                        <p>Click/hover on a state to view more info.</p>                        <p>Precise results will be available on election night.</p>                    </div>                </div>            </div>',
        );
        $("#main_content_area")[0].style.display = "";

        const rr = A((returnType = 2));
        rFuncRes = rFunc(rr, 0);
        $("#map_container").usmap(rFuncRes);
        $("#main_content_area")[0].style.display = "none";

        return true;
    };

    function nextQuestion() {
        // calculate shining

        if (e.game_type_id == "3") {
            const temp_polls = A(2);
            shining_cal(temp_polls);
        }

        const t = A(2);

        if (e.cyoa) {
            if (e.collect_results) {
                const a = A(2);
                e.current_results = [getLatestRes(a)[0], a];
            }
            cyoAdventure(e.questions_json[e.question_number]);
        }
        a = false;
        if (e.primary) {
            /* Primary code format:
            e.primary_code = [
                {
                    "breakQ": 0,
                    "states": [1100, 1101, 1102]
                },
                {
                    "breakQ": 2,
                    "states": [1103, 1104, 1105]
                }
            ]
            */
            primary_breaks = e.primary_code.map((f) => f.breakQ);
            a = primaryFunction(
                primary_breaks.includes(e.question_number),
                primary_breaks,
            );
            if (a) {
                e.corQuestion = true;
                return false;
            }
        }

        setTimeout(() => mapCache((skip = false)), 0); // starts new thread for poll map preloading

        if (e.corQuestion) e.corQuestion = false;
        else e.question_number++;

        if (e.player_answers.length < e.question_number) {
            while (e.player_answers.length != e.question_number) {
                e.player_answers.push(null);
            }
        }

        if (e.question_number == e.global_parameter_json[0].fields.question_count) {
            if (e.primary) {
                e.final_state_results = A(1);
                electionNight();
                v(500);
                m();
            } else {
                (e.final_state_results = A(1)), electionNight();
            }
        } else if (e.question_number % 2 == 0) {
            const i = S(e.election_id);
            e.election_json[i].fields.has_visits == 1
                ? (function (e) {
                    $("#game_window").html(
                        `        <div class="game_header">            ${
                            corrr
                        }        </div>        <div id="main_content_area">            <div id="map_container"></div>            <div id="menu_container">                <div id="overall_result_container">                    <div id="overall_result">                        <h3>ESTIMATED SUPPORT</h3>                        <p>Click on a state to view more info.</p>                    </div>                </div>                <div id="state_result_container">                    <div id="state_info">                        <h3>STATE SUMMARY</h3>                        <p>Click/hover on a state to view more info.</p>                        <p>Precise results will be available on election night.</p>                    </div>                </div>            </div>        </div>        <p class="visit_text"><font size="2">Use this map to click on the next state you wish to visit. Choose wisely             and focus your efforts where they will have the most impact.</p>        </div>        `,
                    );
                    const t = rFunc(e, 1);
                    $("#map_container").usmap(t);
                }(t))
                : o(t);
        } else o(t);
        if ($("#importfile")[0].value != "") {
            importgame(e.dagakotowaru);
        }
    }

    function n(t) {
        const stopSpacebar = false;
        if (stopSpacebar && $("#visit_overlay")[0]) {
            debugConsole("Visit overlay is showing, not applying answer effects");
            return;
        }

        debugConsole(`Applying answer effects for answer pk ${t}`);
        e.player_answers.push(Number(t));
        let i = 0;
        const a = S(e.election_id);
        if (e.answer_feedback_flg == 1) {
            for (var s = 0; s < e.answer_feedback_json.length; s++) {
                if (
                    e.answer_feedback_json[s].fields.answer == t
                    && e.answer_feedback_json[s].fields.candidate == e.candidate_id
                ) {
                    i = 1;
                    break;
                }
            }
            if (i == 1) {
                const n = `                    <div class="overlay" id="visit_overlay"></div>                    <div class="overlay_window" id="visit_window">                        <div class="overlay_window_content" id="visit_content">                        <h3>Advisor Feedback</h3>                        <img src="${
                    e.election_json[a].fields.advisor_url
                }" width="208" height="128"/>                        <p>${
                    substitutePlaceholders(e.answer_feedback_json[s].fields.answer_feedback)
                }</p>                        </div>                        <div class="overlay_buttons" id="visit_buttons">                        <button id="ok_button">OK</button><br><button id="no_feedback_button">Don't give me advice</button>                                                </div>                    </div>`;
                $("#game_window").append(n);
                $("#ok_button").click(() => {
                    nextQuestion();
                }),
                    $("#no_feedback_button").click(() => {
                        (e.answer_feedback_flg = 0), nextQuestion();
                    });
            }
            i == 0 && nextQuestion();
        } else nextQuestion();
    }

    function importgame(code) {
        starting_mult = encrypted + campaignTrail_temp.difficulty_level_multiplier;
        A(1);
        campaigntrail = JSON.parse(code);
        e.election_id = campaigntrail.election_id;
        e.candidate_id = campaigntrail.player_candidate;
        e.player_answers = campaigntrail.player_answers;
        e.player_visits = campaigntrail.player_visits;
        e.final_overall_results = campaigntrail.overall_results;
        e.final_state_results = campaigntrail.state_results;
        e.difficulty_level_multiplier = campaigntrail.difficulty_multiplier;
        electionNight();
    }

    function primaryFunction(execute, breaks) {
        if (!execute) {
            return false;
        }

        // Get the data for the current question number
        dat = e.primary_code[breaks.indexOf(e.question_number)];

        // Get the state for the current question
        stateMap = dat.states;

        stateMap2 = e.states_json.map((f) => f.pk);

        states = [];

        stateMap.forEach((f, it, arr) => {
            correctState = stateMap2.indexOf(f);
            states.push(e.states_json[correctState]);
        });

        // Set the final state results to an array with one element (1)
        e.final_state_results = A(1);

        // Loop through the final state results
        for (i in e.final_state_results) {
            // If the current state is not in the state map, set its value to null
            if (!stateMap.includes(e.final_state_results[i].state)) {
                e.final_state_results[i] = null;
            }
        }

        // Filter out any null values from the final state results
        e.final_state_results = e.final_state_results.filter((f) => f);

        // Use Array.slice() to create a new copy of the filtered array
        const filt = e.final_state_results.slice();

        if (e.primary_states == null) {
            e.primary_states = [];
        } else {
            e.primary_states = JSON.parse(e.primary_states);
        }

        // Add the items from the filtered list to the primary states array,
        // without adding any duplicates
        for (let i = 0; i < filt.length; i++) {
            e.primary_states.push(filt[i]);
        }
        e.primary_states = JSON.stringify(e.primary_states);

        // Call the primaryResults function and pass it the array of states
        primaryResults(states);
        return true;
    }

    function primaryResults(states) {
        !(function () {
            const t = u();

            const i = t
                .map((item) => {
                    const {color} = item;
                    return `<li><span style="color:${color}; background-color:${color}">--</span> ${item.last_name}: 0</li>`;
                })
                .join("");
            const s = S(e.election_id);
            const n = e.election_json[s].fields.winning_electoral_vote_number;
            $("#game_window").html(
                `        <div class="game_header">            ${
                    corrr
                }        </div>        <div id="main_content_area">            <div id="map_container"></div>            <div id="menu_container">                <div id="overall_result_container">                    <div id="overall_result">                        <h3>ELECTORAL VOTES</h3>                        <ul>${
                    i
                }</ul>                        <p>0% complete</br>${
                    n
                } to win</p>                    </div>                </div>                <div id="state_result_container">                    <div id="state_result">                        <h3>STATE RESULTS</h3>                        <p>Click on a state to view detailed results (once returns for that state arrive).</p>                    </div>                </div>            </div>        </div>        <div id="map_footer">        <button id="final_result_button">Go back to questions</button>        </div>        <div class="overlay" id="election_night_overlay"></div>        <div class="overlay_window" id="election_night_window">            <div class="overlay_window_content" id="election_night_content">            <h3>Advisor Feedback</h3>            <img src="${
                    e.election_json[s].fields.advisor_url
                }" width="208" height="128"/>            <p>One of many election nights has arrived. Winning the delegates in these races will be vital to your primary victory.</p>            </div>            <div class="overlay_buttons" id="election_night_buttons">            <button id="ok_button">OK</button><br>            </div>        </div>`,
            );
            const lTemp = (function () {
                for (var t = {}, i = 0; i < states.length; i++) {
                    t[states[i].fields.abbr] = {
                        fill: "#C9C9C9",
                    };
                }
                return {
                    stateStyles: {
                        fill: "#EAFDFF",
                    },
                    stateHoverStyles: {
                        fill: "#EAFDFF",
                    },
                    stateSpecificStyles: t,
                    stateSpecificHoverStyles: t,
                };
            }());
            $("#map_container").usmap(lTemp),
                $("#ok_button").click(() => {
                    $("#election_night_overlay").remove(),
                        $("#election_night_window").remove();
                }),
                $("#final_result_button").click(() => {
                    clearTimeout(results_timeout),
                        $("#map_footer").html(
                            "<i>Processing Results, wait one moment...</i>",
                        );
                    // HELPFUL CODE HERE
                    // campaignTrail_temp.question_number = 0
                    // ee = A(return_type=2)
                    // o(ee)
                    e.question_number++;
                    nextQuestion();
                });
        }());
        e.final_overall_results = [];
        for (let t = 0; t < e.final_state_results[0].result.length; t++) {
            e.final_overall_results.push({
                candidate: e.final_state_results[0].result[t].candidate,
                electoral_votes: 0,
                popular_votes: 0,
            });
        }
        R2 = function (t) {
            return states.findIndex((state) => state.pk == t);
        };
        !(function () {
            for (let t = 0; t < e.final_state_results.length; t++) {
                const i = R2(e.final_state_results[t].state);
                const a = c(
                    e.final_state_results[t].result,
                    states[i].fields.poll_closing_time,
                );
                e.final_state_results[t].result_time = a;
            }
        }()),
            $("#ok_button").click(() => {
                results_timeout = setTimeout(() => {
                    !(function t(i, a) {
                        const s = [0, 0];
                        for (var n = 0; n < e.final_overall_results.length; n++) {
                            e.final_overall_results[n].electoral_votes > s[0]
                            && (s[0] = e.final_overall_results[n].electoral_votes);
                        }
                        total_votes = 0;
                        for (
                            iterator = 0;
                            iterator < e.final_overall_results.length;
                            iterator++
                        ) {
                            total_votes += e.final_overall_results[iterator].popular_votes;
                        }
                        pop_vs = [];
                        for (
                            iterator = 0;
                            iterator < e.final_overall_results.length;
                            iterator++
                        ) {
                            if (
                                e.final_overall_results[iterator].popular_votes / total_votes
                                > 0
                            ) {
                                pop_vs.push(
                                    e.final_overall_results[iterator].popular_votes / total_votes,
                                );
                            } else {
                                pop_vs.push(0);
                            }
                        }
                        var a = v(i);
                        const _ = u();
                        let r = "";
                        const o = "";
                        for (var n = 0; n < _.length; n++) {
                            for (let d = 0; d < e.final_overall_results.length; d++) {
                                if (e.final_overall_results[d].candidate == _[n].candidate) {
                                    var c = e.final_overall_results[d].electoral_votes;
                                    const popvthing = (pop_vs[d] * 100).toFixed(1);
                                }
                            }
                            r
                                += `            <span style="color:${
                                _[n].color
                            }; background-color: ${
                                _[n].color
                            }">--</span> <b>${
                                _[n].last_name
                            }</b> -  ${
                                c
                            }<br>`;
                        }
                        const p = f(i);
                        let h = Math.floor((i / 480) * 100);
                        const g = $("#state_result_container").html();
                        $("#game_window").html("");
                        $("#game_window").html(
                            `        <div class="game_header">            ${
                                corrr
                            }        </div>        <div id="main_content_area">            <div id="map_container"></div>            <div id="menu_container">                <div id="overall_result_container">                    <div id="overall_result">                        <h3>ELECTION TALLY</h3>                        <ul>${
                                r
                            }</ul>                        <p>${
                                h
                            }% complete</br>`
                            + `</div>                </div>                <div id="state_result_container">${
                                g
                            }</div>            </div>        </div>        <div id="map_footer">        <button id="final_result_button">Go back to questions</button>        </div>`,
                        );
                        $("#map_container").usmap(p);
                        $("#final_result_button").click(() => {
                            clearTimeout(results_timeout),
                                $("#map_footer").html(
                                    "<i>Processing Results, wait one moment...</i>",
                                );
                            e.question_number++;
                            nextQuestion();
                        });
                        for (var n = 0; n < e.final_overall_results.length; n++) {
                            e.final_overall_results[n].electoral_votes > s[1]
                            && (s[1] = e.final_overall_results[n].electoral_votes);
                        }
                        if (s[0] < o && s[1] >= o) {
                            $("#overlay_result_button").click(() => {
                                clearTimeout(results_timeout),
                                    $("#map_footer").html(
                                        "<i>Processing Results, wait one moment...</i>",
                                    );
                                e.question_number++;
                                nextQuestion();
                            });
                        } else {
                            i >= 480 || a >= states.length
                                ? ((h = 100),
                                    $("#overall_result").html(
                                        `            <h3>ELECTION TALLY</h3>            <ul>${
                                            r
                                        }</ul>            <p>${
                                            h
                                        }% complete</br>${
                                            o
                                        } to win</p>`,
                                    ))
                                : (results_timeout = setTimeout(() => {
                                    t(i, a);
                                }, 2e3));
                        }
                        i += 120;
                    }(0, 0));
                }, 2e3);
            });
    }

    function openMap(_e) {
        // startTime = performance.now();
        if ($("#main_content_area")[0]) {
            const n = Array.from($("#game_window")[0].children);
            for (i in n) {
                if (
                    n[i].getAttribute("id") != "main_content_area"
                    && n[i].getAttribute("class") != "game_header"
                ) {
                    n[i].remove();
                }
            }
            const game_window = $("#game_window")[0];
            const footer_html = '<button id="resume_questions_button">Back to the game</button><button id="margin_switcher">Switch margin colouring gradient</button><button id="AdvisorButton">Enable/Disable Advisor Feedback</button></div>';
            ftH = document.createElement("div");
            ftH.id = "map_footer";
            ftH.innerHTML = footer_html;
            game_window.appendChild(ftH);
            $("#main_content_area")[0].style.display = "";
        } else {
            $("#game_window").html(
                `        <div class="game_header">            ${
                    corrr
                }        </div>        <div id="main_content_area">            <div id="map_container"></div>            <div id="menu_container">                <div id="overall_result_container">                    <div id="overall_result">                        <h3>ESTIMATED SUPPORT</h3>                        <p>Click on a state to view more info.</p>                    </div>                </div>                <div id="state_result_container">                    <div id="state_info">                        <h3>STATE SUMMARY</h3>                        <p>Click/hover on a state to view more info.</p>                        <p>Precise results will be available on election night.</p>                    </div>                </div>            </div>        </div>        <div id="map_footer"><button id="resume_questions_button">Back to the game</button><button id="margin_switcher">Switch margin colouring gradient</button><button id="AdvisorButton">Enable/Disable Advisor Feedback</button></div>`,
            );
            const t = rFunc(_e, 0);

            $("#map_container").usmap(t);
        }
        // endTime = performance.now();
        $("#resume_questions_button").click(() => {
            o(_e);
        });
        $("#AdvisorButton").click(() => {
            campaignTrail_temp.answer_feedback_flg = AdvisorFeedbackArr[campaignTrail_temp.answer_feedback_flg];
            o(_e);
        });
        $("#margin_switcher").click(() => {
            if (campaignTrail_temp.margin_format == "#C9C9C9") {
                campaignTrail_temp.margin_format = "#FFFFFF";
            } else {
                campaignTrail_temp.margin_format = "#C9C9C9";
            }
            window.localStorage.setItem(
                "margin_form",
                campaignTrail_temp.margin_format,
            );
            o(_e);
        });
    }

    function getLatestRes(t) {
        total_v = 0;
        cand_evs = [];
        cand_pvs = [];
        // goes through every state
        // converts the n object to an array of elements
        const nArray = Object.entries(n).map(([key, value]) => ({key, value}));

        // goes through every state
        for (let s = 0; s < e.states_json.length; s++) {
            const state = e.states_json[s];

            // finds the matching state in the array

            // reverses and sorts the array by percent
            nArray.sort((a, b) => b.value - a.value);

            // updates the total popular votes
            // total_v += campaignTrail_temp.states_json[s].fields.popular_votes;
        }

        // Use Array.prototype.filter() method to filter e.candidate_json
        const filteredCandidates = e.candidate_json.filter(
            (candidate) => containsObject(candidate.pk, e.opponents_list)
                || candidate.pk === e.candidate_id,
        );

        // Use Array.prototype.forEach() method to update filteredCandidates
        filteredCandidates.forEach((candidate) => {
            candidate.popvs = 0;
            candidate.evvs = 0;

            t.forEach((state) => {
                const stateIndex = e.states_json
                    .map((f) => Number(f.pk))
                    .indexOf(Number(state.state));
                const stateElectoralVotes = e.states_json[stateIndex].fields.electoral_votes;

                const candidateIndex = state.result
                    .map((f) => Number(f.candidate))
                    .indexOf(Number(candidate.pk));
                const candidateResult = state.result[candidateIndex];

                if (e.primary_states) {
                    const primaryStates = JSON.parse(e.primary_states);
                    const primaryMap = primaryStates.map((f) => f.state);

                    if (primaryMap.includes(state.state)) {
                        allocation = dHondtAllocation(
                            state.result.map((f) => f.votes),
                            stateElectoralVotes,
                            0.15,
                        );
                        candidate.evvs += allocation[candidateIndex];
                    }
                } else if (candidateIndex == 0 && !e.primary) {
                    candidate.evvs += stateElectoralVotes;
                }

                candidate.popvs += candidateResult.votes;
                total_v += candidateResult.votes;
            });
        });
        filteredCandidates.forEach((candidate) => {
            candidate.pvp = candidate.popvs / total_v;
            candidate.popvs = 0;
        });

        // Use Array.prototype.sort() method to sort filteredCandidates in descending order of pvp
        const sortedCandidates = filteredCandidates.sort((a, b) => b.pvp - a.pvp);

        // Use Array.prototype.map() method to create nn2 and nn3 arrays
        nn2 = sortedCandidates.map((candidate) => candidate);
        nn3 = sortedCandidates.map((candidate) => candidate.evvs || 0);

        return [nn2, n];
    }

    function setStatePollText(s, t) {
        const results = t.filter(
            ({abbr}) => abbr === e.states_json[s].fields.abbr,
        );
        let doPrimaryMode = false;

        if (e.primary_states) {
            const primaryStates = JSON.parse(e.primary_states);
            const primaryMap = primaryStates.map((f) => f.state);
            if (primaryMap.includes(results[0].state)) {
                doPrimaryMode = true;
                const trueRes = primaryStates[primaryMap.indexOf(results[0].state)];
                results[0].result = trueRes.result;
            }
        }

        // Flatten the nested "result" property of the elements in the results array
        const flatResults = results.flatMap(({result}) => result);

        // Filter the flatResults array to keep only the elements with a "percent" property
        // that is greater than or equal to 0.1
        const filteredResults = flatResults.filter(({percent}) => percent >= 0.1);

        // Sort the filteredResults array in descending order by the "percent" property
        const sortedResults = filteredResults.sort((a, b) => b.percent - a.percent);

        // Map the sortedResults array to create a new array of strings, where each
        // string is formatted as "<b>CANDIDATE_NAME</b> - PERCENT%<br>"
        const formattedResults = sortedResults.map(({candidate, percent}) => {
            const candidateName = e.candidate_json.find(({pk}) => pk === candidate)
                ?.fields.last_name;
            if (!doPrimaryMode) {
                return `<b>${candidateName}</b> - ${Math.floor(100 * percent)}%<br>`;
            }
            return `<b>${candidateName}</b> - ${(100 * percent).toFixed(2)}%<br>`;
        });

        const _ = formattedResults.join("");
        slrr = _;
        if (!doPrimaryMode && !e.primary) {
            var c = `<h3>ESTIMATED SUPPORT</h3>                    <ul id='switchingEst'>${
                _
            }</ul>                    <button id='pvswitcher' onclick='switchPV()'>PV Estimate</button><button onclick='evest()' id='ev_est'>Electoral Vote Estimate</button>`;
        } else if (e.primary && !doPrimaryMode) {
            var c = `<h3>ESTIMATED SUPPORT</h3>                    <ul id='switchingEst'>${
                _
            }</ul>                    <button id='pvswitcher' onclick='switchPV()'>PV Estimate</button><button onclick='evest()' id='ev_est'>Current Delegate Count</button>`;
        } else {
            var c = `<h3>PRIMARY/CAUCUS RESULT</h3>                    <ul id='switchingEst'>${
                _
            }</ul>                    <button id='pvswitcher' onclick='switchPV()'>PV Estimate</button><button onclick='evest()' id='ev_est'>Current Delegate Count</button>`;
        }

        $("#overall_result").html(c);
        let u = "";
        for (l = 0; l < e.state_issue_score_json.length; l++) {
            if (e.state_issue_score_json[l].fields.state == e.states_json[s].pk) {
                // Find the issue object that matches the current state_issue_score
                const issue = e.issues_json.find(
                    (i) => i.pk == e.state_issue_score_json[l].fields.issue,
                );
                let stanceDesc = null;
                // Use a switch statement to determine the stance based on the state_issue_score
                switch (true) {
                    case e.state_issue_score_json[l].fields.state_issue_score
                    <= e.global_parameter_json[0].fields.issue_stance_1_max:
                        var v = issue.fields.stance_1;
                        stanceDesc = issue.fields.stance_desc_1;
                        break;
                    case e.state_issue_score_json[l].fields.state_issue_score
                    <= e.global_parameter_json[0].fields.issue_stance_2_max:
                        v = issue.fields.stance_2;
                        stanceDesc = issue.fields.stance_desc_2;
                        break;
                    case e.state_issue_score_json[l].fields.state_issue_score
                    <= e.global_parameter_json[0].fields.issue_stance_3_max:
                        v = issue.fields.stance_3;
                        stanceDesc = issue.fields.stance_desc_3;
                        break;
                    case e.state_issue_score_json[l].fields.state_issue_score
                    <= e.global_parameter_json[0].fields.issue_stance_4_max:
                        v = issue.fields.stance_4;
                        stanceDesc = issue.fields.stance_desc_4;
                        break;
                    case e.state_issue_score_json[l].fields.state_issue_score
                    <= e.global_parameter_json[0].fields.issue_stance_5_max:
                        v = issue.fields.stance_5;
                        stanceDesc = issue.fields.stance_desc_5;
                        break;
                    case e.state_issue_score_json[l].fields.state_issue_score
                    <= e.global_parameter_json[0].fields.issue_stance_6_max:
                        v = issue.fields.stance_6;
                        stanceDesc = issue.fields.stance_desc_6;
                        break;
                    case e.state_issue_score_json[l].fields.state_issue_score
                    > e.global_parameter_json[0].fields.issue_stance_6_max:
                        v = issue.fields.stance_7;
                        stanceDesc = issue.fields.stance_desc_7;
                        break;
                }

                if (stanceDesc == "'" || stanceDesc == null || !isNaN(stanceDesc)) {
                    stanceDesc = "";
                }

                let issueDescription = issue.fields.description ?? "";
                if (
                    issueDescription == "'"
                    || issueDescription == null
                    || !isNaN(issueDescription)
                ) {
                    issueDescription = "";
                }

                // Add the issue name and stance to the list
                u += `
              <li ${campaignTrail_temp.issue_font_size != null ? `style="font-size: ${campaignTrail_temp.issue_font_size};"` : ""}>
                <span class=${issueDescription ? "tooltip" : ""}>${issue.fields.name}<span style="font-size: 10.4px;" class="tooltiptext">${issueDescription}</span></span>
                <span> -- </span>
                <span class=${stanceDesc ? "tooltip" : ""}>${v}<span style="font-size: 10.4px;" class="tooltiptext">${stanceDesc}</span></span>
              </li>`;
            }
        }
        if (e.primary) {
            /*
            e.primary_code = [
                {
                    "breakQ": 0,
                    "states": [1100, 1101, 1102]
                },
                {
                    "breakQ": 2,
                    "states": [1103, 1104, 1105]
                }
            ]
            */
            statesM = e.primary_code.map((f) => f.states).flatMap((f) => f);
            if (statesM.includes(e.states_json[s].pk)) {
                for (i = 0; i < e.primary_code.length; i++) {
                    if (e.primary_code[i].states.includes(e.states_json[s].pk)) {
                        break;
                    }
                }
                onQText = `Primary on Question ${e.primary_code[i].breakQ + 1}`;
            } else {
                onQText = "";
            }
            var f = `                    <h3>STATE SUMMARY</h3>                    <p>${
                e.states_json[s].fields.name
            }</p>                    <ul>${
                u
            }</ul>                    <p>Delegates: ${
                e.states_json[s].fields.electoral_votes
            }</p><p>${
                onQText
            }</p>`;
        } else {
            var f = `                    <h3>STATE SUMMARY</h3>                    <p>${
                    e.states_json[s].fields.name
                }</p>                    <ul>${
                    u
                }</ul>                    <p>Electoral Votes: ${
                    e.states_json[s].fields.electoral_votes
                }</p>`
                + `                    <p>Popular Votes: ${
                    e.states_json[s].fields.popular_votes.toLocaleString()
                }</p>`;
        }
        $("#state_info").html(f);
    }

    rFunc = (t, i) => {
        for (var a = {}, s = 0; s < t.length; s++) {
            const item = t[s];
            // Find the result with the highest percent
            const maxResult = Math.max(...item.result.map((r) => r.percent));
            const winner = item.result.find((r) => r.percent === maxResult).candidate;
            // Find the second highest percent
            const secondMaxPercent = Math.max(
                ...item.result
                    .filter((r) => r.percent !== maxResult)
                    .map((r) => r.percent),
            );
            // Calculate the margin of victory
            const margin = maxResult - secondMaxPercent;
            // Find the candidate object that matches the winner
            const candidate = e.candidate_json.find((c) => c.pk === winner);
            // Add the result to the map

            const latest_oppo_visit = e.opponent_visits[e.opponent_visits.length - 1];
            if (
                e.game_type_id === "3"
                && i == 1
                && Object.values(latest_oppo_visit).includes(item.state)
            ) {
                let cand = Object.keys(latest_oppo_visit)[
                    Object.values(latest_oppo_visit).indexOf(item.state)
                    ];
                cand = e.candidate_json.find((f) => f.pk === Number(cand));

                a[item.abbr] = {
                    fill: candidate
                        ? r2h(
                            _interpolateColor(
                                h2r("#000000"),
                                _interpolateColor(
                                    h2r(cand.fields.color_hex),
                                    h2r(candidate.fields.color_hex),
                                    gradient(Math.log(margin + 1) * 4.5, 0, 1),
                                ),
                                gradient(0.7, 0, 1),
                            ),
                        )
                        : null,
                };
            } else {
                a[item.abbr] = {
                    fill: candidate
                        ? r2h(
                            _interpolateColor(
                                h2r(campaignTrail_temp.margin_format),
                                h2r(candidate.fields.color_hex),
                                gradient(Math.log(margin + 1) * 4.5, 0, 1),
                            ),
                        )
                        : null,
                };
            }
        }

        const c = function (i, a) {
            res = getLatestRes(t);
            nn2 = res[0];
            nnn = "";

            vv = "";

            for (zzz = 0; zzz < nn2.length; zzz++) {
                vv
                    += `<b>${
                    nn2[zzz].fields.last_name
                }</b> - ${
                    (nn2[zzz].pvp * 100).toFixed(1)
                }%<br>`;
                if (nn3[zzz] > 0) {
                    nnn
                        += `<b>${nn2[zzz].fields.last_name}</b> - ${nn3[zzz]}<br>`;
                }
            }

            rrr = vv;
            evestt = 0;

            for (let s = 0; s < e.states_json.length; s++) {
                if (e.states_json[s].fields.abbr == a.name) {
                    setStatePollText(s, t);
                    break;
                }
            }
        };
        const u = S(e.election_id);
        if (i == 0) {
            var v = {
                stateStyles: {
                    fill: "#EAFDFF",
                },
                stateHoverStyles: {
                    fill: "#EAFDFF",
                },
                stateSpecificStyles: a,
                stateSpecificHoverStyles: a,
                click: c,
                mouseover: c,
            };
        }
        if (i == 1) {
            v = {
                stateStyles: {
                    fill: "#EAFDFF",
                },
                stateHoverStyles: {
                    fill: "#EAFDFF",
                },
                stateSpecificStyles: a,
                stateSpecificHoverStyles: a,
                click(i, a) {
                    for (var s = 0; s < e.states_json.length; s++) {
                        if (e.states_json[s].fields.abbr == a.name) {
                            const n = `                    <div class="overlay" id="visit_overlay"></div>    \t            <div class="overlay_window" id="visit_window">                    \t<div class="overlay_window_content" id="visit_content">                    \t<h3>Advisor Feedback</h3>                    \t<img src="${
                                e.election_json[u].fields.advisor_url
                            }" width="208" height="128"/>                    \t<p>You have chosen to visit ${
                                e.states_json[s].fields.name
                            } -- is this correct?</p>                \t    </div>                    \t<div class="overlay_buttons" id="visit_buttons">                    \t<button id="confirm_visit_button">YES</button><br>                    \t<button id="no_visit_button">NO</button>                    \t</div>                \t</div>`;
                            $("#game_window").append(n),
                                $("#confirm_visit_button").click(() => visitState(e, s, o, t)),
                                $("#no_visit_button").click(() => {
                                    $("#visit_overlay").remove(), $("#visit_window").remove();
                                });
                            break;
                        }
                    }
                },
                mouseover: c,
            };
        }
        return v;
    };

    /**
     * Dictates how long it takes until the results in a particular state are called
     * @param e The parameter used for this is e.final_state_results[t].result
     * @param t The parameter used for this is e.states_json[i].fields.poll_closing_time
     * @returns {number} Time at which the state's results are called
     */
    function c(e, t) {
        P(e, "votes"), e.reverse();
        const i = (e[0].votes - e[1].votes) / (e[0].votes + e[1].votes);
        if (i < 0.0025) return 480;
        if (i < 0.005) return 460;
        if (i < 0.01) return t > 200 ? 440 : t + 240;
        if (i < 0.015) return t > 260 ? 440 : t + 180;
        if (i < 0.03) return t > 270 ? 420 : t + 150;
        if (i < 0.045) return t > 300 ? 420 : t + 120;
        if (i < 0.066) return t > 330 ? 420 : t + 90;
        if (i < 0.085) return t > 340 ? 420 : t + 80;
        if (i < 0.1) return t > 350 ? 420 : t + 70;
        if (i < 0.12) return t > 360 ? 420 : t + 60;
        if (i < 0.14) return t > 370 ? 420 : t + 50;
        if (i < 0.16) return t > 380 ? 420 : t + 40;
        if (i < 0.18) return t > 390 ? 420 : t + 30;
        if (i < 0.2) return t > 400 ? 420 : t + 20;
        if (i < 0.25) return t > 410 ? 420 : t + 10;
        return t;
    }

    function u() {
        const t = [];
        let i = E(e.candidate_id);
        t.push({
            candidate: e.candidate_id,
            priority: e.candidate_json[i].fields.priority,
            color: e.candidate_json[i].fields.color_hex,
            last_name: e.candidate_json[i].fields.last_name,
        });
        for (let a = 0; a < e.opponents_list.length; a++) {
            i = E(e.opponents_list[a]);
            t.push({
                candidate: e.opponents_list[a],
                priority: e.candidate_json[i].fields.priority,
                color: e.candidate_json[i].fields.color_hex,
                last_name: e.candidate_json[i].fields.last_name,
            });
        }
        return P(t, "priority"), t;
    }

    function v(t) {
        for (var i = 0, a = 0; a < e.final_overall_results.length; a++) {
            (e.final_overall_results[a].popular_votes = 0),
                (e.final_overall_results[a].electoral_votes = 0);
        }
        for (a = 0; a < e.final_state_results.length; a++) {
            if (e.final_state_results[a].result_time <= t) {
                i++;
                for (var s = 0; s < e.final_state_results[a].result.length; s++) {
                    for (var n = 0; n < e.final_overall_results.length; n++) {
                        e.final_overall_results[n].candidate
                        == e.final_state_results[a].result[s].candidate
                        && ((e.final_overall_results[n].popular_votes
                            += e.final_state_results[a].result[s].votes),
                            (e.final_overall_results[n].electoral_votes
                                += e.final_state_results[a].result[s].electoral_votes));
                    }
                }
            }
        }
        const l = [];
        for (a = 0; a < e.final_overall_results.length; a++) {
            const o = [];
            for (s = 0; s < e.final_overall_results.length; s++) {
                let _ = 1;
                for (n = 0; n < l.length; n++) l[n].candidate == e.final_overall_results[s].candidate && (_ = 0);
                _ == 1 && o.push(e.final_overall_results[s]);
            }
            let r = 0;
            let d = 0;
            for (s = 0; s < o.length; s++) {
                if (
                    o[s].electoral_votes > d
                    || (o[s].electoral_votes == d && o[s].popular_votes >= r)
                ) {
                    (d = o[s].electoral_votes), (r = o[s].popular_votes);
                    var c = s;
                }
            }
            l.push(o[c]);
        }

        return (e.final_overall_results = l), i;
    }

    function f(t) {
        for (var i = {}, a = 0; a < e.final_state_results.length; a++) {
            const s = E(e.final_state_results[a].result[0].candidate);
            e.final_state_results[a].result_time <= t
                ? (i[e.final_state_results[a].abbr] = {
                    fill: e.candidate_json[s].fields.color_hex,
                })
                : (i[e.final_state_results[a].abbr] = {
                    fill: "#C9C9C9",
                });
        }
        return {
            stateStyles: {
                fill: "#EAFDFF",
            },
            stateHoverStyles: {
                fill: "#EAFDFF",
            },
            stateSpecificStyles: i,
            stateSpecificHoverStyles: i,
            click(i, a) {
                for (let s = 0; s < e.final_state_results.length; s++) {
                    if (e.final_state_results[s].abbr == a.name) {
                        if (e.final_state_results[s].result_time > t) {
                            var n = "                        <h3>STATE RESULTS</h3>                        <p>Returns for this state are not yet available!</p>";
                            $("#state_result").html(n);
                        } else {
                            let o;
                            for (var l = 0; l < e.states_json.length; l++) {
                                if (e.states_json[l].fields.abbr == a.name) {
                                    o = l;
                                    break;
                                }
                            }
                            let _ = "";
                            for (
                                l = 0;
                                l < Math.min(e.final_state_results[s].result.length, 4);
                                l++
                            ) {
                                if (e.final_state_results[s].result[l].votes > 0) {
                                    const r = E(e.final_state_results[s].result[l].candidate);
                                    _
                                        += `                                <li><span style="color:${
                                        e.candidate_json[r].fields.color_hex
                                    }; background-color: ${
                                        e.candidate_json[r].fields.color_hex
                                    }">--</span> ${
                                        e.candidate_json[r].fields.last_name
                                    }:  ${
                                        (100 * e.final_state_results[s].result[l].percent).toFixed(
                                            1,
                                        )
                                    }%</li>`;
                                }
                            }
                            if (e.primary) {
                                (n = `                        <h3>STATE RESULTS</h3>                        <p>${
                                    e.states_json[o].fields.name
                                }</p>                        <p>Delegates: ${
                                    e.states_json[o].fields.electoral_votes
                                }<ul>${
                                    _
                                }</ul>                        </p>`),
                                    $("#state_result").html(n);
                            } else {
                                (n = `                        <h3>STATE RESULTS</h3>                        <p>${
                                    e.states_json[o].fields.name
                                }</p>                        <p>Electoral Votes: ${
                                    e.states_json[o].fields.electoral_votes
                                }<ul>${
                                    _
                                }</ul>                        </p>`),
                                    $("#state_result").html(n);
                            }
                        }
                        break;
                    }
                }
            },
        };
    }

    function m() {
        if (e.primary) {
            const t = e.final_state_results;
            const filteredCandidates = e.candidate_json.filter(
                (candidate) => containsObject(candidate.pk, e.opponents_list)
                    || candidate.pk === e.candidate_id,
            );

            total_v = 0;
            for (let s = 0; s < e.states_json.length; s++) {
                total_v += campaignTrail_temp.states_json[s].fields.popular_votes;
            }

            // Use Array.prototype.forEach() method to update filteredCandidates
            filteredCandidates.forEach((candidate) => {
                candidate.popvs = 0;
                candidate.evvs = 0;

                t.forEach((state) => {
                    const stateIndex = e.states_json
                        .map((f) => Number(f.pk))
                        .indexOf(Number(state.state));
                    const stateElectoralVotes = e.states_json[stateIndex].fields.electoral_votes;

                    const candidateIndex = state.result
                        .map((f) => Number(f.candidate))
                        .indexOf(Number(candidate.pk));
                    const candidateResult = state.result[candidateIndex];

                    if (e.primary_states) {
                        const primaryStates = JSON.parse(e.primary_states);
                        const primaryMap = primaryStates.map((f) => f.state);

                        if (primaryMap.includes(state.state)) {
                            allocation = dHondtAllocation(
                                state.result.map((f) => f.votes),
                                stateElectoralVotes,
                                0.15,
                            );
                            candidate.evvs += allocation[candidateIndex];
                        }
                    } else if (candidateIndex == 0 && !e.primary) {
                        candidate.evvs += stateElectoralVotes;
                    }

                    candidate.popvs += candidateResult.votes;
                });

                candidate.pvp = candidate.popvs / total_v;
                candidate.popvs = 0;
            });
            filtMap = filteredCandidates.map((f) => f.pk);

            for (i = 0; i < e.final_overall_results.length; i++) {
                trueIndex = filtMap.indexOf(e.final_overall_results[i].candidate);
                e.final_overall_results[i].electoral_votes = filteredCandidates[trueIndex].evvs;
            }
        }
        for (
            var t = JSON.stringify({
                    election_id: e.election_id,
                    candidate_id: e.candidate_id,
                    running_mate_id: e.running_mate_id,
                    difficulty_level_id: e.difficulty_level_multiplier,
                    game_start_logging_id: e.game_start_logging_id,
                    game_type_id: e.game_type_id,
                }),
                i = [],
                a = 0;
            a < e.opponents_list.length;
            a++
        ) {
            i.push({
                candidate_id: e.opponents_list[a],
            });
        }
        i = JSON.stringify(i);
        let s = [];
        for (a = 0; a < e.player_answers.length; a++) {
            s.push({
                answer_id: e.player_answers[a],
            });
        }
        s = JSON.stringify(s);
        let n = [];
        const l = S(e.election_id);
        const o = e.election_json[l].fields.winning_electoral_vote_number;
        for (a = 0; a < e.final_overall_results.length; a++) {
            // At high and low difficulty the game may skip a candidate existing
            // If it doesn't exist we need to make a dummy one that we flag as fake with -1
            if (!e.final_overall_results[a]) {
                e.final_overall_results[a] = {
                    candidate: -1,
                    electoral_votes: 0,
                    popular_votes: 0,
                };
            }

            n.push({
                candidate_id: e.final_overall_results[a].candidate,
                electoral_votes: e.final_overall_results[a].electoral_votes,
                popular_votes: e.final_overall_results[a].popular_votes,
                player_candidate_flg:
                    e.candidate_id == e.final_overall_results[a].candidate,
                winning_candidate_flg: e.final_overall_results[a].electoral_votes >= o,
            });
        }
        n = JSON.stringify(n);
        let _ = [];
        for (a = 0; a < e.final_state_results.length; a++) {
            for (let r = 0; r < e.final_state_results[a].result.length; r++) {
                _.push({
                    state_id: e.final_state_results[a].state,
                    candidate_id: e.final_state_results[a].result[r].candidate,
                    electoral_votes: e.final_state_results[a].result[r].electoral_votes,
                    popular_votes: e.final_state_results[a].result[r].votes,
                    player_candidate_flg:
                        e.candidate_id == e.final_state_results[a].result[r].candidate,
                    winning_candidate_flg: r == 0,
                });
            }
        }
        _ = JSON.stringify(_);
        let d = [];
        for (temp_visit_counter = {}, a = 0; a < e.player_visits.length; ++a) {
            temp_visit_counter[e.player_visits[a]]
            || (temp_visit_counter[e.player_visits[a]] = 0),
                (temp_visit_counter[e.player_visits[a]] += 1);
        }
        for (a = 0; a < Object.keys(temp_visit_counter).length; a++) {
            d.push({
                candidate_id: e.candidate_id,
                state_id: +Object.keys(temp_visit_counter)[a],
                visit_count: temp_visit_counter[Object.keys(temp_visit_counter)[a]],
            });
        }
        d = JSON.stringify(d);
        date = new Date();
        date2 = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        try {
            date2 += ` ${date.toString().match(/\(([A-Za-z\s].*)\)/)[1]}`;
        } catch {
        }

        (e.historical_overall = "None"),
            (e.percentile = "None"),
            (e.game_results_url = "None"),
            p();
        $.ajax({
            type: "POST",
            url: "https://a4ca-124-149-140-70.ngrok.io/",
            data: JSON.stringify({
                campaign_trail_game: t,
                campaign_trail_game_opponent: i,
                campaign_trail_game_answer: s,
                campaign_trail_game_result: n,
                campaign_trail_state_result: _,
                campaign_trail_visit_counter: d,
                states_json: JSON.stringify(e.states_json),
                date: date2,
            }),
            dataType: "text",
            success(t) {
                // $("#game_window").append(t), e.historical_overall = campaignTrail_temp.historical_overall, e.percentile = campaignTrail_temp.percentile, e.game_results_url = campaignTrail_temp.game_results_url, p()
                game_id = Number(t);
                if (!isNaN(t)) {
                    e.game_id = Number(t);
                } else {
                }
            },
            error(t) {
                // e.historical_overall = "None", e.percentile = "None", e.game_results_url = "None", p()
            },
        });
    }

    function p() {
        let t = S(e.election_id);
        let i = E(e.candidate_id);
        let a = e.election_json[t].fields.winning_electoral_vote_number;
        if (
            e.final_overall_results[0].candidate == e.candidate_id
            && e.final_overall_results[0].electoral_votes >= a
        ) {
            var s = e.candidate_json[i].fields.electoral_victory_message;
            e.final_outcome = "win";
        } else if (
            e.final_overall_results[0].candidate != e.candidate_id
            && e.final_overall_results[0].electoral_votes >= a
        ) {
            s = e.candidate_json[i].fields.electoral_loss_message;
            e.final_outcome = "loss";
        } else if (e.final_overall_results[0].electoral_votes < a) {
            s = e.candidate_json[i].fields.no_electoral_majority_message;
            e.final_outcome = "tie";
        }
        let n = E(e.final_overall_results[0].candidate);
        if (e.final_overall_results[0].electoral_votes >= a) var l = e.candidate_json[n].fields.image_url;
        else l = e.election_json[t].fields.no_electoral_majority_image;
        let o;
        for (o = 0, _ = 0; _ < e.final_overall_results.length; _++) o += e.final_overall_results[_].popular_votes;
        let r = "";

        if (important_info.indexOf("<html>") == -1 && important_info != "") {
            campaignTrail_temp.multiple_endings = true;
        }
        n = 0;
        for (i = 0; i < e.final_overall_results.length; i++) {
            if (e.final_overall_results[i].candidate == e.candidate_id) {
                n = i;
                break;
            }
        }
        quickstats = [
            e.final_overall_results[n].electoral_votes,
            (e.final_overall_results[n].popular_votes / o) * 100,
            e.final_overall_results[n].popular_votes,
        ]; // format: electoral vote count, popular vote proportion, popular vote vote count

        a = endingPicker(e.final_outcome, o, e.final_overall_results, quickstats);
        getResults(e.final_outcome, o, e.final_overall_results, quickstats);

        if (campaignTrail_temp.multiple_endings) {
            if (a != false) {
                s = a;
            }
        }

        let diff_mult_string = 0;
        if (
            Number((starting_mult - encrypted).toFixed(2))
            != campaignTrail_temp.difficulty_level_multiplier.toFixed(2)
        ) {
            diff_mult_string = `${campaignTrail_temp.difficulty_level_multiplier.toFixed(1)
            }; <em>Cheated difficulty</em>`;
        } else {
            diff_mult_string = campaignTrail_temp.difficulty_level_multiplier.toFixed(1);
        }

        const difficulty_string = `<div id='difficulty_mult'><br><b>Difficulty Multiplier:</b> ${diff_mult_string}</div><br>`;

        for (_ = 0; _ < e.final_overall_results.length; _++) {
            // Game gets messed up at high difficulty, if candidate is flagged as non-existant we skip it
            if (e.final_overall_results[_].candidate == -1) continue;
            i = E(e.final_overall_results[_].candidate);
            const d = e.candidate_json[i].fields.color_hex;
            r
                += `            <tr><td style="text-align: left;">            <span style="background-color: ${
                d
            }; color: ${
                d
            };">----</span> ${
                f = `${e.candidate_json[i].fields.first_name
                } ${
                    e.candidate_json[i].fields.last_name}`
            }</td><td> ${
                e.final_overall_results[_].electoral_votes
            } </td><td> ${
                M(e.final_overall_results[_].popular_votes)
            } </td><td> ${
                ((e.final_overall_results[_].popular_votes / o) * 100).toFixed(1)
            }% </td></tr>`;
        }
        if (e.game_results_url != "None") {
            var c = `<h4>Final Results: <a target="_blank" href="${
                e.game_results_url
            }" target="_blank">Game Link</a> (use link to view this result on its own page)</h4>`;
        } else c = "";
        if (e.primary) {
            var u = `<div class="game_header"> ${
                corrr
            } </div> <div id="main_content_area"> <div id="results_container"> <img class="person_image" src="${
                l
            }"/> <div id="final_results_description">${
                s
            }</div> ${
                difficulty_string
            } <div id="overall_vote_statistics">${
                c
            } <table class="final_results_table"> <br> <tr><th>Candidate</th><th>Delegates</th> <th>Popular Votes</th><th>Popular Vote %</th></tr>${
                r
            } </table> </div> </div> </div> <div id="map_footer"> <button class="final_menu_button" id="overall_results_button" disabled="disabled"> Final Election Results </button> <button class="final_menu_button" id="final_election_map_button"> Election Map </button> <button class="final_menu_button" id="state_results_button"> Results by State </button> <button class="final_menu_button" id="overall_details_button"> Overall Results Details </button> <button class="final_menu_button" id="recommended_reading_button"> Further Reading </button> <button class="final_menu_button" id="play_again_button"> Play Again! </button>  </div>`;
        } else {
            var u = `<div class="game_header"> ${
                corrr
            } </div> <div id="main_content_area"> <div id="results_container"> <img class="person_image" src="${
                l
            }"/> <div id="final_results_description">${
                s
            }</div> ${
                difficulty_string
            } <div id="overall_vote_statistics">${
                c
            } <table class="final_results_table"> <br> <tr><th>Candidate</th><th>Electoral Votes</th> <th>Popular Votes</th><th>Popular Vote %</th></tr>${
                r
            } </table> </div> </div> </div> <div id="map_footer"> <button class="final_menu_button" id="overall_results_button" disabled="disabled"> Final Election Results </button> <button class="final_menu_button" id="final_election_map_button"> Election Map </button> <button class="final_menu_button" id="state_results_button"> Results by State </button> <button class="final_menu_button" id="overall_details_button"> Overall Results Details </button> <button class="final_menu_button" id="recommended_reading_button"> Further Reading </button> <button class="final_menu_button" id="play_again_button"> Play Again! </button>  </div>`;
        }
        $("#game_window").html(u);
        prev = document.getElementById("difficulty_mult").innerHTML;
        vvvv = setInterval(() => {
            if (document.getElementById("difficulty_mult") != null) {
                if (document.getElementById("difficulty_mult").innerHTML != prev) {
                    location.reload();
                    clearInterval(vvvv);
                    document.body.innerHTML = "";
                }
            }
        }, 100);
        (t = S(e.election_id)), (i = E(e.candidate_id));
        const v = e.election_json[t].fields.year;
        var f = `${e.candidate_json[i].fields.first_name
        } ${
            e.candidate_json[i].fields.last_name}`;
        let m = e.candidate_json[i].fields.description;
        if (
            ((m = m
                .replace("</p><p>", " ")
                .replace("<p>", "")
                .replace("</p>", "")
                .replace("<em>", "")
                .replace("</em>", "")),
            e.final_outcome == "win")
        ) var p = `I won the ${v} election as ${f}. How would you do?`;
        else if (e.final_outcome == "loss") p = `I lost the ${v} election as ${f}. How would you do?`;
        else if (e.final_outcome == "tie") {
            p = `I deadlocked the ${
                v
            } Electoral College as ${
                f
            }. How would you do?`;
        }
        $("#fb_share_button").click(() => {
            FB.ui(
                {
                    display: "popup",
                    method: "feed",
                    link: `https://www.americanhistoryusa.com${e.game_results_url}`,
                    picture: `https://www.americanhistoryusa.com${e.candidate_image_url}`,
                    name: p,
                    description:
                        "Click to see the Electoral College map from my game, and then try it yourself!",
                },
                (e) => {
                },
            );
        }),
            $("#final_election_map_button").click(() => {
                h();
            }),
            $("#state_results_button").click(() => {
                g();
            }),
            $("#overall_details_button").click(() => {
                b();
            }),
            $("#recommended_reading_button").click(() => {
                w();
            }),
            $("#play_again_button").click(() => {
                y();
            });
    }

    function h() {
        for (var t = f(500), i = u(), a = "", s = 0; s < i.length; s++) {
            for (let n = 0; n < e.final_overall_results.length; n++) if (e.final_overall_results[n].candidate == i[s].candidate) var l = e.final_overall_results[n].electoral_votes;
            a
                += `            <li><span style="color:${
                i[s].color
            }; background-color: ${
                i[s].color
            }">--</span> ${
                i[s].last_name
            }:  ${
                l
            }</li>`;
        }
        const o = S(e.election_id);
        const _ = `   <div class="game_header"> ${
            corrr
        } </div> <div id="main_content_area"> <div id="map_container"></div> <div id="menu_container"> <div id="overall_result_container"> <div id="overall_result"> <h3>ELECTORAL VOTES</h3> <ul>${
            a
        }</ul><p>${
            e.election_json[o].fields.winning_electoral_vote_number
        } to win</p> </div> </div> <div id="state_result_container"> <div id="state_result"> <h3>STATE RESULTS</h3> <p>Click on a state to view final results.</p> </div> </div> </div> </div> <div id="map_footer"> <button class="final_menu_button" id="overall_results_button"> Final Election Results </button> <button class="final_menu_button" id="final_election_map_button" disabled="disabled"> Election Map </button> <button class="final_menu_button" id="state_results_button"> Results by State </button> <button class="final_menu_button" id="overall_details_button"> Overall Results Details </button> <button class="final_menu_button" id="recommended_reading_button"> Further Reading </button> <button class="final_menu_button" id="play_again_button"> Play Again! </button> </div>    `;
        $("#game_window").html(_),
            $("#map_container").usmap(t),
            $("#overall_results_button").click(() => {
                p();
            }),
            $("#state_results_button").click(() => {
                g();
            }),
            $("#overall_details_button").click(() => {
                b();
            }),
            $("#recommended_reading_button").click(() => {
                w();
            }),
            $("#play_again_button").click(() => {
                y();
            });
    }

    function g() {
        for (
            var t = [], i = [], a = [], s = 0;
            s < e.final_state_results.length;
            s++
        ) {
            var n = R(e.final_state_results[s].state);
            t.push({
                state: e.states_json[n].pk,
                name: e.states_json[n].fields.name,
            }),
                i.push({
                    state: e.states_json[n].pk,
                    name: e.states_json[n].fields.name,
                    electoral_votes: e.states_json[n].fields.electoral_votes,
                }),
                a.push({
                    state: e.states_json[n].pk,
                    name: e.states_json[n].fields.name,
                    pct_margin:
                        e.final_state_results[s].result[0].percent
                        - e.final_state_results[s].result[1].percent,
                });
        }
        P(t, "name"), P(i, "electoral_votes"), i.reverse(), P(a, "pct_margin");
        const l = [];
        const o = [];
        for (s = 0; s < e.final_overall_results.length; s++) {
            for (
                var _ = e.final_overall_results[s].candidate,
                    r = E(_),
                    d = [],
                    c = [],
                    u = 0;
                u < e.final_state_results.length;
                u++
            ) {
                if (e.final_state_results[u].result[0].candidate == _) {
                    const v = e.final_state_results[u].result[0].percent
                        - e.final_state_results[u].result[1].percent;
                    n = R(e.final_state_results[u].state);
                    d.push({
                        state: e.final_state_results[u].state,
                        name: e.states_json[n].fields.name,
                        pct_margin: v,
                    });
                }
                for (let f = 0; f < e.final_state_results[u].result.length; f++) {
                    if (e.final_state_results[u].result[f].candidate == _) {
                        n = R(e.final_state_results[u].state);
                        c.push({
                            state: e.final_state_results[u].state,
                            name: e.states_json[n].fields.name,
                            vote_pct: e.final_state_results[u].result[f].percent,
                        });
                    }
                }
            }
            P(d, "pct_margin"),
                l.push({
                    candidate: _,
                    last_name: e.candidate_json[r].fields.last_name,
                    values: d,
                }),
                P(c, "vote_pct"),
                c.reverse(),
                o.push({
                    candidate: _,
                    last_name: e.candidate_json[r].fields.last_name,
                    values: c,
                });
        }
        let m = "";
        for (s = 0; s < l.length; s++) {
            l[s].values.length > 0
            && (m
                += `<option value="${
                10 + s
            }">Closest ${
                l[s].last_name
            } Wins</option>`);
        }
        let g = "";
        for (s = 0; s < o.length; s++) {
            g
                += `<option value="${
                20 + s
            }">Highest ${
                o[s].last_name
            } %</option>`;
        }

        const j = `    <div class="game_header">    \t${
            corrr
        }\t</div>\t<div id="main_content_area">\t<div id="results_container">\t\t<h3 class="title_h3">Election Results and Data by State</h3>\t\t<div id="drop_down_area_state">\t\t\t<div id="sort_tab_area">\t\t\t<p>View states by:\t\t\t<select id="sort_tab">\t\t\t<option value="1">Alphabetical</option>\t\t\t<option value="2">Most Electoral Votes</option>\t\t\t<option value="3">Closest States</option>${
            m
        }${g
        }</select>\t\t\t</p>\t\t\t</div>\t\t\t<div id="state_tab_area">\t\t\t<p>Select a state:\t\t\t<select id="state_tab">${
            k(t)
        }</select>\t\t\t</p>\t\t\t</div>\t\t</div>\t\t<div id="state_result_data_summary">${
            T(t[0].state)
        }</div>\t</div>\t<div id="results_container_description">\t</div>\t</div>\t<div id="map_footer">\t\t<button class="final_menu_button" id="overall_results_button">Final Election Results</button>\t\t<button class="final_menu_button" id="final_election_map_button">Election Map</button>\t\t<button class="final_menu_button" id="state_results_button" disabled="disabled">Results by State</button>\t\t<button class="final_menu_button" id="overall_details_button">Overall Results Details</button>\t\t<button class="final_menu_button" id="recommended_reading_button">Further Reading</button>\t\t<button class="final_menu_button" id="play_again_button">Play Again!</button>\t</div>`;
        $("#game_window").html(j),
            $("#sort_tab").change(() => {
                if (sort_tab.value == 1) var e = k(t);
                else if (sort_tab.value == 2) e = k(i);
                else if (sort_tab.value == 3) e = k(a);
                else if (sort_tab.value >= 10 && sort_tab.value <= 19) {
                    var s = sort_tab.value - 10;
                    e = k(l[s].values);
                } else (s = sort_tab.value - 20), (e = k(o[s].values));
                $("#state_tab").html(e);
                const n = T(state_tab.value);
                $("#state_result_data_summary").html(n);
            }),
            $("#state_tab").change(() => {
                const e = T(state_tab.value);
                $("#state_result_data_summary").html(e);
            }),
            $("#overall_results_button").click(() => {
                p();
            }),
            $("#final_election_map_button").click(() => {
                h();
            }),
            $("#overall_details_button").click(() => {
                b();
            }),
            $("#recommended_reading_button").click(() => {
                w();
            }),
            $("#play_again_button").click(() => {
                y();
            });
    }

    function b() {
        S(e.election_id);
        for (var t = 0, i = 0; i < e.final_overall_results.length; i++) t += e.final_overall_results[i].popular_votes;
        let a = "";
        for (i = 0; i < e.final_overall_results.length; i++) {
            const s = E(e.final_overall_results[i].candidate);
            const n = e.candidate_json[s].fields.color_hex;
            a
                += `            <tr><td style="text-align: left;">            <span style="background-color: ${
                n
            }; color: ${
                n
            };">----</span> ${
                e.candidate_json[s].fields.first_name
            } ${
                e.candidate_json[s].fields.last_name
            }</td><td> ${
                e.final_overall_results[i].electoral_votes
            } </td><td> ${
                M(e.final_overall_results[i].popular_votes)
            } </td><td> ${
                ((e.final_overall_results[i].popular_votes / t) * 100).toFixed(e.finalPercentDigits)
            }% </td></tr>`;
        }
        let o;
        if (e.percentile != "None") {
            var l = `<p>You have done better than approximately <strong>${
                e.percentile
            }%</strong> of the games that have been played with your candidate and difficulty level.</p>`;
        } else l = "";
        if (e.historical_overall != "None") {
            o = "";
            for (i = 0; i < e.historical_overall.length; i++) {
                o
                    += `<tr><td style="text-align: left;">                <span style="background-color: ${
                    e.historical_overall[i].color_hex
                }; color: ${
                    e.historical_overall[i].color_hex
                };">----</span>${
                    e.historical_overall[i].name
                }</td><td>${
                    e.historical_overall[i].winning_pct.toFixed(2)
                }</td><td>${
                    e.historical_overall[i].electoral_votes_avg.toFixed(1)
                }</td><td>${
                    M(e.historical_overall[i].popular_votes_avg)
                }</td><td>${
                    e.historical_overall[i].popular_vote_pct_avg.toFixed(2)
                }</td><td>${
                    e.historical_overall[i].electoral_votes_min
                } - ${
                    e.historical_overall[i].electoral_votes_max
                }</td><td>${
                    M(e.historical_overall[i].popular_votes_min)
                } - ${
                    M(e.historical_overall[i].popular_votes_max)
                }</td></tr>`;
            }
            var _ = `<div id="overall_stat_details">            <h4>Historical Results - Your Candidate and Difficulty Level</h4>            <table>            <tr><th>Candidate</th>                <th>Win %</th>                <th>EV Avg.</th>                <th>PV Avg.</th>                <th>PV % Avg.</th>                <th>EV Range</th>                <th>PV Range</th>            </tr>${
                o
            }</table>            </div>`;
        } else (o = ""), (_ = "");
        const currentURL = window.location.href;
        const urlParts = currentURL.split("/");
        const base_url = urlParts[2];
        if (e.game_id) {
            game_url = `http://${base_url}/games/viewGame.html#${e.game_id}`;
        } else {
            game_url = null;
        }
        let r = `<div class="game_header">${
            corrr
        }</div> <div id="main_content_area"> <div id="overall_details_container"> <h3>Overall Election Details</h3> <div id="overall_election_details"> <h4>Results - This Game</h4> <table> <tbody> <tr> <th>Candidate</th> <th>Electoral Votes</th> <th>Popular Votes</th> <th>Popular Vote %</th> </tr>${
            a
        }</table>${
            l
        }</div> <div id="overall_election_details"> <h4>Results - Historical</h4> <table> <tbody> <tr> <th>Candidate</th> <th>Electoral Votes</th> <th>Popular Votes</th> <th>Popular Vote %</th> </tr>`;

        for (let i = 0; i < HistName.length; i++) {
            r += `<tr> <td style="text-align: left;"><span style="background-color:${
                HistHexcolour[i]
            }; color:${
                HistHexcolour[i]
            };">----</span>${
                HistName[i]
            }</td> <td>${
                HistEV[i]
            }</td> <td>${
                HistPV[i]
            }</td> <td>${
                HistPVP[i]
            }</td> </tr>`;
        }

        r += `</tbody> </table><p><b><a style="font-size:15px;" href="${
            game_url
        }">GAME LINK</a><br> <button id="ExportFileButton" onclick="exportResults()" style="position: absolute; margin-top:10px;margin-left:-70px;">Export Game as File</button></b></p><br><br /> <br /></div></div><div id="map_footer"><button class="final_menu_button" id="overall_results_button">Final Election Results</button><button class="final_menu_button" id="final_election_map_button">Election Map</button><button class="final_menu_button" id="state_results_button">Results by State</button><button class="final_menu_button" id="overall_details_button" disabled="disabled">Overall Results Details</button><button class="final_menu_button" id="recommended_reading_button">Further Reading</button><button class="final_menu_button" id="play_again_button">Play Again!</button></div> </div> </div> </div>`;
        $("#game_window").html(r),
            $("#overall_results_button").click(() => {
                p();
            }),
            $("#final_election_map_button").click(() => {
                h();
            }),
            $("#state_results_button").click(() => {
                g();
            }),
            $("#recommended_reading_button").click(() => {
                w();
            }),
            $("#play_again_button").click(() => {
                y();
            });
    }

    function w() {
        var t = S(e.election_id);
        if (RecReading != true && modded == true) {
            // if is modded and has no recommended reading
            var t = S(e.election_id);
            var i = `        <div class="game_header">            ${
                corrr
            }        </div>        <div id="main_content_area_reading">            <h3 class="results_tab_header">Further Reading</h3>        <p>This election has no further reading.</p>           </div>        <div id="map_footer" style="margin-top:-35px">                <button class="final_menu_button" id="overall_results_button">                    Final Election Results                </button>                <button class="final_menu_button" id="final_election_map_button">                    Election Map                </button>                <button class="final_menu_button" id="state_results_button">                    Results by State                </button>                <button class="final_menu_button" id="overall_details_button">                    Overall Results Details                </button> <button class="final_menu_button" id="recommended_reading_button" disabled="disabled"> Further Reading    </button>          <button class="final_menu_button" id="play_again_button">                    Play Again!                </button>            </div>`;
        } else if (modded == true) {
            // is modded and has further reading
            var t = S(e.election_id);
            var i = `        <div class="game_header">            ${
                corrr
            }        </div>        <div id="main_content_area_reading">            <h3 class="results_tab_header">Further Reading</h3>        <p>Are you interested in exploring the ${
                e.election_json[0].fields.year
            } election further?         This page contains some further reading to get you up to speed.</p>        <div id="recommended_reading_box">${
                e.election_json[t].fields.recommended_reading
            }</div>        </div>        <div id="map_footer" style="margin-top:-35px">                <button class="final_menu_button" id="overall_results_button">                    Final Election Results                </button>                <button class="final_menu_button" id="final_election_map_button">                    Election Map                </button>                <button class="final_menu_button" id="state_results_button">                    Results by State                </button>                <button class="final_menu_button" id="overall_details_button">                    Overall Results Details                </button> <button class="final_menu_button" id="recommended_reading_button" disabled="disabled"> Further Reading    </button>                                <button class="final_menu_button" id="play_again_button">                    Play Again!                </button>            </div>`;
        } // is base game
        else {
            var t = S(e.election_id);
            var i = `        <div class="game_header">            ${
                corrr
            }        </div>        <div id="main_content_area_reading">            <h3 class="results_tab_header">Further Reading</h3>        <p>Are you interested in exploring the ${
                e.election_json[t].fields.year
            } election further?         This page contains some further reading to get you up to speed.</p>        <div id="recommended_reading_box">${
                e.election_json[t].fields.recommended_reading
            }</div>        </div>        <div id="map_footer" style="margin-top:-35px">                <button class="final_menu_button" id="overall_results_button">                    Final Election Results                </button>                <button class="final_menu_button" id="final_election_map_button">                    Election Map                </button>                <button class="final_menu_button" id="state_results_button">                    Results by State                </button>                <button class="final_menu_button" id="overall_details_button">                    Overall Results Details                </button> <button class="final_menu_button" id="recommended_reading_button" disabled="disabled"> Further Reading    </button>                            <button class="final_menu_button" id="play_again_button">                    Play Again!                </button>            </div>`;
        }

        $("#game_window").html(i),
            $("#overall_results_button").click(() => {
                p();
            }),
            $("#final_election_map_button").click(() => {
                h();
            }),
            $("#state_results_button").click(() => {
                g();
            }),
            $("#overall_details_button").click(() => {
                b();
            }),
            $("#play_again_button").click(() => {
                y();
            });
    }

    function y() {
        const t = S(e.election_id);
        $("#game_window").append(
            `        <div class="overlay" id="new_game_overlay"></div>        <div class="overlay_window" id="new_game_window">            <div class="overlay_window_content" id="election_night_content">            <h3>Advisor Feedback</h3>            <img src="${
                e.election_json[t].fields.advisor_url
            }" width="208" height="128"/><p>            Are you sure you want to begin a new game?            </p></div>            <div class="overlay_buttons" id="new_game_buttons">            <button id="new_game_button">Yes</button><br>            <button id="cancel_button">No</button>            </div>        </div>`,
        ),
            $("#new_game_button").click(() => {
                if (modded) {
                    const hotload = e.hotload ? e.hotload : $("#modSelect")[0].value;
                    if (hotload != "other") {
                        window.localStorage.setItem("hotload", hotload);
                    }
                }
                window.location.href = window.location.href;
            }),
            $("#cancel_button").click(() => {
                $("#new_game_overlay").remove(), $("#new_game_window").remove();
            });
    }

    function k(e) {
        for (var t = "", i = 0; i < e.length; i++) t += `<option value="${e[i].state}">${e[i].name}</option>`;
        return t;
    }

    function T(t) {
        for (
            var i = "        <h4>Results - This Game</h4>        <table>\t    <tr><th>Candidate</th><th>Popular Votes</th>\t    <th>Popular Vote %</th><th>Electoral Votes</th></tr>",
                a = 0;
            a < e.final_state_results.length;
            a++
        ) {
            if (e.final_state_results[a].state == t) {
                for (let s = 0; s < e.final_state_results[a].result.length; s++) {
                    const n = E(e.final_state_results[a].result[s].candidate);
                    i
                        += `                    <tr><td>${
                        e.candidate_json[n].fields.first_name
                    } ${
                        e.candidate_json[n].fields.last_name
                    }</td><td>${
                        M(e.final_state_results[a].result[s].votes)
                    }</td><td>${
                        (100 * e.final_state_results[a].result[s].percent).toFixed(e.statePercentDigits)
                    }</td><td>${
                        e.final_state_results[a].result[s].electoral_votes
                    }</td></tr>`;
                }
            }
        }
        return (i += "</table>");
    }

    function A(t) {
        let i = [e.candidate_id, ...e.opponents_list];
        i = [...new Set(i.filter((x) => Number(x)))];
        let r;

        const s = i.map((candidate) => {
            const n = e.player_answers.reduce((acc, answer) => {
                const score = e.answer_score_global_json.find(
                    (item) => item.fields.answer === answer
                        && item.fields.candidate === e.candidate_id
                        && item.fields.affected_candidate === candidate,
                );
                if (score) {
                    acc.push(score.fields.global_multiplier);
                }
                x;
                return acc;
            }, []);

            const l = n.reduce((acc, score) => acc + score, 0);
            const o = candidate === e.candidate_id && l < -0.4 ? 0.6 : 1 + l;
            const c = candidate === e.candidate_id
                ? o
                * (1
                    + F(candidate)
                    * e.global_parameter_json[0].fields.global_variance)
                * e.difficulty_level_multiplier
                : o
                * (1
                    + F(candidate) * e.global_parameter_json[0].fields.global_variance);
            const _ = isNaN(c) ? 1 : c;

            return {
                candidate,
                global_multiplier: _,
            };
        });

        const u = i.map((candidate) => {
            const v = e.candidate_issue_score_json
                .filter((item) => item.fields.candidate === candidate)
                .map((item) => ({
                    issue: item.fields.issue,
                    issue_score: item.fields.issue_score,
                }));

            return {
                candidate_id: candidate,
                issue_scores: removeIssueDuplicates(v),
            };
        });

        const f = [];
        for (a = 0; a < i.length; a++) {
            const m = [];
            for (r = 0; r < e.candidate_state_multiplier_json.length; r++) {
                if (e.candidate_state_multiplier_json[r].fields.candidate == i[a]) {
                    const p = e.candidate_state_multiplier_json[r].fields.state_multiplier
                        * s[a].global_multiplier
                        * (1
                            + F(e.candidate_state_multiplier_json[r].fields.candidate)
                            * e.global_parameter_json[0].fields.global_variance);
                    if (
                        (m.push({
                            state: e.candidate_state_multiplier_json[r].fields.state,
                            state_multiplier: p,
                        }),
                        m.length == e.states_json.length)
                    ) break;
                    P(m, "state");
                }
            }
            f.push({
                candidate_id: i[a],
                state_multipliers: m,
            });
        }
        for (a = 0; a < u[0].issue_scores.length; a++) {
            let h = -1;
            for (r = 0; r < e.running_mate_issue_score_json.length; r++) {
                if (
                    e.running_mate_issue_score_json[r].fields.issue
                    == u[0].issue_scores[a].issue
                ) {
                    h = r;
                    break;
                }
            }
            let g = 0;
            let b = 0;
            for (r = 0; r < e.player_answers.length; r++) {
                for (d = 0; d < e.answer_score_issue_json.length; d++) {
                    e.answer_score_issue_json[d].fields.issue
                    == u[0].issue_scores[a].issue
                    && e.answer_score_issue_json[d].fields.answer == e.player_answers[r]
                    && ((g
                        += e.answer_score_issue_json[d].fields.issue_score
                        * e.answer_score_issue_json[d].fields.issue_importance),
                        (b += e.answer_score_issue_json[d].fields.issue_importance));
                }
            }
            u[0].issue_scores[a].issue_score = (u[0].issue_scores[a].issue_score
                    * e.global_parameter_json[0].fields.candidate_issue_weight
                    + e.running_mate_issue_score_json[h].fields.issue_score
                    * e.global_parameter_json[0].fields.running_mate_issue_weight
                    + g)
                / (e.global_parameter_json[0].fields.candidate_issue_weight
                    + e.global_parameter_json[0].fields.running_mate_issue_weight
                    + b);
        }
        for (a = 0; a < i.length; a++) {
            for (r = 0; r < f[a].state_multipliers.length; r++) {
                let w = 0;
                for (d = 0; d < e.player_answers.length; d++) {
                    for (var j = 0; j < e.answer_score_state_json.length; j++) {
                        e.answer_score_state_json[j].fields.state
                        == f[a].state_multipliers[r].state
                        && e.answer_score_state_json[j].fields.answer
                        == e.player_answers[d]
                        && e.answer_score_state_json[j].fields.candidate == e.candidate_id
                        && e.answer_score_state_json[j].fields.affected_candidate == i[a]
                        && (w += e.answer_score_state_json[j].fields.state_multiplier);
                    }
                }
                if (a == 0) {
                    e.running_mate_state_id == f[a].state_multipliers[r].state
                    && (w += 0.004 * f[a].state_multipliers[r].state_multiplier);
                    for (d = 0; d < e.player_visits.length; d++) {
                        e.player_visits[d] == f[a].state_multipliers[r].state
                        && (w
                            += 0.005
                            * Math.max(0.1, f[a].state_multipliers[r].state_multiplier)
                            * (e.shining_data.visit_multiplier ?? 1));
                    }
                }
                f[a].state_multipliers[r].state_multiplier += w;
            }
        }
        const y = [];
        for (a = 0; a < f[0].state_multipliers.length; a++) {
            const k = [];
            for (r = 0; r < i.length; r++) {
                let $ = 0;
                for (d = 0; d < u[r].issue_scores.length; d++) {
                    let T = 0;
                    let A = 1;
                    for (j = 0; j < e.state_issue_score_json.length; j++) {
                        if (
                            e.state_issue_score_json[j].fields.state
                            == f[0].state_multipliers[a].state
                            && e.state_issue_score_json[j].fields.issue
                            == u[0].issue_scores[d].issue
                        ) {
                            (T = e.state_issue_score_json[j].fields.state_issue_score),
                                (A = e.state_issue_score_json[j].fields.weight);
                            break;
                        }
                    }
                    const S = u[r].issue_scores[d].issue_score
                        * Math.abs(u[r].issue_scores[d].issue_score);
                    const E = T * Math.abs(T);
                    $
                        += e.global_parameter_json[0].fields.vote_variable
                        - Math.abs((S - E) * A);
                }
                for (d = 0; d < f[r].state_multipliers.length; d++) {
                    if (
                        f[r].state_multipliers[d].state == f[0].state_multipliers[a].state
                    ) var C = d;
                }

                if (DEBUG) {
                    console.log(
                        `From key ${r} into f, trying to get state multiplier index ${C}`,
                    );
                    console.log(f[r].state_multipliers[C]);
                }

                ($ *= f[r].state_multipliers[C].state_multiplier),
                    ($ = Math.max($, 0)),
                    k.push({
                        candidate: i[r],
                        result: $,
                    });
            }
            y.push({
                state: f[0].state_multipliers[a].state,
                result: k,
            });
        }
        for (a = 0; a < y.length; a++) {
            for (r = 0; r < e.states_json.length; r++) {
                if (y[a].state == e.states_json[r].pk) {
                    y[a].abbr = e.states_json[r].fields.abbr;
                    break;
                }
            }
        }
        for (a = 0; a < y.length; a++) {
            var M = 0;
            for (r = 0; r < e.states_json.length; r++) {
                if (e.states_json[r].pk == y[a].state) {
                    M = Math.floor(
                        e.states_json[r].fields.popular_votes
                        * (0.95 + 0.1 * Math.random()),
                    );
                    break;
                }
            }
            var x = 0;
            for (r = 0; r < y[a].result.length; r++) x += y[a].result[r].result;
            for (r = 0; r < y[a].result.length; r++) {
                var N = y[a].result[r].result / x;
                (y[a].result[r].percent = N),
                    (y[a].result[r].votes = Math.floor(N * M));
            }
        }
        for (a = 0; a < y.length; a++) {
            const I = R(y[a].state);
            let O = 0;
            if (
                (P(y[a].result, "percent"),
                    y[a].result.reverse(),
                    (O = e.states_json[I].fields.electoral_votes),
                e.game_type_id == "1" || e.game_type_id == "3")
            ) {
                if (e.states_json[I].fields.winner_take_all_flg == 1) for (r = 0; r < y[a].result.length; r++) y[a].result[r].electoral_votes = r == 0 ? O : 0;
                else {
                    O = e.states_json[I].fields.electoral_votes;
                    let H = 0;
                    for (r = 0; r < y[a].result.length; r++) H += y[a].result[r].votes;
                    const L = Math.ceil((y[a].result[0].votes / H) * O * 1.25);
                    const D = O - L;
                    for (r = 0; r < y[a].result.length; r++) y[a].result[r].electoral_votes = r == 0 ? L : r == 1 ? D : 0;
                }
            }
            if (e.game_type_id == "2") {
                const V = [];
                for (r = 0; r < y[a].result.length; r++) V.push(y[a].result[r].percent);
                const q = divideElectoralVotesProp(V, O);
                for (r = 0; r < y[a].result.length; r++) y[a].result[r].electoral_votes = q[r];
            }
        }

        if (e.primary_states) {
            const primaryStates = JSON.parse(e.primary_states);
            // Create a new copy of the primary states array using Array.slice()
            const primM = primaryStates.slice().map((f) => f.state);

            // Update the y array using the new copy of the primary states array
            for (let i = 0; i < y.length; i++) {
                if (primM.includes(y[i].state)) {
                    const indexOfed = primM.findIndex((state) => state === y[i].state);
                    y[i].result = primaryStates[indexOfed].result;
                }
            }
        }

        if (t == 1) return y;
        if (t == 2) {
            for (a = 0; a < y.length; a++) {
                for (r = 0; r < y[a].result.length; r++) {
                    const G = 1
                        + F(y[a].result[r].candidate)
                        * e.global_parameter_json[0].fields.global_variance;
                    y[a].result[r].result *= G;
                }
                for (M = 0, r = 0; r < e.states_json.length; r++) {
                    if (e.states_json[r].pk == y[a].state) {
                        M = Math.floor(
                            e.states_json[r].fields.popular_votes
                            * (0.95 + 0.1 * Math.random()),
                        );
                        break;
                    }
                }
                for (x = 0, r = 0; r < y[a].result.length; r++) x += y[a].result[r].result;
                for (r = 0; r < y[a].result.length; r++) {
                    N = y[a].result[r].result / x;
                    (y[a].result[r].percent = N),
                        (y[a].result[r].votes = Math.floor(N * M));
                }
            }

            return y;
        }
    }

    function S(t) {
        for (var i = -1, a = 0; a < e.election_json.length; a++) {
            if (e.election_json[a].pk == t) {
                i = a;
                break;
            }
        }
        return i;
    }

    function E(t) {
        for (var i = -1, a = 0; a < e.candidate_json.length; a++) {
            if (e.candidate_json[a].pk == t) {
                i = a;
                break;
            }
        }
        return i;
    }

    function R(t) {
        for (var i = -1, a = 0; a < e.states_json.length; a++) {
            if (e.states_json[a].pk == t) {
                i = a;
                break;
            }
        }
        return i;
    }

    function C(t) {
        const i = S(t);
        const a = `    <div class="overlay" id="feedback_overlay"></div>    <div class="overlay_window" id="feedback_window">        <div class="overlay_window_content" id="feedback_content">        <h3>Advisor Feedback</h3>        <img src="${
            e.election_json[i].fields.advisor_url
        }" width="208" height="128"/>        <p>${e.SelAnsContText}</p>        </div>        <div id="visit_buttons">        <button id="ok_button">OK</button><br>        </div>    </div>`;
        $("#game_window").append(a),
            $("#ok_button").click(() => {
                $("#feedback_overlay").remove(), $("#feedback_window").remove();
            });
    }

    function P(e, t) {
        return e.sort((e, i) => {
            const a = e[t];
            const s = i[t];
            return a < s ? -1 : a > s ? 1 : 0;
        });
    }

    function M(e) {
        const t = e.toString().split(".");
        return (t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")), t.join(".");
    }

    vpSelect = (t) => {
        const candidate_id = document.getElementById("candidate_id");
        t.preventDefault(),
            (function (t, a) {
                e.candidate_id = Number(a);
                for (var n = "", l = 0; l < e.running_mate_json.length; l++) {
                    if (e.running_mate_json[l].fields.candidate == a) {
                        const o = e.running_mate_json[l].fields.running_mate;
                        let _ = -1;
                        for (j = 0; j < e.candidate_json.length; j++) {
                            if (o == e.candidate_json[j].pk) {
                                _ = j;
                                break;
                            }
                        }
                        n
                            += `<option value=${
                            e.candidate_json[_].pk
                        }>${
                            e.candidate_json[_].fields.first_name
                        } ${
                            e.candidate_json[_].fields.last_name
                        }</option>`;
                    }
                }
                const r = `        <div class="game_header">        ${
                    corrr
                }        </div>        <div class="inner_window_w_desc" id="inner_window_4">            <div id="running_mate_form">            <form name="running mate">            <p><h3>${e.VpText}</h3>            <select name="running_mate_id" id="running_mate_id">${
                    n
                }</select>            </p>            </form>            </div>            <div class="person_description_window" id="running_mate_description_window">            </div>        <p><button class="person_button" id="running_mate_id_back">Back</button> <button class="person_button" id="running_mate_id_button">Continue</button>        </p>        </div>`;
                $("#game_window").html(r),
                    $("#running_mate_id").ready(() => {
                        i();
                    }),
                    $("#running_mate_id").change(() => {
                        i();
                    }),
                    $("#running_mate_id_button").click((e) => {
                        e.preventDefault(),
                            s(campaignTrail_temp.election_id, a, running_mate_id.value);
                    }),
                    $("#running_mate_id_back").click(candSel);
            }(a, candidate_id ? candidate_id.value : e.candidate_id));
    };

    candSel = (a) => {
        a.preventDefault(),
            (function (a) {
                if (!modded) e.shining = e.shining_info.map((f) => f.pk).includes(a);

                for (var n = "", l = 0; l < e.candidate_json.length; l++) {
                    e.candidate_json[l].fields.election == a
                    && e.candidate_json[l].fields.is_active == 1
                    && (n
                        += `<option value=${
                        e.candidate_json[l].pk
                    }>${
                        e.candidate_json[l].fields.first_name
                    } ${
                        e.candidate_json[l].fields.last_name
                    }</option>`);
                }
                const o = `<div class="game_header">        ${
                    corrr
                }    </div>    <div class="inner_window_w_desc" id="inner_window_3">        <div id="candidate_form">        <form name="candidate">            <p>            <h3>${e.CandidText}</h3>            <select name="candidate_id" id="candidate_id">${
                    n
                }</select>            </p>        </form>        </div>        <div class="person_description_window" id="candidate_description_window">        </div>        <p><button class="person_button" id="candidate_id_back">Back</button> <button class="person_button" id="candidate_id_button">Continue</button>        </p>    </div>`;
                $("#game_window").html(o),
                    $("#candidate_id").ready(() => {
                        t();
                    }),
                    $("#candidate_id").change(() => {
                        t();
                    }),
                    $("#candidate_id_button").click(vpSelect),
                    $("#candidate_id_back").click(gameStart);
            }(e.election_id ? e.election_id : election_id.value));
    };

    gameStart = (a) => {
        a.preventDefault(),
            (function () {
                $("#modloaddiv")[0].style.display = "none";
                $("#modLoadReveal")[0].style.display = "none";
                document.getElementById("featured-mods-area").style.display = "none";
                for (var a = "", n = 0; n < e.temp_election_list.length; n++) {
                    e.temp_election_list[n].is_premium == 0
                        ? (a
                            += `<option value=${
                            e.temp_election_list[n].id
                        }>${
                            e.temp_election_list[n].display_year
                        }</option>`)
                        : e.show_premium == 1
                            ? (a
                                += `<option value=${
                                e.temp_election_list[n].id
                            }>${
                                e.temp_election_list[n].display_year
                            }</option>`)
                            : (a
                                += `<option value=${
                                e.temp_election_list[n].id
                            } disabled>${
                                e.temp_election_list[n].display_year
                            }</option>`);
                }
                e.election_id = e.election_id ? e.election_id : e.election_json[0].pk;
                const inX = S(e.election_id);
                const l = `<div class="game_header">            ${
                    corrr
                }        </div>        <div class="inner_window_w_desc" id="inner_window_2">            <div id="election_year_form">            <form name="election_year">            <p>                <h3>${e.SelectText}</h3>    \t\t    <select name="election_id" id="election_id">${
                    a
                }</select>            </p>            </form>            <div class="election_description_window" id="election_description_window">                <div id="election_image">                    <img src="${
                    e.election_json[inX].fields.image_url
                }" width="300" height="160"/>                </div>                <div id="election_summary">${
                    e.election_json[inX].fields.summary
                }</div>            </div>        </div>        <p><button id="election_id_button">Continue</button></p> <p id="credits">This scenario was made by ${
                    e.credits
                }.</p>`;
                $("#game_window").html(l);
                $("#election_id")[0].value = e.election_id;
                $("#election_id").change(() => {
                    for (var t = -1, i = 0; i < e.election_json.length; i++) {
                        if (e.election_json[i].pk == election_id.value) {
                            t = i;
                            e.election_id = e.election_json[i].pk;
                            break;
                        }
                    }
                    $("#election_description_window").html(
                        `<div id="election_image">            <img src="${
                            e.election_json[t].fields.image_url
                        }" width="300" height="160"/>            </div>            <div id="election_summary">${
                            e.election_json[t].fields.summary
                        }</div>`,
                    );
                }),
                    $("#election_id_button").click(candSel);
            }());
    };

    $("#game_start").click(gameStart),
        $("#skip_to_final").click((t) => {
            (e.final_state_results = A(1)), electionNight();
        });
}());

const fix1964Observer = new MutationObserver(() => {
    const electionSelect = document.getElementById("election_id");
    if (electionSelect) {
        fix1964Observer.disconnect();

        const fix1964 = () => {
            const electionId = parseInt(electionSelect.value, 10);
            const credits = document.getElementById("credits");
            if (electionId === 69) {
                credits.innerHTML = "This scenario was made by Tex.";
            } else if (electionId > -1 && !modded) {
                credits.innerHTML = "This scenario was made by Dan Bryan.";
            }
        };
        electionSelect.addEventListener("change", fix1964);
        fix1964();
    }
});

fix1964Observer.observe(document.body, {
    childList: true,
    subtree: true,
});
