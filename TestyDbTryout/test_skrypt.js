﻿//window.addEventListener('DOMContentLoaded', function () {
//    alert("DMContentLoaded");
//});
var xmlhttp = new XMLHttpRequest();
var quest;
var y = 0; // ilość pytań
var z = 0; //zmienna do iteracji nazw opcji wyboru
var plyr_ctr = 1;
var num_pyt = y + 1;
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var alpha_ctr;
var subQst;
var teraz = new Date();
var myObj;
var odtwarzacz;
//var np;
//var ev;
var readAmount = 0;
var vocabularyAmount = 0;
var listenAmount = 0;
var grammarAmount = 0;
var testTime;
var display;
var iloscZadan = 0;
var czas_testu;
var kryteria_pyt;
var hrs;
var mins;
var secs;
var dbStoppageTime;
var dbUserName;
var dbFinished;
var dbTestID;
var dbAudiosStarted;
var myInterval1, myInterval2;
var wal;




xmlhttp.onreadystatechange = function() {
    //alert("onreadystatechange");
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);

        var x = ""; //treść #demo
        var tbl_rslts1 = ""; //treść tabeli z wynikami


        var hrs = myObj.test.Time.substr(0, 2);
        var mins = myObj.test.Time.substr(3, 2);
        var secs = myObj.test.Time.substr(6, 2);






        document.getElementById("revealDate").value = myObj.test.RevealDetailedResultsDateTime;
        var start = Date.now();
        var diff;
        var duration;
        var dropzonecounter = 0;
        var sourcezonecounter = 0;
        var draggablescounter = 0;

        var flag_grammar = false;
        var flag_vocabulary = false;
        var flag_listening = false;
        var flag_reading = false;
        var flag_writing = false;
        var kryteria_pyt;


        //for (i = 0; i++; i < myObj.test.questions.length)
        //{
        //    switch ((myObj.test.questions[i].skill).toLowerCase())
        //    {
        //        case "reading":
        //            readAmount++;

        //        case "writing":
        //            writeAmount++;

        //        case "listening":
        //            listenAmount++;

        //        case "grammar":
        //            grammarAmount++;

        //    }
        //}

        // document.getElementById("fixer").innerHTML = hrs + ":" + mins + ":" + secs + "</br> czyli " + sekundowosc + " sekund";
        var singleApostrophyReplacement = function(textToBeReplaced) {
            replacedText = (textToBeReplaced).replace(/'/gi, "&#39;");
            return replacedText;
        };

        //correction of apostrophies in examples' values' 
        var examplesValuesApostrophyCorrection = function(textToBeReplaced) {
            replacedText2 = (textToBeReplaced).replace(/value='(\w*'s)'|value='(\w*[\. \w]*'[s]*)'|value='('\w*[\. \w]*[s]*)'/g, "value=\"$1$2$3\"");
            //console.log(replacedText2);
            return replacedText2;
        };

        // accords beginning
        x += "<div class='panel-group' id='accordion'>"; //accords beginning
        // accords beginning

        //sprawdzenie czy kolejność pytan ma być zgodnie z json
        if (myObj.test.random == false) {
            // <!-- wypisanie pytan -->

            for (y in myObj.test.questions) {
                // <!-- jeśli to pierwsze pytanie wogóle -->
                if (y == 0) {

                    if ((myObj.test.questions[y].skill.toLowerCase() === "grammar") && (myObj.test.questions[y].task != null)) {

                        // accords
                        x += "<div class='panel panel-default'>";
                        x += "<div class='panel-heading'>";
                        x += "<h4 class='panel-title'>";
                        x += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse-grammar'>";
                        // accords

                        //var rpl_example = (myObj.test.questions[y].example).replace(/"/gi, "\"");
                        x += "<div type='button' data-parent='#accordion' id='sec-gram' class='section grammar-section'>GRAMMAR SECTION</div>";

                        // accords
                        x += "</a>";
                        x += "</h4>";
                        x += "</div>";
                        x += "<div id='collapse-grammar' class='panel-collapse collapse fade show'>";
                        x += "<div class='panel-body'>";
                        // accords


                        x += "<div class='task'>" + myObj.test.questions[y].task + "</div><div class='example'>" + examplesValuesApostrophyCorrection(myObj.test.questions[y].example) + "</div>";
                        flag_grammar = true;
                    } else
                    if ((myObj.test.questions[y].skill.toLowerCase() === "vocabulary") && (myObj.test.questions[y].task != null)) {

                        // accords
                        x += "<div class='panel panel-default'>";
                        x += "<div class='panel-heading'>";
                        x += "<h4 class='panel-title'>";
                        x += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse-vocabulary'>";
                        // accords

                        x += "<div  type='button' data-parent='#accordion' class='section vocabulary-section'>VOCABULARY SECTION</div>";

                        // accords
                        x += "</a>";
                        x += "</h4>";
                        x += "</div>";
                        x += "<div id='collapse-vocabulary' class='panel-collapse collapse fade'>";
                        x += "<div class='panel-body'>";
                        // accords

                        x += "<div class='task'>" + myObj.test.questions[y].task + "</div><div class='example'>" + examplesValuesApostrophyCorrection(myObj.test.questions[y].example) + "</div>";
                        flag_vocabulary = true;
                    } else if (myObj.test.questions[y].skill.toLowerCase() === "reading") {

                        // accords
                        x += "<div class='panel panel-default'>";
                        x += "<div class='panel-heading'>";
                        x += "<h4 class='panel-title'>";
                        x += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse-reading'>";
                        // accords

                        x += "<div type='button'  data-parent='#accordion' class='section reading-section'>READING SECTION</div>";

                        // accords
                        x += "</a>";
                        x += "</h4>";
                        x += "</div>";
                        x += "<div id='collapse-reading' class='panel-collapse collapse fade'>";
                        x += "<div class='panel-body'>";
                        // accords

                        // if (myObj.test.questions[y].task) {
                        //     x += "<div class='task'>" + myObj.test.questions[y].task + "</div>";
                        // }
                        flag_reading = true;
                    } else if (myObj.test.questions[y].skill.toLowerCase() === "writing") {

                        // accords
                        x += "<div class='panel panel-default'>";
                        x += "<div class='panel-heading'>";
                        x += "<h4 class='panel-title'>";
                        x += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse-writing'>";
                        // accords

                        x += "<div  type='button' data-parent='#accordion' class='section writing-section'>WRITING SECTION</div>";

                        // accords
                        x += "</a>";
                        x += "</h4>";
                        x += "</div>";
                        x += "<div id='collapse-writing' class='panel-collapse collapse fade'>";
                        x += "<div class='panel-body'>";
                        // accords

                        if (myObj.test.questions[y].task) {
                            x += "<div class='task'>" + myObj.test.questions[y].task + "</div>";
                        }
                        flag_writing = true;
                    } else if (myObj.test.questions[y].skill.toLowerCase() === "listening") {

                        // accords
                        x += "<div class='panel panel-default'>";
                        x += "<div class='panel-heading'>";
                        x += "<h4 class='panel-title'>";
                        x += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse-listening'>";
                        // accords

                        x += "<div  type='button' data-parent='#accordion' class='section listening-section'>LISTENING SECTION</div>";

                        // accords
                        x += "</a>";
                        x += "</h4>";
                        x += "</div>";
                        x += "<div id='collapse-listening' class='panel-collapse collapse fade'>";
                        x += "<div class='panel-body'>";
                        // accords

                        if (myObj.test.questions[y].task) {
                            x += "<div class='task'>" + myObj.test.questions[y].task + "</div>";
                        }
                        flag_listening = true;
                    }

                    function criteria_modifier(crit_mod) {
                        myObj.test.questions[y].criteria = (crit_mod).replace(/\'/g, "&#39;");
                        //return myObj.test.questions[y].criteria;
                    }

                    if ((myObj.test.questions[y].criteria != undefined) || (myObj.test.questions[y].criteria != null)) {
                        criteria_modifier(myObj.test.questions[y].criteria);
                    }

                    x += "<div class='parent' id='parent" + num_pyt + "'><div id='pyt" + num_pyt + "' data-criteria='" + myObj.test.questions[y].criteria + "'>" + num_pyt + ". " + myObj.test.questions[y].question + "</div>";


                    tbl_rslts1 += "<table class='results table table-hover table-sm' id='results0'>" +
                        "<thead>" +
                        "<tr>" +
                        "<th>Nr zadania</th>" +
                        "<th>Dział</th>" +
                        "<th>Treść zadania</th>" +
                        "<th class='corrects'>Poprawne odpowiedzi</th>" +
                        "<th>Twoje odpowiedzi</th>" +
                        "<th>Ilość zdobytych punktów</th>" +
                        "<th>Maks. ilość pkt.</th>" +
                        "</tr>" +
                        "</thead>" +
                        "<tfoot>" +
                        "<tr id='tableListeningTotalRow'>" +
                        "<td colspan='5' class='res_titles'>Listening</td>" +
                        "<td class='personal_total' id='listening_total'>0</td>" +
                        "<td class='max_total' id='listening_max_total'></td>" +
                        "</tr>" +
                        "<tr id='tableVocabularyTotalRow'>" +
                        "<td colspan='5' class='res_titles'>Vocabulary</td>" +
                        "<td class='personal_total' id='vocabulary_total'>0</td>" +
                        "<td class='max_total' id='vocabulary_max_total'></td>" +
                        "</tr>" +
                        "<tr id = 'tableGrammarTotalRow'>" +
                        "<td colspan='5' class='res_titles'>Grammar</td>" +
                        "<td class='personal_total' id='grammar_total'>0</td>" +
                        "<td class='max_total' id='grammar_max_total'></td>" +
                        "</tr>" +
                        "<tr id='tableReadingTotalRow'>" +
                        "<td colspan='5' class='res_titles'>Reading</td>" +
                        "<td class='personal_total' id='reading_total'>0</td>" +
                        "<td class='max_total' id='reading_max_total'></td>" +
                        "</tr>" +
                        "<tr>" +
                        "<td colspan='5' class='total_total'>Totals</td>" +
                        "<td id='personal_total'>0</td>" +
                        "<td id='total_max_total'>0</td>" +
                        "</tr>" +
                        "</tfoot>" +
                        "<tbody>";
                }
                // <!-- jeśli to każde następne pytanie -->
                else {
                    if ((myObj.test.questions[y].skill.toLowerCase() === "grammar") && (flag_grammar === false) && (myObj.test.questions[y].task != null)) {
                        var rpl_example = (myObj.test.questions[y].example).replace(/"/gi, "\"").replace(/'/gi, "sss");

                        // accords
                        x += "</div>";
                        x += "</div>";
                        x += "</div>";
                        // accords

                        // accords
                        x += "<div class='panel panel-default'>";
                        x += "<div class='panel-heading'>";
                        x += "<h4 class='panel-title'>";
                        x += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse-grammar'>";
                        // accords

                        x += "<div  type='button' data-parent='#accordion' class='section grammar-section'>GRAMMAR SECTION</div>";

                        // accords
                        x += "</a>";
                        x += "</h4>";
                        x += "</div>";
                        x += "<div id='collapse-grammar' class='panel-collapse collapse fade'>";
                        x += "<div class='panel-body'>";
                        // accords

                        x += "<div class='task'>" + myObj.test.questions[y].task + "</div><div class='example'>" + examplesValuesApostrophyCorrection(myObj.test.questions[y].example) + "</div>";
                        flag_grammar = true;
                    } else if ((myObj.test.questions[y].skill.toLowerCase() === "vocabulary") && (flag_vocabulary === false) && (myObj.test.questions[y].task != null)) {

                        // accords
                        x += "</div>";
                        x += "</div>";
                        x += "</div>";
                        // accords

                        // accords
                        x += "<div class='panel panel-default'>";
                        x += "<div class='panel-heading'>";
                        x += "<h4 class='panel-title'>";
                        x += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse-vocabulary'>";
                        // accords

                        x += "<div  type='button' data-parent='#accordion' class='section vocabulary-section'>VOCABULARY SECTION</div>";

                        // accords
                        x += "</a>";
                        x += "</h4>";
                        x += "</div>";
                        x += "<div id='collapse-vocabulary' class='panel-collapse collapse fade'>";
                        x += "<div class='panel-body'>";
                        // accords

                        x += "<div class='task'>" + myObj.test.questions[y].task + "</div><div class='example'>" + examplesValuesApostrophyCorrection(myObj.test.questions[y].example) + "</div>";
                        flag_vocabulary = true;
                    } else if ((myObj.test.questions[y].skill.toLowerCase() === "reading") && (flag_reading === false)) {

                        // accords
                        x += "</div>";
                        x += "</div>";
                        x += "</div>";
                        // accords

                        // accords
                        x += "<div class='panel panel-default'>";
                        x += "<div class='panel-heading'>";
                        x += "<h4 class='panel-title'>";
                        x += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse-reading'>";
                        // accords

                        x += "<div  type='button' data-parent='#accordion' class='section reading-section'>READING SECTION</div>";

                        // accords
                        x += "</a>";
                        x += "</h4>";
                        x += "</div>";
                        x += "<div id='collapse-reading' class='panel-collapse collapse fade'>";
                        x += "<div class='panel-body'>";
                        // accords

                        // if (myObj.test.questions[y].task) {
                        //     x += "<div class='task'>" + myObj.test.questions[y].task + "</div>";
                        // }
                        flag_reading = true;
                    } else if ((myObj.test.questions[y].skill.toLowerCase() === "writing") && (flag_writing === false)) {

                        // accords
                        x += "</div>";
                        x += "</div>";
                        x += "</div>";
                        // accords

                        // accords
                        x += "<div class='panel panel-default'>";
                        x += "<div class='panel-heading'>";
                        x += "<h4 class='panel-title'>";
                        x += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse-writing'>";
                        // accords

                        x += "<div type='button' data-parent='#accordion' class='section writing-section'>WRITING SECTION</div>";

                        // accords
                        x += "</a>";
                        x += "</h4>";
                        x += "</div>";
                        x += "<div id='collapse-writing' class='panel-collapse collapse fade'>";
                        x += "<div class='panel-body'>";
                        // accords

                        if (myObj.test.questions[y].task) {
                            x += "<div class='task'>" + myObj.test.questions[y].task + "</div>";
                        }
                        flag_writing = true;
                    } else if ((myObj.test.questions[y].skill.toLowerCase() === "listening") && (flag_listening === false)) {

                        // accords
                        x += "</div>";
                        x += "</div>";
                        x += "</div>";
                        // accords

                        // accords
                        x += "<div class='panel panel-default'>";
                        x += "<div class='panel-heading'>";
                        x += "<h4 class='panel-title'>";
                        x += "<a data-toggle='collapse' data-parent='#accordion' href='#collapse-listening'>";
                        // accords

                        x += "<div  type='button' data-parent='#accordion' class='section listening-section'>LISTENING SECTION</div>";

                        // accords
                        x += "</a>";
                        x += "</h4>";
                        x += "</div>";
                        x += "<div id='collapse-listening' class='panel-collapse collapse fade'>";
                        x += "<div class='panel-body'>";
                        // accords

                        if (myObj.test.questions[y].task) {
                            x += "<div class='task'>" + myObj.test.questions[y].task + "</div>";
                        }
                        flag_listening = true;

                    } else {

                        if (myObj.test.questions[y].skill.toLowerCase() != "reading") {
                            if (myObj.test.questions[y].task) {
                                x += "<div class='task'>" + myObj.test.questions[y].task + "</div>";
                            }
                            if (myObj.test.questions[y].example) {
                                x += "<div class='example'>" + examplesValuesApostrophyCorrection(myObj.test.questions[y].example) + "</div>";
                            }
                        }

                    }

                    if (myObj.test.questions[y].criteria) {
                        criteria_modifier(myObj.test.questions[y].criteria);
                    }

                    x += "<div  class='parent' id='parent" + num_pyt + "'> <div id='pyt" + num_pyt + "' data-criteria='" + myObj.test.questions[y].criteria + "'>" + num_pyt + ". " + myObj.test.questions[y].question + "</div>";
                    num_pyt + ". " + myObj.test.questions[y].question + "</div>";


                    //tbl_rslts1 += "<tr><td>" + num_pyt + ". </td><td>" + myObj.test.questions[y].section + "</td><td>" + myObj.test.questions[y].question + "</td>";
                    // tbl_rslts1 += "<tr><td>" + num_pyt + "</td><td>" + myObj.test.questions[y].section + "</td>";
                }
                //sprawdzenie czy sekcje dotycza gramatyki lub słownictwa - kolejność pytan zgodnie z kolejnością w pliku json
                if ((myObj.test.questions[y].section).toLowerCase() == "grammar" || (myObj.test.questions[y].section).toLowerCase() == "vocabulary") {
                    // <!-- Wypisanie wszystkich opcji do danego pytania -->
                    /* 
███╗   ██╗ ██████╗ ██████╗ ███╗   ███╗ █████╗ ██╗     
████╗  ██║██╔═══██╗██╔══██╗████╗ ████║██╔══██╗██║     
██╔██╗ ██║██║   ██║██████╔╝██╔████╔██║███████║██║     
██║╚██╗██║██║   ██║██╔══██╗██║╚██╔╝██║██╔══██║██║     
██║ ╚████║╚██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║███████╗
╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝
                                                      
██████╗  █████╗ ██████╗ ██╗ ██████╗ ███████╗          
██╔══██╗██╔══██╗██╔══██╗██║██╔═══██╗██╔════╝          
██████╔╝███████║██║  ██║██║██║   ██║███████╗          
██╔══██╗██╔══██║██║  ██║██║██║   ██║╚════██║          
██║  ██║██║  ██║██████╔╝██║╚██████╔╝███████║          
╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═╝ ╚═════╝ ╚══════╝          
                                                                          
                    */
                    //region [rgba(100,100,2,0.8)]               //normalne radia
                    // <!-- jesli prawidlowa jest tylko jedna odpowiedź -->
                    alpha_ctr = 0;
                    z = 0;
                    if ((myObj.test.questions[y].option).toLowerCase() == "radio") {
                        for (quest in myObj.test.questions[y].answers) {
                            //var singleApostrophyReplacement = (myObj.test.questions[y].answers[quest]).replace(/'/gi, "&#39;")
                            x += "<div class='custom-control custom-radio'><input class='custom-control-input' type='radio' id='radio_" + num_pyt + "_" + (z + 1) + "'name='forQuestion_" + num_pyt + "' value='" + singleApostrophyReplacement(myObj.test.questions[y].answers[quest]) + "' onchange='onRadiosChange(event," + num_pyt + ")'/><label class='custom-control-label' for='radio_" + num_pyt + "_" + (z + 1) + "'>" + alphabet[alpha_ctr] + ". " + singleApostrophyReplacement(myObj.test.questions[y].answers[quest]) + "</label></div>"; // koniec ---div class='tabler'
                            alpha_ctr++;
                            z++;
                        }

                        tbl_rslts1 += "<tr><td data-bkg='" + num_pyt + "'>" + num_pyt + "</td><td data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].skill + "</td><td data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].question + "</td><td class='corrects' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].corr + "</td>"; //początek rzędu z radiami

                        if ((myObj.test.questions[y].skill).toLowerCase() == "grammar") {
                            tbl_rslts1 += "<td id='rslts_radio_" + num_pyt + "' data-bkg='" + num_pyt + "'></td><td class='grammar' data-bkg='" + num_pyt + "'>0</td><td class='grammar_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].corr.length + "</td>";
                            grammarAmount++;
                        } else if ((myObj.test.questions[y].skill).toLowerCase() == "vocabulary") {
                            tbl_rslts1 += "<td id='rslts_radio_" + num_pyt + "' data-bkg='" + num_pyt + "'></td><td class='vocabulary' data-bkg='" + num_pyt + "'>0</td><td class='vocabulary_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].corr.length + "</td>";
                            vocabularyAmount++;
                        }
                        tbl_rslts1 += "</tr>"; //koniec rzędu z radiami
                        //endregion                              //normalne radia
                        /* 
███╗   ██╗ ██████╗ ██████╗ ███╗   ███╗ █████╗ ██╗                         
████╗  ██║██╔═══██╗██╔══██╗████╗ ████║██╔══██╗██║                         
██╔██╗ ██║██║   ██║██████╔╝██╔████╔██║███████║██║                         
██║╚██╗██║██║   ██║██╔══██╗██║╚██╔╝██║██╔══██║██║                         
██║ ╚████║╚██████╔╝██║  ██║██║ ╚═╝ ██║██║  ██║███████╗                    
╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝                    
                                                                          
 ██████╗██╗  ██╗███████╗ ██████╗██╗  ██╗██████╗  ██████╗ ██╗  ██╗
██╔════╝██║  ██║██╔════╝██╔════╝██║ ██╔╝██╔══██╗██╔═══██╗╚██╗██╔╝
██║     ███████║█████╗  ██║     █████╔╝ ██████╔╝██║   ██║ ╚███╔╝ 
██║     ██╔══██║██╔══╝  ██║     ██╔═██╗ ██╔══██╗██║   ██║ ██╔██╗ 
╚██████╗██║  ██║███████╗╚██████╗██║  ██╗██████╔╝╚██████╔╝██╔╝ ██╗
 ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═════╝  ╚═════╝ ╚═╝  ╚═╝
                                                                                                  
                        */
                        //region [rgba(80,80,125,0.5)]           //normalne checkboxy
                        iloscZadan++;
                    } else if ((myObj.test.questions[y].option).toLowerCase() == "check") {
                        z = 0;
                        tbl_rslts1 += "<tr><td data-bkg='" + num_pyt + "'>" + num_pyt + "</td><td data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].skill + "</td><td data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].question + "</td>"; //początek rzędu z checkami

                        for (quest in myObj.test.questions[y].answers) {
                            x += "<div class='custom-control custom-checkbox custom-control-inline'><input class='custom-control-input' type='checkbox' id='chbx_" + num_pyt + "_" + (z + 1) + "' name='forQuestion" + num_pyt +
                                "' value='" + singleApostrophyReplacement(myObj.test.questions[y].answers[quest]) + "' onchange='onCheckboxesChange(event," + num_pyt + "," + z + "," + myObj.test.questions[y].answers.length + ")'/><label class='custom-control-label' for='chbx_" + num_pyt + "_" + (z + 1) + "'>" + alphabet[alpha_ctr] + ". " + singleApostrophyReplacement(myObj.test.questions[y].answers[quest]) + "</label></div>"; // koniec ---div class='tabler'
                            alpha_ctr++;
                            z++;
                        }
                        var ii = 0;

                        tbl_rslts1 += "<td class='corrects' data-bkg='" + num_pyt + "'><ul>";
                        for (var corr in myObj.test.questions[y].corr) {
                            tbl_rslts1 += "<li>" + myObj.test.questions[y].corr[ii] + "</li>";
                            ii++;
                        }
                        tbl_rslts1 += "</ul></td>";
                        if ((myObj.test.questions[y].skill).toLowerCase() == "grammar") {
                            tbl_rslts1 += "<td id='rslts_check_" + num_pyt + "' data-bkg='" + num_pyt + "'></td><td class='grammar' data-bkg='" + num_pyt + "'>0</td><td class='grammar_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].corr.length + "</td>";
                            grammarAmount++;
                        } else if ((myObj.test.questions[y].skill).toLowerCase() == "vocabulary") {
                            tbl_rslts1 += "<td id='rslts_check_" + num_pyt + "' data-bkg='" + num_pyt + "'></td><td class='vocabulary' data-bkg='" + num_pyt + "'>0</td><td class='vocabulary_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].corr.length + "</td>";
                            vocabularyAmount++;
                        }
                        tbl_rslts1 += "</tr>"; //koniec rzędu z checkami
                        iloscZadan++;
                        //endregion                              //normalne checkboxy
                        /* 
 ██████╗ ██████╗  █████╗  ██████╗  ██████╗  █████╗ ██████╗ ██╗     ███████╗███████╗
 ██╔══██╗██╔══██╗██╔══██╗██╔════╝ ██╔════╝ ██╔══██╗██╔══██╗██║     ██╔════╝██╔════╝
 ██║  ██║██████╔╝███████║██║  ███╗██║  ███╗███████║██████╔╝██║     █████╗  ███████╗
 ██║  ██║██╔══██╗██╔══██║██║   ██║██║   ██║██╔══██║██╔══██╗██║     ██╔══╝  ╚════██║
 ██████╔╝██║  ██║██║  ██║╚██████╔╝╚██████╔╝██║  ██║██████╔╝███████╗███████╗███████║
 ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚══════╝╚══════╝
                                                                                   
                        */
                        //region [rgba(50, 120, 50, 0.5)]        //draggables
                    } else if ((myObj.test.questions[y].option).toLowerCase() == "drag") {
                        draggablescounter = 0;
                        x += "<div id = 'dropzone" + dropzonecounter + "' class = 'dropzone' ondrop='drop(event," + num_pyt + ")' ondragover='allowDrop(event)'></div>"; // koniec ---div class='dropzone'
                        x += "<span class='sourcezone' id='sourcezone" + sourcezonecounter + "' ondrop='onSourceDrop(event," + num_pyt + ")' ondragover='allowDrop(event)'>";

                        tbl_rslts1 += "<tr><td data-bkg='" + num_pyt + "'>" + num_pyt + "</td><td data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].skill + "</td><td data-bkg='" + num_pyt + "'>"; //początek rzędu z draggableami
                        for (quest in myObj.test.questions[y].answers) {
                            x += "<p class='draggable' id='draggable_" + num_pyt + "_" + draggablescounter + "' draggable ='true' ondragstart='onDragstartdraggable(event)' ondragover='onDragoverdraggable(event)' onmousedown='onMousedowndraggable(event)' onmouseout='onMouseoutdraggable(event)' ondrag='onDragdraggable(event)' ondragend='onDragenddraggable(event)' onmouseup='onMouseupdraggable(event)' value='" + singleApostrophyReplacement(myObj.test.questions[y].answers[quest]) + "'>" + singleApostrophyReplacement(myObj.test.questions[y].answers[quest]) + " </p>"; //nie ruszać tej spacji przed </p>!!!

                            //wypisanie draggablów w komórce tabeli
                            if (draggablescounter < (myObj.test.questions[y].answers.length - 1)) {
                                tbl_rslts1 += myObj.test.questions[y].answers[quest] + ", ";
                            } else {
                                tbl_rslts1 += myObj.test.questions[y].answers[quest];
                            }
                            draggablescounter++;
                            // //console.log("draggablescounter: " + draggablescounter + "\nmyObj.test.questions[y].answers.length: " + myObj.test.questions[y].answers.length);
                        }
                        x += "</span>"; //koniec ----- <span class='sourcezone'

                        tbl_rslts1 += "</td><td class='corrects' data-bkg='" + num_pyt + "'>";

                        ii = 0;

                        if (myObj.test.questions[y].corr.length < 1) {
                            tbl_rslts1 += myObj.test.questions[y].corr;
                        } else {
                            tbl_rslts1 += "<ul>";
                            for (corr in myObj.test.questions[y].corr) {
                                tbl_rslts1 += "<li>" + myObj.test.questions[y].corr[ii] + "</li>";
                                ii++;
                            }
                            tbl_rslts1 += "</ul>";
                        }
                        tbl_rslts1 += "</td>";

                        if ((myObj.test.questions[y].skill).toLowerCase() == "grammar") {
                            tbl_rslts1 += "<td id='rslts_drag_" + num_pyt + "' data-bkg='" + num_pyt + "'></td><td class='grammar' data-bkg='" + num_pyt + "'>0</td><td class='grammar_max' data-bkg='" + num_pyt + "'>1</td>";
                            grammarAmount++;
                        } else if ((myObj.test.questions[y].skill).toLowerCase() == "vocabulary") {
                            tbl_rslts1 += "<td id='rslts_drag_" + num_pyt + "' data-bkg='" + num_pyt + "'></td><td class='vocabulary' data-bkg='" + num_pyt + "'>0</td><td class='vocabulary_max' data-bkg='" + num_pyt + "'>1</td>";
                            vocabularyAmount++;
                        }
                        tbl_rslts1 += "</tr>"; //koniec rzędu z draggableami

                        // var textt = myObj.test.questions[y].answers;
                        // var new_textt = textt.replace(/\,/g, 'Moc');

                        // tbl_rslts1 += "<td>" + new_textt + "</td>";

                        // new_text = text.replace(/\*gap\*/g, "<input class='inputter' type='text' name='gap'>");

                        dropzonecounter++;
                        sourcezonecounter++;
                        iloscZadan++;

                    }

                }

                // x += "</div>"; // pillars 

                //sprawdzenie czy sekcje dotycza gramatyki lub słownictwa - kolejność pytan zgodnie z kolejnością w pliku json ---- koniec
                //endregion                                      //draggables
                /* 
██╗     ██╗███████╗████████╗███████╗███╗   ██╗██╗███╗   ██╗ ██████╗ 
██║     ██║██╔════╝╚══██╔══╝██╔════╝████╗  ██║██║████╗  ██║██╔════╝ 
██║     ██║███████╗   ██║   █████╗  ██╔██╗ ██║██║██╔██╗ ██║██║  ███╗
██║     ██║╚════██║   ██║   ██╔══╝  ██║╚██╗██║██║██║╚██╗██║██║   ██║
███████╗██║███████║   ██║   ███████╗██║ ╚████║██║██║ ╚████║╚██████╔╝
╚══════╝╚═╝╚══════╝   ╚═╝   ╚══════╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                                    
                */
                //region [rgba(0,0,150,0.5)]                     //listening
                //sprawdzenie czy sekcja dotyczy sluchania - kolejność pytan w dalszym ciągu zgodnie z kolejnością w pliku json
                else if ((myObj.test.questions[y].section).toLowerCase() == "listening") {
                    // var record = 0;
                    // for (z in myObj.test.questions[y].content) {
                    x += "<div class='player-wrapper'><button id='plr-butt" + plyr_ctr + "' class='active btn btn-primary' onclick='playAudio(event," + plyr_ctr + "," + num_pyt + ")' type='button'><i class='fa fa-play-circle-o fa-3x green-text' aria-hidden='true'></i></button><audio id='player" + plyr_ctr + "'  data-played='0' controlsList='nodownload' onended='onEndedEvent(event," + plyr_ctr + "," + num_pyt + "," + y + ")' onloadeddata='onLoadedData(event," + plyr_ctr + ")'><source src='" + myObj.test.questions[y].content + "'  type='audio/mpeg'/>Twoja przeglądarka nie obsługuje tego odtwarzacza. Zgłoś się do lektora w celu uzgodnienia procedury przeprowadzenia tegoż testu.</audio>";
                    plyr_ctr++;
                    x += "</div>"; //koniec class='player-wrapper'

                    var subquestionstctr = 0; //icznik podpytan
                    var subQst;
                    var subQstOpts = 0; //licznik opcji do podpytan
                    var subQuestNr = 0;

                    tbl_rslts1 += "<tr><td rowspan='" + myObj.test.questions[y].subquestions.length + "' data-bkg='" + num_pyt + "'>" + num_pyt + "</td><td rowspan='" + myObj.test.questions[y].subquestions.length + "' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].skill + "</td>"; //początek rzędu z pytaniami ze słuchu

                    for (subQst in myObj.test.questions[y].subquestions) { //sub-questions
                        x += "<div class='sub-pyt'>" + num_pyt + "." + (subquestionstctr + 1) + ". " + myObj.test.questions[y].subquestions[subquestionstctr].subquestion + "</div><div class='sub-opt'>";

                        tbl_rslts1 += "<td data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subquestion + "</td>"; //początek rzędu z podpytaniem z zadania ze słuchu

                        //jeśli opcje wyboru do podpytan to checkboxy
                        alpha_ctr = 0;
                        if ((myObj.test.questions[y].subquestions[subquestionstctr].option).toLowerCase() == "check") {
                            z = 0;
                            for (subQstOpts in myObj.test.questions[y].subquestions[subquestionstctr].subanswers) {
                                x += "<div class='custom-control custom-checkbox custom-control-inline'><input class='custom-control-input' onchange='onCompoundCheckboxesChange(event," + num_pyt + "," + z + "," + myObj.test.questions[y].subquestions[subquestionstctr].subanswers.length + "," + (subquestionstctr + 1) + ")' type='checkbox' id='sub-chbx_" + num_pyt + "_" + (subquestionstctr + 1) + "_" + (Number(subQstOpts) + 1) + "' value='" + singleApostrophyReplacement(myObj.test.questions[y].subquestions[subquestionstctr].subanswers[subQstOpts]) + "' name='forSubQuestion_" + num_pyt + "_" + (subquestionstctr + 1) + "'/><label class='custom-control-label' for='sub-chbx_" + num_pyt + "_" + (subquestionstctr + 1) + "_" + (Number(subQstOpts) + 1) + "'>" + alphabet[alpha_ctr] + ". " + singleApostrophyReplacement(myObj.test.questions[y].subquestions[subquestionstctr].subanswers[subQstOpts]) + "</label></div>";
                                subQstOpts++;
                                alpha_ctr++;
                                z++;
                            }
                            tbl_rslts1 += "<td class='corrects' data-bkg='" + num_pyt + "'><ul>";
                            ii = 0;
                            for (ii in myObj.test.questions[y].subquestions[subquestionstctr].subcorr) {
                                tbl_rslts1 += "<li>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr[ii] + "</li>";

                                ii++;
                            }

                            tbl_rslts1 += "</ul></td><td id='rslts_compound_check_" + num_pyt + "_" + (subquestionstctr + 1) + "' data-bkg='" + num_pyt + "'></td><td class='listening' data-bkg='" + num_pyt + "'>0</td><td class='listening_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr.length + "</td></tr>";
                        }
                        //jeśli opcje wyboru do podpytan to radio
                        else if ((myObj.test.questions[y].subquestions[subquestionstctr].option).toLowerCase() == "radio") {
                            alpha_ctr = 0;
                            for (subQstOpts in myObj.test.questions[y].subquestions[subquestionstctr].subanswers) {
                                x += "<div class='custom-control custom-radio'><input class='custom-control-input' type='radio' id='sub-inpt_" + num_pyt + "_" + (subquestionstctr + 1) + "_" + (Number(subQstOpts) + 1) + "' value='" + singleApostrophyReplacement(myObj.test.questions[y].subquestions[subquestionstctr].subanswers[subQstOpts]) + "'name='forSubQuestion_" + num_pyt + "_" + (subquestionstctr + 1) + "' onchange='onCompoundRadiosChange(event," + num_pyt + "," + (subquestionstctr + 1) + ")'/><label class='custom-control-label' for='sub-inpt_" + num_pyt + "_" + (subquestionstctr + 1) + "_" + (Number(subQstOpts) + 1) + "'>" + alphabet[alpha_ctr] + ". " + singleApostrophyReplacement(myObj.test.questions[y].subquestions[subquestionstctr].subanswers[subQstOpts]) + "</label></div>";

                                subQstOpts++;
                                alpha_ctr++;
                            }
                            tbl_rslts1 += "<td class='corrects' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr + "</td><td id='rslts_compound_radio_" + num_pyt + "_" + (subquestionstctr + 1) + "' data-bkg='" + num_pyt + "'></td><td class='listening' data-bkg='" + num_pyt + "'>0</td><td class='listening_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr.length + "</td></tr>"; //koniec rzędu z listening radio
                        }
                        x += "</div>"; //koniec div class='sub-opt'??

                        subquestionstctr++;
                        iloscZadan++;
                    }
                    listenAmount++;

                } //koniec do opcji listening

                //sprawdzenie czy sekcje dotycza sluchania - kolejność pytan zgodnie z kolejnością w pliku json ----------- koniec
                //endregion                                      //listening
                /* 
██████╗ ███████╗ █████╗ ██████╗ ██╗███╗   ██╗ ██████╗ 
██╔══██╗██╔════╝██╔══██╗██╔══██╗██║████╗  ██║██╔════╝ 
██████╔╝█████╗  ███████║██║  ██║██║██╔██╗ ██║██║  ███╗
██╔══██╗██╔══╝  ██╔══██║██║  ██║██║██║╚██╗██║██║   ██║
██║  ██║███████╗██║  ██║██████╔╝██║██║ ╚████║╚██████╔╝
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                        
                */
                //region [rgba(150,8,100,0.5)]                   //reading
                //sprawdzenie czy sekcje dotycza czytania czytania - kolejność pytan zgodnie z kolejnością w pliku json -----------
                else if ((myObj.test.questions[y].section).toLowerCase() == "reading") {
                    // var record = 0;
                    // for (z in myObj.test.questions[y].content) {
                    // z = 0;

                    //jeśli zadanie jest wyrażnie podane w pliku json
                    if (myObj.test.questions[y].task) {
                        x += "<div class='task'>" + myObj.test.questions[y].task + "</div>";
                    }

                    x += "<div class='reading-wrapper'><div class='reader' id='reader" + z + "'>" + myObj.test.questions[y].content + "</div>"; //koniec class reader



                    //jeśli jest przykład wyraźnie podany w pliku json
                    if (myObj.test.questions[y].example) {
                        x += "<div class='example'>" + myObj.test.questions[y].example + "</div>";
                    }

                    x += "</div>"; //koniec class='reading-wrapper'
                    // z++;
                    subquestionstctr = 0; //icznik podpytan
                    subQst;
                    subQstOpts = 0; //licznik opcji do podpytan
                    subQuestNr = 0;

                    tbl_rslts1 += "<tr><td rowspan='" + myObj.test.questions[y].subquestions.length + "' data-bkg='" + num_pyt + "'>" + num_pyt + "</td><td rowspan='" + myObj.test.questions[y].subquestions.length + "' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].skill + "</td>";

                    //początek rzędu z pytaniami z czytania

                    for (subQst in myObj.test.questions[y].subquestions) { //sub-questions
                        x += "<div class='sub-pyt'>" + num_pyt + "." + (subquestionstctr + 1) + ". " + myObj.test.questions[y].subquestions[subquestionstctr].subquestion + "</div><div class='sub-opt'>";

                        tbl_rslts1 += "<td data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subquestion + "</td>"; //początek rzędu z podpytaniem z zadania z czytania

                        //jeśli opcje wybpru do podpytan to checkboxy
                        alpha_ctr = 0;
                        if ((myObj.test.questions[y].subquestions[subquestionstctr].option).toLowerCase() == "check") {
                            // tbl_rslts1 += "<td>";
                            z = 0;
                            for (subQstOpts in myObj.test.questions[y].subquestions[subquestionstctr].subanswers) {
                                x += "<div class='custom-control custom-checkbox custom-control-inline'><input class='custom-control-input' onchange='onCompoundCheckboxesChange(event," + num_pyt + "," + z + "," + myObj.test.questions[y].subquestions[subquestionstctr].subanswers.length + "," + (subquestionstctr + 1) + ")' type='checkbox' id='sub-chbx_" + num_pyt + "_" + (subquestionstctr + 1) + "_" + (Number(subQstOpts) + 1) + "' value='" + singleApostrophyReplacement(myObj.test.questions[y].subquestions[subquestionstctr].subanswers[subQstOpts]) + "' name='forSubQuestion_" + num_pyt + "_" + (subquestionstctr + 1) + "'/><label class='custom-control-label' for='sub-chbx_" + num_pyt + "_" + (subquestionstctr + 1) + "_" + (Number(subQstOpts) + 1) + "'>" + alphabet[alpha_ctr] + ". " + singleApostrophyReplacement(myObj.test.questions[y].subquestions[subquestionstctr].subanswers[subQstOpts]) + "</label></div>";
                                subQstOpts++;
                                alpha_ctr++;
                                z++;
                            }
                            tbl_rslts1 += "<td class='corrects' data-bkg='" + num_pyt + "'><ul>";
                            ii = 0;
                            for (ii in myObj.test.questions[y].subquestions[subquestionstctr].subcorr) {
                                tbl_rslts1 += "<li>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr[ii] + "</li>";

                                ii++;
                            }

                            tbl_rslts1 += "</ul></td><td id='rslts_compound_check_" + num_pyt + "_" + (subquestionstctr + 1) + "' data-bkg='" + num_pyt + "'></td>";

                            if ((myObj.test.questions[y].skill).toLowerCase() == "vocabulary") {
                                tbl_rslts1 += "<td class='vocabulary' data-bkg='" + num_pyt + "'>0</td><td class='vocabulary_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr.length + "</td>";
                            } else if ((myObj.test.questions[y].skill).toLowerCase() == "grammar") {
                                tbl_rslts1 += "<td class='grammar' data-bkg='" + num_pyt + "'>0</td><td class='grammar_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr.length + "</td>";
                            } else if ((myObj.test.questions[y].skill).toLowerCase() == "reading") {
                                tbl_rslts1 += "<td class='reading' data-bkg='" + num_pyt + "'>0</td><td class='reading_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr.length + "</td>";
                            }

                            tbl_rslts1 += "</tr>";
                        }

                        //jeśli opcje wybpru do podpytan to radio
                        else if ((myObj.test.questions[y].subquestions[subquestionstctr].option).toLowerCase() == "radio") {
                            // tbl_rslts1 += "<td>";
                            alpha_ctr = 0;
                            for (subQstOpts in myObj.test.questions[y].subquestions[subquestionstctr].subanswers) {
                                x += "<div class='custom-control custom-radio'><input class='custom-control-input' type='radio' id='sub-inpt_" + num_pyt + "_" + (subquestionstctr + 1) + "_" + (Number(subQstOpts) + 1) + "' value='" + singleApostrophyReplacement(myObj.test.questions[y].subquestions[subquestionstctr].subanswers[subQstOpts]) + "'name='forSubQuestion_" + num_pyt + "_" + (subquestionstctr + 1) + "' onchange='onCompoundRadiosChange(event," + num_pyt + "," + (subquestionstctr + 1) + ")'/><label class='custom-control-label' for='sub-inpt_" + num_pyt + "_" + (subquestionstctr + 1) + "_" + (Number(subQstOpts) + 1) + "'>" + alphabet[alpha_ctr] + ". " + singleApostrophyReplacement(myObj.test.questions[y].subquestions[subquestionstctr].subanswers[subQstOpts]) + "</label></div>";
                                subQstOpts++;
                                alpha_ctr++;
                            }

                            tbl_rslts1 += "<td class='corrects' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr + "</td><td id='rslts_compound_radio_" + num_pyt + "_" + (subquestionstctr + 1) + "' data-bkg='" + num_pyt + "'></td>";
                            if ((myObj.test.questions[y].skill).toLowerCase() == "vocabulary") {
                                tbl_rslts1 += "<td class='vocabulary' data-bkg='" + num_pyt + "'>0</td><td class='vocabulary_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr.length + "</td>";
                            } else if ((myObj.test.questions[y].skill).toLowerCase() == "grammar") {
                                tbl_rslts1 += "<td class='grammar' data-bkg='" + num_pyt + "'>0</td><td class='grammar_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr.length + "</td>";
                            } else if ((myObj.test.questions[y].skill).toLowerCase() == "reading") {
                                tbl_rslts1 += "<td class='reading' data-bkg='" + num_pyt + "'>0</td><td class='reading_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].subquestions[subquestionstctr].subcorr.length + "</td>";
                            }

                            tbl_rslts1 += "</tr>"; //koniec rzędu z reading radio
                        }
                        x += "</div>"; //koniec div class='sub-opt'>??

                        subquestionstctr++;
                        iloscZadan++;
                    }
                    readAmount++;

                }

                //sprawdzenie czy sekcje dotycza czytania czytania - kolejność pytan zgodnie z kolejnością w pliku json ----------- koniec
                //endregion                                      //reading
                /* 
  ██████╗  █████╗ ██████╗                         
 ██╔════╝ ██╔══██╗██╔══██╗                        
 ██║  ███╗███████║██████╔╝                        
 ██║   ██║██╔══██║██╔═══╝                         
 ╚██████╔╝██║  ██║██║                             
  ╚═════╝ ╚═╝  ╚═╝╚═╝                             
                                                  
 ███████╗██╗██╗     ██╗     ██╗███╗   ██╗ ██████╗ 
 ██╔════╝██║██║     ██║     ██║████╗  ██║██╔════╝ 
 █████╗  ██║██║     ██║     ██║██╔██╗ ██║██║  ███╗
 ██╔══╝  ██║██║     ██║     ██║██║╚██╗██║██║   ██║
 ██║     ██║███████╗███████╗██║██║ ╚████║╚██████╔╝
 ╚═╝     ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                 
                */
                //region [rgba(120,80,80,0.5)]                   //gap-filling
                //sprawdzenie czy sekcja dotyczy uzupełnianie luk - kolejność pytan w dalszym ciągu zgodnie z kolejnością w pliku json
                else if ((myObj.test.questions[y].section).toLowerCase() === "gap-filling") {
                    var textt = myObj.test.questions[y].text;
                    var gapp = "*gap*";
                    var new_text;
                    var gap_ctr = myObj.test.questions[y].answers.length;
                    var rslts_tbl_text;
                    z = 0;

                    // new_text = text.replace(/\*gap\*/g, "<input class='inputter' type='text' name='gapForQst_" + num_pyt + "'>");
                    // numerowanie_inputow(event, num_pyt);

                    // var gappinger = function() {
                    //     for (gapp[i] in textt) {
                    //         neww_text = textt.replace(gapp, "Shoot");
                    //         i++;
                    //         gappinger;
                    //     }
                    // }

                    //zamiana *gap* na input boxy
                    while (textt.indexOf(gapp) != -1) {

                        var beforeSplit = (myObj.test.questions[y].answers).toString();
                        var splittered = beforeSplit.split("/");

                        var splitteredAndPlaceholder = splittered + "," + (myObj.test.questions[y].placeholder).toString();
                        splitteredAndPlaceholder = splitteredAndPlaceholder.replace(/\,/g, "||");
                        //console.log("Split answers + placeholder = " + splitteredAndPlaceholder.toString());

                        var longest = splitteredAndPlaceholder.split('||').sort(function(a, b) {
                            return b.length - a.length;
                        }).shift();




                        textt = textt.replace(gapp, "<input type='text' class='inputter' id='inputter" + "_" + num_pyt + "_" + z + "_" + gap_ctr + "' oninput='onInputInput(event," + num_pyt + "," + z + "," + gap_ctr + ")'  data-sizer=" + longest.length + " autocomplete='off' name='gapForQest" + num_pyt + "' placeholder='" + myObj.test.questions[y].placeholder + "'/>");

                        //console.log("myObj.test.questions[" + y + "].answers[" + ii + "].length = " + myObj.test.questions[y].answers[ii].length + "\nmyObj.test.questions[" + y + "].placeholder.length = " + myObj.test.questions[y].placeholder.length + "\n$(#inputter_" + num_pyt + "_" + (z - 1) + "_" + gap_ctr + ").attr(size) = " + $("#inputter_" + num_pyt + "_" + (z - 1) + "_" + gap_ctr).attr("size"));


                        //console.log($(textt).attr("id"));



                        //console.log("num_pyt = " + num_pyt + ", z = " + z + ", gap_ctr = " + gap_ctr);

                        //alert("Sizing of " + $('#inputter_' + num_pyt + '_' + (z) + '_' + gap_ctr).attr('id'));

                        z++;
                    }

                    // alert(textt);

                    // for (answers in myObj.test.questions[y].answers) {
                    //     // $(".inputter").setAttribute("id", "Shitter");
                    //     // alert(myObj.test.questions[y].answers[gap_ctr]);
                    //     alert($(".inputter").attr("name"));
                    //     gap_ctr++;
                    // }

                    // nnew_text = text.replace(/\*gap\*/g, "<input class='rslts_tbl_input disabled' type='text' name='rslts_tbl_gap'>");


                    //function Sizing(num_pyt, z, gap_ctr, size)
                    //{

                    //$(textt).attr("size", longest.length);
                    $("#inputter" + "_" + num_pyt + "_" + (z - 1) + "_" + gap_ctr).attr("size", longest.length);
                    //}


                    //console.log($("#inputter_" + num_pyt + "_" + (z - 1) + "_" + gap_ctr).attr("id") + "------Longest = " + longest + "; Longest length = " + longest.length);

                    tbl_rslts1 += "<tr><td data-bkg='" + num_pyt + "'>" + num_pyt + "</td><td data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].skill + "</td><td data-bkg='" + num_pyt + "'>" + textt + "</td><td class='corrects' data-bkg='" + num_pyt + "' id='gapcorrects_" + num_pyt + "'><ul id='gapcorrects_" + num_pyt + "_ul'>";



                    ii = 0;
                    for (ii in myObj.test.questions[y].answers) {
                        tbl_rslts1 += "<li>" + myObj.test.questions[y].answers[ii] + "</li>";



                        //if ((myObj.test.questions[y].answers[ii]).includes("/") === false) //sprawdzanie dlugosci stringow
                        //{
                        //    if (myObj.test.questions[y].answers[ii].length >= myObj.test.questions[y].placeholder.length)
                        //    {
                        //        //textt.size = myObj.test.questions[y].answers[ii].length;
                        //        $("#inputter_" + num_pyt + "_" + (z - 1) + "_" + gap_ctr).attr("size", myObj.test.questions[y].answers[ii].length);
                        //        console.log("myObj.test.questions[" + y + "].answers[" + ii + "].length = " + myObj.test.questions[y].answers[ii].length + "\nmyObj.test.questions[" + y + "].placeholder.length = " + myObj.test.questions[y].placeholder.length + "\n$(#inputter_" + num_pyt + "_" + (z - 1) + "_" + gap_ctr + ").attr(size) = " + $("#inputter_" + num_pyt + "_" + (z - 1) + "_" + gap_ctr).attr("size"));

                        //    }
                        //    else
                        //    {
                        //        //textt.size = myObj.test.questions[y].placeholder.length;
                        //        $("#inputter_" + num_pyt + "_" + (z - 1) + "_" + gap_ctr).attr("size",  myObj.test.questions[y].placeholder.length);
                        //        console.log("myObj.test.questions[" + y + "].answers[" + ii + "].length = " + myObj.test.questions[y].answers[ii].length + "\nmyObj.test.questions[" + y + "].placeholder.length = " + myObj.test.questions[y].placeholder.length + "\n$(#inputter_" + num_pyt + "_" + (z - 1) + "_" + gap_ctr + ").attr(size) = " + $("#inputter_" + num_pyt + "_" + (z - 1) + "_" + gap_ctr).attr("size"));

                        //    }

                        //}
                        //else
                        //{

                        //}


                        ii++;
                    }

                    tbl_rslts1 += "</ul></td><td id='rslts_input_" + num_pyt + "' data-bkg='" + num_pyt + "'><ul id='results_input_" + num_pyt + "_ul'>";
                    ii = 0;
                    for (ii in myObj.test.questions[y].answers) {
                        tbl_rslts1 += "<li></li>";
                        ii++;
                    }

                    tbl_rslts1 += "</td>";

                    //dodanie klasy do ostatniej kolumny w zależnośći od "skill"
                    if ((myObj.test.questions[y].skill).toLowerCase() === "vocabulary") {
                        tbl_rslts1 += "<td class='vocabulary' data-bkg='" + num_pyt + "'>0</td><td class='vocabulary_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].answers.length + "</td>";
                        vocabularyAmount++;
                    } else if ((myObj.test.questions[y].skill).toLowerCase() === "grammar") {
                        tbl_rslts1 += "<td class='grammar' data-bkg='" + num_pyt + "'>0</td><td class='grammar_max' data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].answers.length + "</td>";
                        grammarAmount++;
                    }

                    tbl_rslts1 += "</tr>";

                    x += "<div class='text-wrapper'>" + textt + "</div>"; //text-wrapper

                    iloscZadan++;
                } //koniec else if gap-filling
                //sprawdzenie czy sekcja dotyczy uzupełnianie luk - kolejność pytan w dalszym ciągu zgodnie z kolejnością w pliku json ------------------ koniec
                //endregion                                      //gap-filling
                /* 
 ██╗    ██╗██████╗ ██╗████████╗██╗███╗   ██╗ ██████╗ 
 ██║    ██║██╔══██╗██║╚══██╔══╝██║████╗  ██║██╔════╝ 
 ██║ █╗ ██║██████╔╝██║   ██║   ██║██╔██╗ ██║██║  ███╗
 ██║███╗██║██╔══██╗██║   ██║   ██║██║╚██╗██║██║   ██║
 ╚███╔███╔╝██║  ██║██║   ██║   ██║██║ ╚████║╚██████╔╝
  ╚══╝╚══╝ ╚═╝  ╚═╝╚═╝   ╚═╝   ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                    
                */
                //region [rgba(0,0,0,0.8)]                      //writing
                //sprawdzenie czy sekcja zadania pisania - kolejność pytan zgodnie z kolejnością w pliku json ----------- początek
                else if ((myObj.test.questions[y].section).toLowerCase() == "writing") {

                    x += "<div class='writer-wrapper'><div class='writer' id='writer" + num_pyt + "'><textarea name='txtarea" + num_pyt + "'  onpaste='pasteBanner(event," + num_pyt + ")' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='texting' id='texting" + num_pyt + "' onkeyup='wordcounting(event, " + num_pyt + ")' placeholder='W tym miejscu wpisz swoją historię' value='' form='Form'></textarea><span class='wrd-ctr'>Ilość słów:&nbsp;&nbsp;&nbsp;<span id='word-ctr" + num_pyt + "'>&nbsp;&nbsp;&nbsp;</span></span></div></div>";



                    tbl_rslts1 += "<tr><td data-bkg='" + num_pyt + "'>" + num_pyt + "</td><td data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].skill + "</td><td data-bkg='" + num_pyt + "'>" + myObj.test.questions[y].question + "</td><td colspan='4' id='rslts_texting_" + num_pyt + "' data-bkg='" + num_pyt + "'><textarea name='txt_area_clone" + num_pyt + "' class='texting' id='rslts_texting_clone" + num_pyt + "' readonly='true' value='' form='Form'></textarea></td></tr>";
                    iloscZadan++;
                }

                //sprawdzenie czy sekcja zadania pisania - kolejność pytan zgodnie z kolejnością w pliku json ----------- koniec

                num_pyt++;

                x += "</div>"; //div parent!!!!!!!!!!!


                //document.getElementById("testId").value = myObj.test.TestID;
                //alert("myObj.test.TestID: " + myObj.test.TestID + "\ndocument.getElementById('testId').value: " + document.getElementById("testId").value);
            }

            tbl_rslts1 += "</tbody></table>";
            document.getElementById("demo").innerHTML = x;
            document.getElementById("results1").innerHTML = tbl_rslts1;
            document.getElementById("testId").value = myObj.test.TestID;
            document.getElementById("testType").value = myObj.test.TestType;
            document.getElementById("group").value = myObj.test.Group;
            document.getElementById("level").value = myObj.test.Level;





            document.getElementById("totalTestTime").value = myObj.test.Time;

            // var tds_count = $(".results td").length;
            // alert("Komóry: " + tds_count);

            //wyliczenie i wpisanie wartości maksymalnych które można uzyskać w każdym skillu - początek
            var list_max_total = 0;
            for (i = 0; i < document.getElementsByClassName("listening_max").length; i++) {
                list_max_total = list_max_total + parseInt(document.getElementsByClassName("listening_max")[i].innerText);
            }
            // console.log("list_max_total: " + list_max_total);
            document.getElementById("listening_max_total").innerText = list_max_total;
            // console.log("list_max_total(2): " + list_max_total);

            var voc_max_total = 0;
            for (i = 0; i < document.getElementsByClassName("vocabulary_max").length; i++) {
                voc_max_total = voc_max_total + parseInt(document.getElementsByClassName("vocabulary_max")[i].innerText);
            }
            document.getElementById("vocabulary_max_total").innerText = voc_max_total;

            var gram_max_total = 0;
            for (i = 0; i < document.getElementsByClassName("grammar_max").length; i++) {
                gram_max_total = gram_max_total + parseInt(document.getElementsByClassName("grammar_max")[i].innerText);
            }
            document.getElementById("grammar_max_total").innerText = gram_max_total;

            var read_max_total = 0;
            for (i = 0; i < document.getElementsByClassName("reading_max").length; i++) {
                read_max_total = read_max_total + parseInt(document.getElementsByClassName("reading_max")[i].innerText);
            }
            document.getElementById("reading_max_total").innerText = read_max_total;
            //wypisanie maksymalnej ilości pumktów do zdobycia - koniec

            var max_total = 0;
            for (i = 0; i < document.getElementsByClassName("max_total").length; i++) {
                max_total = parseInt(max_total) + parseInt(document.getElementsByClassName("max_total")[i].innerText);
            }
            document.getElementById("total_max_total").innerText = parseInt(max_total);

            //wyliczenie i wpisanie wartości maksymalnych któremożna uzyskać w każdym skillu - koniec
        }
        //kolejność pytan przypadkowa,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,
        else {
            var il_pyt = myObj.test.questions.length;
            var tp = []; //pytania w jednym ciągu
            i = 0;
            var numery_pytan = [];
            var temp = [];
            var x = "";

            ilosc_pytan();

            function ilosc_pytan() {
                for (i in myObj.test.questions) {
                    tp += myObj.test.questions[i].question + "\n";
                    numery_pytan.push(Number(i));
                }
            }

            // //console.log("Ilość pytan: " + il_pyt);
            // //console.log("Losowy numer pytania: " + Math.floor(Math.random() * il_pyt));
            // //console.log("Tablica pytan: " + tp);
            // document.getElementById("demo").innerHTML = tp;

            //randomizacja numerów pytan--------------------------------
            function shuffle(array) {
                var currentIndex = array.length,
                    temporaryValue, randomIndex;

                // While there remain elements to shuffle...
                while (0 !== currentIndex) {
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex -= 1;

                    // And swap it with the current element.
                    temporaryValue = array[currentIndex];
                    array[currentIndex] = array[randomIndex];
                    array[randomIndex] = temporaryValue;
                }

                return array;
            }

            // Used like so
            var arr = numery_pytan;
            // var rand_qs = myObj.test.questions[arr[r]];
            arr = shuffle(arr);
            // //console.log(arr);

            //randomizacja numerów pytan--------------------------------koniec

            //wypisanie zrandomizowanych pytan z opcjami wyboru
            var r = 0;
            quest = 0;
            for (r in myObj.test.questions) {
                // //console.log(myObj.test.questions[arr[r]].question);

                // <!-- wypisanie pytania -->
                // <!-- jeśli to pierwsze pytanie wogóle -->
                if (r == 0) {
                    // //console.log(arr);
                    x += "<div id='parent" + num_pyt + "'><div id='pyt" + num_pyt + "' data-criteria='" + myObj.test.questions[y].criteria + "'>" + num_pyt + ". " + myObj.test.questions[arr[r]].question + "</div>";

                    // console.log("data-criteria - 770 = " + myObj.test.questions[y].criteria);
                }
                // <!-- jeśli to każde następne pytanie -->
                else {
                    x += "<div id='parent" + num_pyt + "'><div id='pyt" + num_pyt + "' data-criteria='" + myObj.test.questions[y].criteria + "'>" + num_pyt + ". " + myObj.test.questions[arr[r]].question + "</div>";

                    //console.log("data-criteria - 777 = " + myObj.test.questions[y].criteria);
                }
                // <!-- Wypisanie wszystkich opcji do danego pytania -->

                // <!-- jesli prawidlowa jest tylko jedna odpowiedż -->
                if ((myObj.test.questions[arr[r]].option).toLowerCase() == "radio") {
                    for (quest in myObj.test.questions[arr[r]].answers) {
                        x += "<input type='radio' id='opt" + z + "' name='forQuestion" + z + "' value='" + myObj.test
                            .questions[arr[r]].answers[quest] + "'/>" + myObj.test.questions[arr[r]].answers[quest] + "<br>";
                    }
                } else if ((myObj.test.questions[arr[r]].option).toLowerCase() == "check") {
                    for (quest in myObj.test.questions[arr[r]].answers) {
                        x +=
                            "<input class='form-check-input' type='checkbox' id='inlineFormCheckMD' name='forQuestion" + z +
                            "' value='" + myObj.test.questions[arr[r]].answers[quest] + "'/>   " + myObj.test.questions[arr[r]]
                            .answers[quest] + "<br>";
                    }
                } else if ((myObj.test.questions[arr[r]].option).toLowerCase() == "drag") {
                    // var dropzone;
                    // var sourcezone;
                    x += "<div id = 'dropzone" + dropzonecounter + "' class='dropzone' ondrop='drop(event)' ondragover='allowDrop(event)'></div>";
                    x += "<span class='sourcezone' id='sourcezone" + sourcezonecounter + "' ondrop='drop(event)' ondragover='allowDrop(event)'>";

                    for (quest in myObj.test.questions[arr[r]].answers) {
                        x += "<p class='draggable' id='draggable" + draggablescounter + "' draggable = 'true' ondragstart='onDragstartdraggable(event)' ondragover='onDragoverdraggable(event)' onmousedown='onMousedowndraggable(event)' onmouseout='onMouseoutdraggable(event)' ondrag='onDragdraggable(event)' ondragend='onDragenddraggable(event)' onmouseup='onMouseupdraggable(event)' value='" + myObj.test.questions[arr[r]].answers[quest] + "'>" + myObj.test.questions[arr[r]].answers[quest] + " </p>";
                        draggablescounter++;
                    }
                    x += "</span>";
                    dropzonecounter++;
                    sourcezonecounter++;
                }

                x += "</div>";

                z++;
                num_pyt++;
            }
            // accords
            // x += "</div>";
            // accords
            document.getElementById("demo").innerHTML = x;

        }

        // accords ending
        x += "</div>"; //accords ending
        // accords ending
        // alert(document.getElementById("dropzone" + dropzonecounter).style.background);
        testTime = czas_testu;
        display = document.querySelector('#fixer');

        //ustawianie wysokości sourcezone/dropzone, aby pomieściły draggables
        dimensioning();

        //numerowanie id pól tekstowych
        // var inputs_numbering = function numerowanie_inputow(e, np) {
        $(".results .inputter").each(function(i, element) {
            $(this).removeAttr("placeholder");
            $(this).attr("disabled", "true");
        });
        // }

        var i = 0;
        //cieniowanie co dwa pola parent testu (nie tabeli)
        $(".parent").each(function(i, element) {
            if (i % 2 == 0) {
                $(element).addClass("odd");
            } else {
                $(element).addClass("evener");
            }
        });

    }

}

/* 
 ██████╗ ██╗      ██████╗ ██████╗  █████╗ ██╗     ███████╗
██╔════╝ ██║     ██╔═══██╗██╔══██╗██╔══██╗██║     ██╔════╝
██║  ███╗██║     ██║   ██║██████╔╝███████║██║     ███████╗
██║   ██║██║     ██║   ██║██╔══██╗██╔══██║██║     ╚════██║
╚██████╔╝███████╗╚██████╔╝██████╔╝██║  ██║███████╗███████║
 ╚═════╝ ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝
                                                          
 */

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//var globalVariable;

xmlhttp.open("GET", "festo-jpl.json", true); //tego ma nie być na testy.engraft.pl
//xmlhttp.open("GET", globalVariable.x, true);  //to ma być na testy.engraft.pl
xmlhttp.send();
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO tego ma nie być na testy.engraft.pl
var person = prompt("Please enter your name:", "Grzegorz Zieliński");
//var person = prompt("Please enter your name:", "Boni Facy");
// var person = prompt("Please enter your name:", "Tlen Oksyński");

if (person == null || person == "") {
    //txt = "User cancelled the prompt.";
} else {
    document.getElementById("userName").value = person;
    document.getElementById("intro_user_name").innerHTML = person;

}

var adresMailowy = prompt("Please enter your email address:", "admin@engraft.pl");
// var adresMailowy = prompt("Please enter your email address:", "bff@poczta.onet.pl");
// var adresMailowy = prompt("Please enter your email address:", "greansky@tlen.pl");

if (adresMailowy == null || person == "") {
    //txt = "User cancelled the prompt.";
} else {
    document.getElementById("userMail").value = adresMailowy;
}

//OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO 





//if ((localStorage.getItem('OnStoppage-' + myObj.test.TestID) == null) || (localStorage.getItem('OnStoppage-' + myObj.test.TestID) == undefined)) 
//{
//    localStorage.setItem(('OnStoppage-' + myObj.test.TestID), (hrs + ":" +  mins + ":" +  secs).toString());
//}
//else if (localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) == "Test zakończył się.")
//{
//        localStorage.getItem('OnStoppage-' + document.getElementById('testId').value);
//}
//else
//{
//    hrs = parseInt(Number(localStorage.getItem('OnStoppage-' + document.getElementById('testId').value).substr(0, 2)));
//    mins = parseInt(Number(localStorage.getItem('OnStoppage-' + document.getElementById('testId').value).substr(3, 2)));
//    secs = parseInt(Number(localStorage.getItem('OnStoppage-' + document.getElementById('testId').value).substr(6, 2)));
//    czas_testu = parseInt((Number(hrs) * 60 * 60) + (Number(mins) * 60) + Number(secs));

//    //console.log("hrs=" + hrs + "\nmins=" + mins + "\nsecs=" + secs);
//}

//console.log("Line 891: " + localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) + "\nUser Name: " + document.getElementById('userName').value + "\nTest ID: " + document.getElementById('testId').value);



//setTimeout(function () { getStoppageTime(); }, 5000);
//getStoppageTime();
//function getStoppageTime() {
//    $.ajax({
//        type: "POST",
//        //contentType: "application/x-www-form-urlencoded; charset=UTF-8", //to trzeba sprawdzać
//        data: { UserName: document.getElementById('userName').value, TestID: myObj.test.TestID },
//        url: "desktopmodules/EngraftService.asmx/GetStoppageTime",
//        dataType: "text",
//        cache: false,
//        //async: false,
//        success: function (data) {
//            //$('#demo').prepend("Prepender");
//            if (data != "") {
//                console.log("Line 907 - data: " + data);
//                localStorage.setItem('OnStoppage-' + myObj.test.TestID, data);
//                dbStoppageTime = data;
//            }
//            else {
//                console.log("Line 910: hrs = " + hrs + "\nmins = " + mins + "\nsecs = " + secs);
//                //alert(data + "\nTestID: " + myObj.test.TestID + "\nUserName: " + document.getElementById('userName').value);
//            }
//        },
//        error: function (msg) {
//            alert(msg);
//        }
//    });
//};


var startingTime = new Date();
//alert(startingTime);

//document.getElementById("testId").value = myObj.test.TestID;
/* 
 ██████╗██╗     ███████╗ █████╗ ███╗   ██╗██╗███╗   ██╗ ██████╗ 
██╔════╝██║     ██╔════╝██╔══██╗████╗  ██║██║████╗  ██║██╔════╝ 
██║     ██║     █████╗  ███████║██╔██╗ ██║██║██╔██╗ ██║██║  ███╗
██║     ██║     ██╔══╝  ██╔══██║██║╚██╗██║██║██║╚██╗██║██║   ██║
╚██████╗███████╗███████╗██║  ██║██║ ╚████║██║██║ ╚████║╚██████╔╝
 ╚═════╝╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                
*/

//czyszczenie przed zakoczeniem testu ------------------------------------------początek
function onCleaning() {
    //var newImg;
    //html2canvas
    //html2canvas($("#demo"), {
    //    onrendered: function (canvas)
    //    {
    //        var url = canvas.toDataURL("image/png", 1.0);

    //        newImg = document.createElement("img"); // create img tag

    //        newImg.setAttribute("id", "image1");
    //        newImg.setAttribute("alt", "Zrzut");
    //        newImg.setAttribute("href", "url");
    //        newImg.src = url;
    //        //$("#plotno").html = "<img src=' + newImg.src + ' alt='Próba'/>";
    //        $("#plotno").append(newImg);
    //        /*document.body.appendChild(newImg);*/ // add to end of your document
    //        //theCanvas = canvas;
    //        //document.body.appendChild(canvas);

    //        // Convert and download as image
    //        //Canvas2Image.saveAsPNG(canvas);
    //        //$("#plotno").append(canvas);
    //        // Clean up
    //        //document.body.removeChild(canvas);
    //        //image_data_url = $('canvas').last()[0].toDataURL();
    //    }
    //});
    //html2canvas

    if ($(".texting").length >= 0) {
        $("#closingRemarks").append("<br /><p><b>Uwaga:</b> W tym teście znajduje się część pisemna, która będzie oceniona indywidualnie. W związku z tym, ocena końcowa może ulec zmianie.</p>");
    }

    $(".writer").addClass("disabled");

    //zerowanie wszystkich inputów i tytułów
    timer = 0;
    // dezaktywowanie wszystkich inputów
    //var atryb = document.querySelectorAll('input');
    //for (var i = 0; i < atryb.length; i++) {
    //    atryb[i].setAttribute("disabled", "");
    //}
    $(".inputter").attr("disabled", true);
    $(".form-check-input").attr("disabled", true);

    // dezaktywowanie wszystkich draggablów
    //var atryb_draggable = document.querySelectorAll('.draggable');
    //for (var i = 0; i < atryb_draggable.length; i++) {
    //    // atryb_draggable[i].setAttribute("draggable", "false");
    //    atryb_draggable[i].removeAttribute("draggable");
    //}
    $(".draggable").removeAttr("draggable");

    // dezaktywowanie wszystkich przycisków
    var atryb_butt = document.querySelectorAll('button');

    //for (var i = 0; i < atryb_butt.length; i++) {
    //    $(atryb_butt[i]).addClass("disabled").removeClass("active").html("Zakończyłeś test.");
    //    clearInterval(myInterval1);
    //    clearInterval(myInterval2);
    //}

    $(".cleaner").addClass("disabled").html("Test zakończył się.");

    //var audio_plyr = document.querySelectorAll('audio');
    //for (var i = 0; i < audio_plyr.length; i++) {
    //    // $(audio_plyr[i]).pause = true;
    //    $(audio_plyr[i]).remove();
    //    $(atryb_butt[i]).html("Test zakończył się.");
    //    clearInterval(myInterval1);
    //    clearInterval(myInterval2);
    //}

    $("[id^='plr-butt']").removeClass("active").attr("disabled", true).html("Test zakończył się.");
    $("audio").remove()

    // kiedy zegar wybija 0 (koniec testu ze względu na upływ czasu) ------------- koniec

    var outtime = setTimeout(function() {
        document.getElementById("fixer").innerHTML = "<span id='time-show'>Test zakończył się.</span>";
    }, 3000);
    // clearTimeout(outtime);
    clearInterval(wal);
    clearInterval(myInterval1);
    clearInterval(myInterval2);

    $(".results td").each(function() {
        var cell_bkg_val = $(this).attr("data-bkg");
        // //console.log("(cell_bkg_val) % 2): " + (cell_bkg_val) % 2);
        if ((parseInt(cell_bkg_val) % 2) == 0) {
            $(this).addClass("evener");
        }
    });

    //koniec zerowania wszystkoch tytułów i tytułów

    //$(".modal-header").css({
    //    "width": "80%",
    //    "margin": "0 auto"
    //});
    //$(".modal-body").css({
    //    "width": "80%",
    //    "margin": "0 auto"
    //});
    //$(".modal-footer").css({
    //    "width": "80%",
    //    "margin": "0 auto"
    //});

    // stary ajax+++++++++++++++++++++++++++++++++++++++++++++++++++++
    // obj = document.getElementById("package").innerHTML;
    // dbParam = JSON.stringify(obj);
    // xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange = function() {
    //     if (this.readyState == 4 && this.status == 200) {
    //         // myObj = JSON.parse(this.responseText);
    //         // for (x in myObj) {
    //         //     txt += myObj[x].name + "<br>";
    //         // }
    //         // document.getElementById("demo").innerHTML = txt;
    //         alert("Przeszło");
    //     }
    // }
    // xmlhttp.open("POST", "dnnmailer.cs", true);
    // xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // xmlhttp.send("x=" + dbParam);

    // stary ajax koniec +++++++++++++++++++++++++++++++++++++++++++++++++++++



    //wysyłka do bazy danych /////////////////////////////////////////////////////

    // eliminacja danych z uiejętnościami (listening, reading, etc.), które nie były testowane
    var substituteListeningPercent;
    var substituteListeningGrade;
    var substituteVocabularyPercent;
    var substituteVocabularyGrade;
    var substituteGrammarPercent;
    var substituteGrammarGrade;
    var substituteReadingPercent;
    var substituteReadingGrade;

    if (listenAmount == 0)
    //if (document.getElementById("lisPercent").innerText == "")
    {
        $("#listSummary").detach();
        $("#tableListeningTotalRow").detach();
        substituteListeningPercent = "N/A";
        substituteListeningGrade = "N/A";
    } else {
        substituteListeningPercent = Number(document.getElementById("lisPercent").innerText);
        substituteListeningGrade = Number(document.getElementById("lisGrade").innerText);
    }

    //if (document.getElementById("vocPercent").innerText == "")
    if (vocabularyAmount == 0) {
        $("#vocabSummary").detach();
        $("#tableVocabularyTotalRow").detach();
        substituteVocabularyPercent = "N/A";
        substituteVocabularyGrade = "N/A";
    } else {
        substituteVocabularyPercent = Number(document.getElementById("vocPercent").innerText);
        substituteVocabularyGrade = Number(document.getElementById("vocGrade").innerText);
    }

    //if (document.getElementById("gramPercent").innerText == "")
    if (grammarAmount == 0) {
        $("#grammSummary").detach();
        $("#tableGrammarTotalRow").detach();
        substituteGrammarPercent = "N/A";
        substituteGrammarGrade = "N/A";
    } else {
        substituteGrammarPercent = Number(document.getElementById("gramPercent").innerText);
        substituteGrammarGrade = Number(document.getElementById("gramGrade").innerText);
    }

    //if (document.getElementById("readPercent").innerText == "")
    if (readAmount == 0) {
        $("#readSummary").detach();
        $("#tableReadingTotalRow").detach();
        substituteReadingPercent = "N/A";
        substituteReadingGrade = "N/A";
    } else {
        substituteReadingPercent = Number(document.getElementById("readPercent").innerText);
        substituteReadingGrade = Number(document.getElementById("readGrade").innerText);
    }

    //koniec eliminacji danych z uiejętnościami (listening, reading, etc.), które nie były testowane

    document.getElementById("pointsGained").innerText = document.getElementById("personal_total").innerText;
    document.getElementById("pointsMax").innerText = document.getElementById("total_max_total").innerText;

    var endingTime = new Date();
    //alert(endingTime);
    var correctedAnswersForTutor = (document.getElementById("package").innerHTML + document.getElementById("results1").innerHTML).replace(/[']/gi, "\\'");
    correctedAnswersForTutor = correctedAnswersForTutor.replace(/\s\s/g, "").toString();

    // czyszczenie pustych <li> oraz usunięcie z tabeli kolumny z prawidłowymi odpowiedziami w wysyłce dla studenta
    //$(".corrects").css("display", "none");
    $("#results0  li:empty").remove();

    //w razie potrzeby zakomentować/odkomentować - 4 następne wiersze manipulują odsłanianiem poprawnych wyników
    //$(".corrects").detach();
    //$("td [id*='rslts_texting_']").attr("colspan", "3");
    //$(".res_titles").attr("colspan", "4");
    //$(".total_total").attr("colspan", "4");

    var correctedAnswersForStudentForMail = (document.getElementById("package").innerHTML + document.getElementById("results1").innerHTML);

    var correctedAnswersForStudent = (document.getElementById("package").innerHTML + document.getElementById("results1").innerHTML).replace(/[']/gi, "\\'"); //eskaping apostrofu
    correctedAnswersForStudent = correctedAnswersForStudent.replace(/\s\s/g, "").toString(); //zamiana dwóch spacji na jedną

    document.getElementById('intro_user_name').innerHTML = document.getElementById('userName').value;

    /* 
 █████╗      ██╗ █████╗ ██╗  ██╗                                       
██╔══██╗     ██║██╔══██╗╚██╗██╔╝                                       
███████║     ██║███████║ ╚███╔╝                                        
██╔══██║██   ██║██╔══██║ ██╔██╗                                        
██║  ██║╚█████╔╝██║  ██║██╔╝ ██╗                                       
╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝                                       
                                                                       
 ██████╗ ███╗   ██╗    ███████╗██╗   ██╗██████╗ ███╗   ███╗██╗████████╗
██╔═══██╗████╗  ██║    ██╔════╝██║   ██║██╔══██╗████╗ ████║██║╚══██╔══╝
██║   ██║██╔██╗ ██║    ███████╗██║   ██║██████╔╝██╔████╔██║██║   ██║   
██║   ██║██║╚██╗██║    ╚════██║██║   ██║██╔══██╗██║╚██╔╝██║██║   ██║   
╚██████╔╝██║ ╚████║    ███████║╚██████╔╝██████╔╝██║ ╚═╝ ██║██║   ██║   
 ╚═════╝ ╚═╝  ╚═══╝    ╚══════╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝   ╚═╝   
                                                                       
                                                                                                   
    */

    var postdata = JSON.stringify({
        TestID: document.getElementById('testId').value,
        UserName: document.getElementById('userName').value,
        Finished: "True",
        EndTime: new Date(),
        AnswersForStudent: correctedAnswersForStudent,
        AnswersForTutor: correctedAnswersForTutor,
        ListeningGrade: substituteListeningGrade,
        ListeningPerc: substituteListeningPercent,
        VocabularyGrade: substituteVocabularyGrade,
        VocabularyPerc: substituteVocabularyPercent,
        GrammarGrade: substituteGrammarGrade,
        GrammarPerc: substituteGrammarPercent,
        ReadingGrade: substituteReadingGrade,
        ReadingPerc: substituteReadingPercent,
        //nowe2 27.09.2019
        TotalGrade: document.getElementById("totGrade").innerText,
        TotalPerc: document.getElementById("totPercent").innerText,
        //nowe2 27.09.2019
        Remarks: "Ocena końcowa przed sprawdzeniem pracy pisemnej."
    });
    try {
        $.ajax({
            type: "POST",
            url: "desktopmodules/EngraftService.asmx/UpdateOnSubmit",
            //cache: false,
            //contentType: "application/json; charset=utf-8",
            data: postdata,
            //dataType: "json",
            success: getSuccess,
            error: getFail
        });
    } catch (e) {
        alert(e);
    }

    function getSuccess(data, textStatus, jqXHR) {
        //alert("jqXHR.status = " + jqXHR.status); 
        // alert(data.Response + " - sukces");
        //console.log("Baza danych została zaktualizowana.")
    }

    function getFail(jqXHR, textStatus, errorThrown) {
        alert("Wystąpił błąd zapisu wyników testu w bazie danych.\nKod błędu: " + jqXHR.status + ".\nZgłoś się do lektora z treścią niniejszego komunikatu w celu uzyskania pomocy.");
    }

    // koniec wysyłki do bazy danych /////////////////////////////////////////////////////

    /* 
     █████╗      ██╗ █████╗ ██╗  ██╗    ███╗   ███╗ █████╗ ██╗██╗     
    ██╔══██╗     ██║██╔══██╗╚██╗██╔╝    ████╗ ████║██╔══██╗██║██║     
    ███████║     ██║███████║ ╚███╔╝     ██╔████╔██║███████║██║██║     
    ██╔══██║██   ██║██╔══██║ ██╔██╗     ██║╚██╔╝██║██╔══██║██║██║     
    ██║  ██║╚█████╔╝██║  ██║██╔╝ ██╗    ██║ ╚═╝ ██║██║  ██║██║███████╗
    ╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝╚══════╝
                                                                      
    */

    // wysyłka wynikow emailem /////////////////////////////////////////////////////
    const options = {
        timeZone: "Europe/Warsaw",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit"
    }

    var getdata = JSON.stringify({
        "From": "",
        "To": document.getElementById("userMail").value,
        "Body": "<meta content='text/html; charset=UTF-8' http-equiv='Content-Type'><style>body{width:80%; font-family:Arial,sans-serif; margin:30px auto !important} #demo{height:auto;padding:10px 10px;font-size:1rem;width:80%;line-height:1.3rem;margin:auto;} #fixer{background-color:aliceblue;padding:10px;position:fixed;display:block;right:0;top:50%;margin-right:50px;opacity:0.5;font-weight:bold;color:navy;border:3px navy double;text-align:center;visibility:visible;} #cleaner{position:fixed;display:block;right:0;top:65%;margin-right:45px;z-index:100;} .form-check-input{position:inherit;margin-top:.3rem;margin-left:auto;} .btn-wrapper{top:0;display:block;position:absolute;} .btn.fa{font-size:3rem;} .btn-primary{font-size:16px;} .tabler{display:inline-block;} #time-show{font-size:26px;margin:0 auto;position:relative;display:inline;} [id ^= 'pyt'],.sub-pyt{font-weight:bold;} .form-check-label{display:inline !important; margin-right:30px; margin-left:5px;} .sub-pyt,.sub-opt{padding-left:20px;}#sub-chbx{margin-right:20px;} .draggable{border:1px black solid; margin:5px; text-align:center; width:-moz-fit-content; padding:0 10px; width:-webkit-fit-content; display:inline-block; background-color:white;} .draggable:hover{cursor:pointer;} .draggable:focus{cursor:crosshair;} .dropzone{border:1px black solid; min-height:40px; margin:10px; text-align:center; background-color:white; position:relative; display:block;} .sourcezone{display:block; position:relative; top:10%; border:1px black solid; text-align:center; min-height:40px; height:auto; margin:10px; background-color:lightgrey;} .player-wrapper{margin:20px; text-align:center;} .btn-lg{text-transform:inherit !important;} .text-wrapper{line-height:40px;} .inputter{height:30px; width:150px; padding:5px; text-align:center; margin:0 5px;} .reading-wrapper::before,.reading-wrapper::after{content:'________________________'} .reader{font-family:cursive; padding:10px 20px;} .form-check-input{height:18px; width:18px;} .form-check-label{top:-3px; position:relative;} .parent{padding:10px;} .texting{width:100%; position:relative; margin:10px auto; display:block; height:100px; padding:10px;} .odd{background-color:transparent;} .wrd-ctr{float:right; top:-35px; position:relative; margin-right:26px;} .results{border-collapse:collapse; text-align:center;} .results th,.results td{border:1px solid black; padding:5px;} .results th {background-color:aliceblue} .results tbody{background-color:transparent; color:black;} .results tfoot{background-color:dodgerblue;} .results .total_total{background-color:green; text-align:right; padding-right:10px;} .results .res_titles{text-align:right !important; padding-right:10px;} .results #personal_total,.results #total_max_total{background-color:green;} .results tfoot{color:white;} .results input{width:50px; height:15px;} .results ul{padding-left:20px; margin-bottom:0;} .results ul,.results li{text-align:left;} .evener{background-color:lightblue;}::-webkit-input-placeholder{color:lightgrey; font-style:italic;}::-moz-placeholder{color:lightgrey; font-style:italic;}:-ms-input-placeholder{color:lightgrey; font-style:italic;}:-moz-placeholder{color:lightgrey; font-style:italic;} .maxer{display:block;} .modal.modal-full-height.modal-lg{height:auto; width:50%;} .modal-dialog.modal-notify.modal-body{font-size:initial; line-height:initial;} .summary{padding:0 30px; left:40px; position:relative; top:-70px; margin-bottom:-70px;} #lisGrade, #lisPercent, #readGrade, #readPercent, #gramGrade, #gramPercent, #vocGrade, #vocPercent, #totGrade, #totPercent{font-weight:bold;}</style><title>Wyniki testu</title>" + document.getElementById('package').innerHTML + "<div><p>" + document.getElementById('postRevealInfo').innerHTML + "</p></div>",
        "Subject": document.getElementById('userName').value + ", Twoje wyniki z testu z dnia " + endingTime.toLocaleDateString() + " r., godz. " + endingTime.toLocaleTimeString("pl-PL", options)
    });
    try {
        $.ajax({
            type: "POST",
            //url: "EngraftMailHandler.ashx",
            url: "desktopmodules/EngraftService.asmx/EmailSendOut",
            cache: false,
            contentType: "application/json; charset=utf-8",
            data: getdata,
            dataType: "html",
            success: getSuccess,
            error: getFail
        });
    } catch (e) {
        alert(e);
    }

    function getSuccess(data, textStatus, jqXHR) {
        //alert(data + " - sukces");
        //alert("Email z wynikami został wysłany.\nSprawdź skrzynkę odbiorczą.")
    }

    function getFail(jqXHR, textStatus, errorThrown) {
        alert("Wystąpił błąd w wysyłce emaila z wynikami. Kod błędu: " + jqXHR.status);
    }

    // koniec wysyłki wynikow emailem /////////////////////////////////////////////////////

    $("#intro").css({ "display": "none", "visibility": "hidden" });
    $("#kryteria").css({ "display": "none", "visibility": "hidden" });
    $("#fixer").css({ "display": "none", "visibility": "hidden" });
    $("#package").css({ "display": "block", "visibility": "visible" });
    $("#results1").css({ "display": "none", "visibility": "hidden" });
    $("#demo").html($("#package").html());
    //$("#demo").css({ "display": "none", "visibility": "hidden" });

    //if (localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) != null)
    //{
    //localStorage.removeItem('OnStoppage-' + document.getElementById('testId').value);
    //}

    //$("body").removeAttr("onbeforeunload onunload");


}

//czyszczenie przed zakoczeniem testu ------------------------------------------koniec

/* 
 ██████╗ ███╗   ██╗     ██████╗██╗  ██╗ █████╗ ███╗   ██╗ ██████╗ ███████╗
██╔═══██╗████╗  ██║    ██╔════╝██║  ██║██╔══██╗████╗  ██║██╔════╝ ██╔════╝
██║   ██║██╔██╗ ██║    ██║     ███████║███████║██╔██╗ ██║██║  ███╗█████╗  
██║   ██║██║╚██╗██║    ██║     ██╔══██║██╔══██║██║╚██╗██║██║   ██║██╔══╝  
╚██████╔╝██║ ╚████║    ╚██████╗██║  ██║██║  ██║██║ ╚████║╚██████╔╝███████╗
 ╚═════╝ ╚═╝  ╚═══╝     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚══════╝
                                                                          
*/
//początek sekcji sprawdzającej onchange eventy -----------------------------początek
function onRadiosChange(ev, np) { //normalne radios
    var sibClsName = document.getElementById("rslts_radio_" + np).nextSibling.className;

    document.getElementById("rslts_radio_" + np).innerHTML = ev.target.value;

    if (document.getElementById("rslts_radio_" + np).innerHTML == document.getElementById("rslts_radio_" + np).previousSibling.innerHTML) {
        document.getElementById("rslts_radio_" + np).nextSibling.innerHTML = "1";
        doladowanie(sibClsName);
    } else {
        document.getElementById("rslts_radio_" + np).nextSibling.innerHTML = "0";
        doladowanie(sibClsName);
    }
}

function onCompoundRadiosChange(ev, np, sub_quest_ctr) { //wielopoziomowe radia
    var sibClsName = document.getElementById("rslts_compound_radio_" + np + "_" + sub_quest_ctr).nextSibling.className;

    document.getElementById("rslts_compound_radio_" + np + "_" + sub_quest_ctr).innerHTML = ev.target.value;

    if (document.getElementById("rslts_compound_radio_" + np + "_" + sub_quest_ctr).innerHTML == document.getElementById("rslts_compound_radio_" + np + "_" + sub_quest_ctr).previousSibling.innerHTML) {
        document.getElementById("rslts_compound_radio_" + np + "_" + sub_quest_ctr).nextSibling.innerHTML = "1";
        doladowanie(sibClsName);
    } else {
        document.getElementById("rslts_compound_radio_" + np + "_" + sub_quest_ctr).nextSibling.innerHTML = "0";
        doladowanie(sibClsName);
    }
}

var points = 0;
//region [rgba(80,80,125,0.5)]
function onCheckboxesChange(ev, np, zz, qty) { //normalne checkboxy; z = którego z kolei checkboxa value jest zmieniana; qty = ilość dostępnych opcji wyboru (to nie są prawidłowe odpowiedzi!!!!)
    var myTarget = document.getElementById("rslts_check_" + np); //komórka tabeli wyników
    var list = document.getElementById("results_check_" + np + "_ul"); //element <ul>
    var cls_nme = document.getElementById("rslts_check_" + np).nextSibling.className;

    // var cut_offer = myTarget.innerText.split("↵").length; //ilość pozycji w komórce tabeli wyników
    // var prev_sib_cut_offer = myTarget.previousSibling.innerText.split("\n").length; //ilość pozycji w poprzedzającej komórce tabeli wyników
    // var target_normal_split = myTarget.innerText.split("\n", (cut_offer));
    // var target_reduced_split = myTarget.innerText.split("\n", (cut_offer - 2));
    // var pre_sibl_arry = myTarget.previousSibling.innerText.split("\n", (prev_sib_cut_offer));

    // var target_stringer;
    // var source_stringer;

    //console.log("OnCheckboxesChange: zz = " + zz + ", qty = " + qty);
    if (ev.target.checked == true) { //jeśli checkbox zostaje zaznaczony
        if (myTarget.innerHTML == "") { //jeśli komórka docelowa jest pusta
            var uler = document.createElement("UL"); //tworzenie <ul>
            uler.setAttribute("id", "results_check_" + np + "_ul"); //dodanie atrybutu id
            myTarget.appendChild(uler); // dołączenie <ul> do komórki docelowej

            for (i = 0; i < qty; i++) {
                var lier = document.createElement("LI"); // tworzenie węzłów <li>
                uler.appendChild(lier); //dołączanie węzłów <li> do <ul>
            }

            var lier_text = document.createTextNode(ev.target.value); // tworzenie węzła tekstowego
            var lier = document.createElement("LI"); // tworzenie węzła <li>
            lier.appendChild(lier_text); //dołączanie do rodzica lier (<li>) dziecka lier_text (tekstu)

            uler.replaceChild(lier, uler.childNodes[zz]);

            points = 0;

            var regex = new RegExp("<li>" + ev.target.value + "</li>", "gm");

            if (myTarget.previousSibling.innerHTML.search(regex) != -1) {
                points = points + 1;
            } else {
                points = points - 1;
            }

            myTarget.nextSibling.innerHTML = points;
            doladowanie(cls_nme);
        } else { // jeśi komórka docelowa (myTarget) nie jest pusta
            var lier = document.createElement("LI"); // Create a <li> node
            var lier_text = document.createTextNode(ev.target.value); // Create a text node
            lier.appendChild(lier_text); // Append the text to <li>

            list.replaceChild(lier, list.childNodes[zz]); // Insert <li> before the zz

            points = Number(myTarget.nextSibling.innerHTML);

            var regex = new RegExp("<li>" + ev.target.value + "</li>", "gm");

            if (myTarget.previousSibling.innerHTML.search(regex) != -1) {
                points = points + 1;
            } else {
                points = points - 1;
            }

            myTarget.nextSibling.innerHTML = points;
            doladowanie(cls_nme);
        } ///OK
    } else { //jeśli checkbox zostaje odznaczony
        if (list.childNodes.length >= 1) {
            var list = document.getElementById("results_check_" + np + "_ul"); // Get the <ul> element to insert a new node

            var lier = list.getElementsByTagName("LI")[zz];

            lier.childNodes[0].parentNode.innerHTML = "";

            points = Number(myTarget.nextSibling.innerHTML);

            var regex = new RegExp("<li>" + ev.target.value + "</li>", "gm");

            if (myTarget.previousSibling.innerHTML.search(regex) != -1) {
                points = points - 1;
            } else {
                points = points + 1;
            }
            myTarget.nextSibling.innerHTML = points;
            doladowanie(cls_nme);
            //console.log(regex);
        } else {
            $("#results_check_" + np + "_ul > li").remove(":contains('" + ev.target.value + "')");
            myTarget.removeChild(myTarget.childNodes[0]);
            //console.log(myTarget.innerText.split("\n", (cut_offer - 2)));
        }
    }
}
//endregion

function onCompoundCheckboxesChange(ev, np, zz, qty, sub_quest_ctr) { //wielopoziomowe checkboxy
    var myTarget = document.getElementById("rslts_compound_check_" + np + "_" + sub_quest_ctr); //komórka tabeli wyników
    var list = document.getElementById("results_compound_check_" + np + "_" + sub_quest_ctr + "_ul"); //element <ul>
    var cls_nme = document.getElementById("rslts_compound_check_" + np + "_" + sub_quest_ctr).nextSibling.className;
    // var cut_offer = myTarget.innerText.split("↵").length; //ilość pozycji w komórce tabeli wyników
    // var prev_sib_cut_offer = myTarget.previousSibling.innerText.split("\n").length; //ilość pozycji w poprzedzającej komórce tabeli wyników
    // var target_normal_split = myTarget.innerText.split("\n", (cut_offer));
    // var target_reduced_split = myTarget.innerText.split("\n", (cut_offer - 2));
    // var pre_sibl_arry = myTarget.previousSibling.innerText.split("\n", (prev_sib_cut_offer));

    // var target_stringer;
    // var source_stringer;

    if (ev.target.checked == true) { //jeśli checkbox zostaje zaznaczony
        if (myTarget.innerHTML == "") { //jeśli komórka docelowa jest czysta - wypelnianiekomórki wszystkimi możliwymi odpowiedziami do wyboru
            var uler = document.createElement("UL"); //tworzenie <ul>
            uler.setAttribute("id", "results_compound_check_" + np + "_" + sub_quest_ctr + "_ul"); //dodanie atrybutu id
            myTarget.appendChild(uler); // dołączenie <ul> do komórki docelowej

            for (i = 0; i < qty; i++) {
                var lier = document.createElement("LI"); // tworzenie węzłów <li>
                uler.appendChild(lier); //dołączanie węzłów <li> do <ul>
            }

            var lier_text = document.createTextNode(ev.target.value); // tworzenie węzła tekstowego
            var lier = document.createElement("LI"); // tworzenie węzła <li>
            lier.appendChild(lier_text); //dołączanie do rodzica lier (<li>) dziecka lier_text (tekstu)

            uler.replaceChild(lier, uler.childNodes[zz]);

            points = 0;

            var regex = new RegExp("<li>" + ev.target.value + "</li>", "gm");

            if (myTarget.previousSibling.innerHTML.search(regex) != -1) {
                points = points + 1;
                // }
            } else {
                points = points - 1;
            }

            myTarget.nextSibling.innerHTML = points;
            doladowanie(cls_nme);
        } else { //jeśłi komórka docelowa nie jest pusta
            var lier = document.createElement("LI"); // Create a <li> node
            var lier_text = document.createTextNode(ev.target.value); // Create a text node
            lier.appendChild(lier_text); // Append the text to <li>

            list.replaceChild(lier, list.childNodes[zz]); // Insert <li> before the zz

            points = Number(myTarget.nextSibling.innerHTML);

            var regex = new RegExp("<li>" + ev.target.value + "</li>", "gm");

            if (myTarget.previousSibling.innerHTML.search(regex) != -1) {
                // console.log("+1\nmyTarget.previousSibling.innerText: " + myTarget.previousSibling.innerHTML + "\nregex: " + regex);
                points = points + 1;
            } else {
                points = points - 1;
                // console.log("-1\myTarget.previousSibling.innerText: " + myTarget.previousSibling.innerHTML + "\nregex: " + regex);
            }

            myTarget.nextSibling.innerHTML = points;
            doladowanie(cls_nme);
        } ///OK
    } else { //jeśli checkbox zostaje odznaczony
        if (list.childNodes.length >= 1) {
            var list = document.getElementById("results_compound_check_" + np + "_" + sub_quest_ctr + "_ul"); // Get the <ul> element to insert a new node

            var lier = list.getElementsByTagName("LI")[zz];

            lier.childNodes[0].parentNode.innerHTML = "";

            points = Number(myTarget.nextSibling.innerHTML);

            var regex = new RegExp("<li>" + ev.target.value + "</li>", "gm");

            if (myTarget.previousSibling.innerHTML.search(regex) != -1) {
                points = points - 1;
            } else {
                points = points + 1;
            }
            myTarget.nextSibling.innerHTML = points;
            doladowanie(cls_nme);
            //console.log(regex);
        } else {
            alert("childNodes");
            $("#results_compound_check_" + np + "_" + zz + "_ul > li").remove(":contains('" + ev.target.value + "')");
            myTarget.removeChild(myTarget.childNodes[0]);
            //console.log(myTarget.innerText.split("\n", (cut_offer - 2)));
        }
    }
}

/* 
██╗    ██╗ ██████╗ ██████╗ ██████╗      ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗
██║    ██║██╔═══██╗██╔══██╗██╔══██╗    ██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝
██║ █╗ ██║██║   ██║██████╔╝██║  ██║    ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   
██║███╗██║██║   ██║██╔══██╗██║  ██║    ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   
╚███╔███╔╝╚██████╔╝██║  ██║██████╔╝    ╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   
 ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝      ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   
                                                                                    
*/
// wyliczanie wpisanych słów i onchange Event----------------------------------
function wordcounting(ev, np) {
    var filler = document.getElementById("texting" + np);
    var rslts_filler = document.getElementById("rslts_texting_clone" + np);
    // filler = filler.value.trim();
    // if (filler.value !== "" || filler.value.length != null) {
    //     var words = filler.value.match(/\S+/g).length;
    //     if (words > 200) {
    //         // Split the string on first 200 words and rejoin on spaces
    //         var trimmed = $(this).val().split(/\s+/, 2000).join(" ");
    //         // Add a space at the end to keep new typing making new words
    //         $(this).val(trimmed + " ");
    //     } else {
    //         $("#word-ctr" + np).text(words);
    //         // $('#word_left').text(200-words);

    //     }
    // }

    var words = $.trim(filler.value).length ? filler.value.match(/\S+/g).length : 0;
    if (words <= 200) {
        $('#word-ctr' + np).text(words);
        // $('#word_left').text(200-words)
    } else {
        if (ev.which !== 8) ev.preventDefault();
    }
    rslts_filler.innerHTML = filler.value;
}
// wyliczanie wpisanych słów i onchange Event---------------------------------- koniec

//początek sekcji sprawdzającej onchange eventy -----------------------------początek

// blokada wklejania ----------------------------------

function pasteBanner(ev, np) {
    alert("Nie marnuj czasu na wklejanie tekstu.\nWklejanie jest zablokowane.");
    //$('#exampleModal').addClass("modal fade show").css({ "display": "block", "visibility": "visible" });
    //$('#exampleModalSub').removeClass("modal-right modal-full-height modal-lg modal-frame modal-bottom").addClass("modal-dialog modal-sm modal-notify modal-success");
    //$(".modal-title").text("Nie wklejaj - nie oszukuj sam siebie.");
    //$("#intro").html("<div><p>Wklejanie tekstu jest zablokowane. Nie wstyd Ci? :)</p></div>");
    //$("#package").css({ "display": "none", "visibility": "hidden" });
    //$("#results1").css({ "display": "none", "visibility": "hidden" });
    //$("#kryteria").css({ "display": "none", "visibility": "hidden" });
    //$("#demodaler").html("Zgadzam się");
    //$('#exampleModal').modal();
    //this.html = "";
    ev.preventDefault();


}
// blokada wklejania ----------------------------------

//blokada zatrzymania odtwarzania odtwarzacza
// var iterations;



//var odtwarzacz;

/* 
 █████╗      ██╗ █████╗ ██╗  ██╗     ██████╗ ███████╗███╗   ██╗███████╗██████╗  █████╗ ██╗     
██╔══██╗     ██║██╔══██╗╚██╗██╔╝    ██╔════╝ ██╔════╝████╗  ██║██╔════╝██╔══██╗██╔══██╗██║     
███████║     ██║███████║ ╚███╔╝     ██║  ███╗█████╗  ██╔██╗ ██║█████╗  ██████╔╝███████║██║     
██╔══██║██   ██║██╔══██║ ██╔██╗     ██║   ██║██╔══╝  ██║╚██╗██║██╔══╝  ██╔══██╗██╔══██║██║     
██║  ██║╚█████╔╝██║  ██║██╔╝ ██╗    ╚██████╔╝███████╗██║ ╚████║███████╗██║  ██║██║  ██║███████╗
╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝     ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝
                                                                                               
*/

//noweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
function singleAjaxSender(columnName, columnValue) {
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8", //to trzeba sprawdzać
        data: { UserName: document.getElementById('userName').value, TestID: document.getElementById('testId').value, ColumnName: columnName, ColumnValue: columnValue },
        url: "desktopmodules/EngraftService.asmx/DataSender",
        //dataType: "text",
        cache: false,
        timeout: 3000,
        //async: false,
        success: function(data, xhr) {
            //console.log("Success: " + xhr.statusText);
        },
        error: function(data, xhr) {
            //console.log("Error: " + xhr.statusText);
        }
    });
};
//noweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

/* 
 █████╗ ██╗   ██╗██████╗ ██╗ ██████╗     ██████╗ ██╗      █████╗ ██╗   ██╗███████╗██████╗ 
██╔══██╗██║   ██║██╔══██╗██║██╔═══██╗    ██╔══██╗██║     ██╔══██╗╚██╗ ██╔╝██╔════╝██╔══██╗
███████║██║   ██║██║  ██║██║██║   ██║    ██████╔╝██║     ███████║ ╚████╔╝ █████╗  ██████╔╝
██╔══██║██║   ██║██║  ██║██║██║   ██║    ██╔═══╝ ██║     ██╔══██║  ╚██╔╝  ██╔══╝  ██╔══██╗
██║  ██║╚██████╔╝██████╔╝██║╚██████╔╝    ██║     ███████╗██║  ██║   ██║   ███████╗██║  ██║
╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝     ╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
                                                                                          
*/

function playAudio(ev, nr, np) {
    var odtwarzacz = document.getElementById("player" + nr);
    var iterations = $(odtwarzacz).attr("data-played");

    //noweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    singleAjaxSender("AudiosStarted", odtwarzacz.getAttribute("id").toString());
    //noweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

    $("#plr-butt" + nr).addClass("disabled");
    // console.log("Before Play - iterations:" + iterations);
    odtwarzacz.play();
    // console.log("After Play - iterations:" + iterations);
    iterations++;
    // console.log("Play after iterations++ - iterations:" + iterations);

    $(odtwarzacz).attr("data-played", iterations);
    $("#parent" + np + " > #pyt" + np).animate({
        height: 'toggle'
    }, (odtwarzacz.duration) * 1000);
    // $("#parent" + np + " > #pyt2").html(np + ".");
    // odtwarzacz.loop = true;

    //interwał do wyświetlania mijajacego czasu nagrania
    myInterval1 = setInterval(function() {
        var date1 = new Date(null);
        var date2 = new Date(null);
        date1.setSeconds(odtwarzacz.currentTime);
        date2.setSeconds(odtwarzacz.duration); // specify value for SECONDS here
        var result1 = date1.toISOString().substr(11, 8);
        var result2 = date2.toISOString().substr(11, 8);
        content = "Odtwarzanie nr " + iterations + "<br>";
        content += result1 + "/" + result2;

        document.getElementById("plr-butt" + nr).innerHTML = content;
    }, 1000);

    //interwał do wyświetlania mijajacego czasu nagrania ---------- koniec
}

//var odtwarzacz;

function onLoadedData(ev, nr) {
    if ($('#fixer').css('visibility', 'visible')) {
        //alert("Visibility");

        var odtwarzacz = document.getElementById("player" + nr);

        //$('#player0').attr('html', 'hock');
        //  console.log("OnLoadedData");
        var date = new Date(null);
        if (odtwarzacz != null && odtwarzacz != undefined && odtwarzacz != '') {
            date.setSeconds(odtwarzacz.duration); // specify value for SECONDS here
        }

        var result = date.toISOString().substr(11, 8);
        $("#plr-butt" + nr).append("<br>" + "00:00:00/" + result);
        // document.getElementById("plr-butt" + nr).innerHTML += "<br>" + "00:00:00/" + result;
        // alert("onLoadedData");
    }
}

//var odtwarzacz;
function onEndedEvent(e, nr, np, yy) {
    var odtwarzacz = document.getElementById("player" + nr);
    var iterations = $(odtwarzacz).attr("data-played");
    //  alert("On Ended");
    document.getElementById("plr-butt" + nr).innerHTML = "";

    if (iterations < 2) {
        // console.log("onEndedEvent hit + iterations=" + iterations);
        clearInterval(myInterval1);
        odtwarzacz.load();
        odtwarzacz.currentTime = 0;
        odtwarzacz.play();
        iterations++;
        $(odtwarzacz).attr("data-played", iterations);
        myInterval2 = setInterval(function() {
            var date1 = new Date(null);
            var date2 = new Date(null);
            date1.setSeconds(odtwarzacz.currentTime);
            date2.setSeconds(odtwarzacz.duration); // specify value for SECONDS here
            var result1 = date1.toISOString().substr(11, 8);
            var result2 = date2.toISOString().substr(11, 8);
            content = "Odtwarzanie nr " + iterations + "<br>";
            content += result1 + "/" + result2;

            document.getElementById("plr-butt" + nr).innerHTML = content;
        }, 1000);
    } else {
        clearInterval(myInterval1);
        clearInterval(myInterval2);

        odtwarzacz.pause();

        odtwarzacz.remove();

        $("#plr-butt" + nr).html("Nagranie zakończyło się<br>i już nie jest dostępne").animate({
            height: 'toggle'
        }, 'slow');
        setTimeout(function() {
            $("#parent" + np + " > #pyt" + np).html(np + ". A teraz odpowiedz na pytania dotyczące treści nagrania w pkt. " + np + ".").animate({
                height: 'toggle'
            });
            // $("#parent" + np + " > #pyt2").html(np + ". A teraz odpowiedz na pytania dotyczące treści nagrania");
            $("#parent" + np + " > .player-wrapper").animate({
                height: 'toggle'
            }, 'slow').remove();
            // $("#parent" + np + " > .player-wrapper").remove();
            // $("#parent" + np + " player-wrapper").remove();
        }, 2000);
    }

    // var outtime = setTimeout(function() {
    //     $("plr-butt0").remove();
    // }, 3000);
}

//koniec obsługi odtwarzacza

/* 
██████╗ ██████╗  █████╗  ██████╗     ███╗   ██╗    ██████╗ ██████╗  ██████╗ ██████╗ 
██╔══██╗██╔══██╗██╔══██╗██╔════╝     ████╗  ██║    ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗
██║  ██║██████╔╝███████║██║  ███╗    ██╔██╗ ██║    ██║  ██║██████╔╝██║   ██║██████╔╝
██║  ██║██╔══██╗██╔══██║██║   ██║    ██║╚██╗██║    ██║  ██║██╔══██╗██║   ██║██╔═══╝ 
██████╔╝██║  ██║██║  ██║╚██████╔╝    ██║ ╚████║    ██████╔╝██║  ██║╚██████╔╝██║     
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝     ╚═╝  ╚═══╝    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝     
                                                                                    
*/

//drag and drop functions-----------------------------------------------

var parentFrom;
var parentOn;
var sourceZonePar;
var poczParentFrom;

function allowDrop(ev) {
    parentOn = ev.target.parentElement.id;
    if (parentFrom == parentOn) {
        ev.preventDefault();
    } else {}
}

function onDragstartdraggable(ev, poczParentFrom) {
    parentFrom = ev.target.parentElement.parentElement.id;
    poczParentFrom = ev.target.parentElement.clientHeight;
    // //console.log("Wysokość początkowa: " + poczParentFrom + " px");
    sourceZonePar = ev.target.parentElement.id;
    ev.dataTransfer.setData("text/html", ev.target.id);
    ev.target.style.cursor = "grabbing";
}

//region [rgba(50, 120, 50, 0.5)] for draggables

function drop(ev, np) {
    if (parentFrom == parentOn) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text/html");
        ev.target.appendChild(document.getElementById(data));
        // alert("ev.target.parentElement.id: " + ev.target.parentElement.id); important!!!
        document.getElementById("rslts_drag_" + np).innerHTML = ev.target.innerHTML; //kopiowanie tekstu przesuwanych elementów do komórki tabeli z wynikami

        var corr_drags_array = (document.getElementById("rslts_drag_" + np).previousElementSibling.innerHTML); //.split("</li>"); //tworzenie tablicy z prawidłowymi odpowiedziami
        // corr_drags_array.pop(); //usuwanie pustego, ostatniego stringu z tablicy
        // console.log("document.getElementById('rslts_drag_" + np + ").previousElementSibling.innerHTML: " + document.getElementById("rslts_drag_" + np).previousElementSibling.innerHTML + "\ncorr_drags_array: " + corr_drags_array);
        // //korekta położenia przecinka w zdaniu-----------------początek
        // if ((document.getElementById("rslts_drag_" + np).innerText).endsWith(".") || (document.getElementById("rslts_drag_" + np).innerText).endsWith("?") || (document.getElementById("rslts_drag_" + np).innerText).endsWith("!")) {
        //     document.getElementById("rslts_drag_" + np).innerText = document.getElementById("rslts_drag_" + np).innerText.slice(0, (document.getElementById("rslts_drag_" + np).innerText.length - 2)) + document.getElementById("rslts_drag_" + np).innerText.slice(document.getElementById("rslts_drag_" + np).innerText.length - 1, document.getElementById("rslts_drag_" + np).innerText.length);
        //     //console.log(document.getElementById("rslts_drag_" + np).innerText);
        //                 //korekta położenia przecinka w zdaniu-----------------koniec

        //korekta znaków przestankowych w zdaniu i w śordku zdania
        var str = document.getElementById("rslts_drag_" + np).innerHTML;
        // document.getElementById("rslts_drag_" + np).innerText = document.getElementById("rslts_drag_" + np).innerText.replace(/\b\s(,)|\b\s(;)|\b\s(!)|\b\s(\?)|\b\s(\.)$/gi, "$1$2$3$4$5 ");
        document.getElementById("rslts_drag_" + np).innerText = document.getElementById("rslts_drag_" + np).innerText.trim();
        document.getElementById("rslts_drag_" + np).innerText = document.getElementById("rslts_drag_" + np).innerText.replace(/  /g, " ");

        // }
        var cls_nme = document.getElementById("rslts_drag_" + np).nextSibling.className;

        // for (i = 0; i < corr_drags_array.length; i++) { //sprawdzenie w pętli czy układanka dragów znajduje się choć w jednym polu tablicy poprawnych odpowiedzi
        //     if (corr_drags_array[i] == document.getElementById("rslts_drag_" + np).innerText) {
        //         document.getElementById("rslts_drag_" + np).nextElementSibling.innerHTML = "1";
        //         console.log("corr_drags_array[" + i + "]: " + corr_drags_array[i]);
        //         //return; //jeśli znaleziono, to wypierdalamy z pętli.
        //         doladowanie(cls_nme);
        //     } else {
        //         // console.log(document.getElementById("rslts_drag_" + np).innerText);
        //         document.getElementById("rslts_drag_" + np).nextElementSibling.innerHTML = "0";

        //     }

        //     // doladowanie(cls_nme);
        // }

        document.getElementById("rslts_drag_" + np).innerText = document.getElementById("rslts_drag_" + np).innerText.replace(/\b\s(,)|\b\s(;)|\b\s(!)|\b\s(\?)|\b\s(\.)$/gi, "$1$2$3$4$5");
        document.getElementById("rslts_drag_" + np).innerHTML = (document.getElementById("rslts_drag_" + np).innerText).trim();

        //console.log("document.getElementById('rslts_drag_" + np + "').innerHTML: " +
        //    document.getElementById("rslts_drag_" + np).innerHTML);

        var the_gem = "<li>" + document.getElementById("rslts_drag_" + np).innerHTML + "</li>";

        // console.log("the_gem:" + the_gem);
        if (corr_drags_array.includes(the_gem) == true) {
            // console.log("corr_drags_array:" + (corr_drags_array) + "\n<li>" + (document.getElementById("rslts_drag_" + np).innerText) + "</li>");
            // console.log("OK");
            document.getElementById("rslts_drag_" + np).nextElementSibling.innerHTML = "1";
        } else {
            // console.log("corr_drags_array:" + (corr_drags_array) + "\n<li>" + (document.getElementById("rslts_drag_" + np).innerText) + "</li>");
            // console.log(" Not OK");
            document.getElementById("rslts_drag_" + np).nextElementSibling.innerHTML = "0";
        }
        doladowanie(cls_nme);
    }

    // if ((document.getElementById("rslts_drag_" + np).previousElementSibling.innerText).indexOf(document.getElementById("rslts_drag_" + np).innerText) != -1) {
    //     //console.log("document.getElementById('rslts_drag_' + np).innerText): " + document.getElementById("rslts_drag_" + np).innerText);
    //     document.getElementById("rslts_drag_" + np).nextElementSibling.innerHTML = "1";
    // } else {
    //     document.getElementById("rslts_drag_" + np).nextElementSibling.innerHTML = "0";
    // }
    else {
        ev.stopPropagation();
        // //console.log("From drop - parentFrom: " + parentFrom + "; parentOn: " + parentOn);
        alert("ondrop - Nie można upuszczać tego elementu na to pole");
    }
}
//endregion

function onSourceDrop(ev, np) {
    if (parentFrom == parentOn) {
        ev.preventDefault();
        var data = ev.dataTransfer.getData("text/html");
        ev.target.appendChild(document.getElementById(data));
        // alert("ev.target.parentElement.id: " + ev.target.parentElement.id); important!!!
        document.getElementById("rslts_drag_" + np).innerHTML = document.getElementById(sourceZonePar).innerText; //jeśli drag zostanie cofnięty do pola sourcezone
        document.getElementById("rslts_drag_" + np).nextElementSibling.innerHTML = 0; //jeśli drag zostanie cofnięty do pola sourcezone
    } else {
        ev.stopPropagation();
        // //console.log("From drop - parentFrom: " + parentFrom + "; parentOn: " + parentOn);
        // alert("ondrop - Nie można upuszczać tego elementu na to pole");
    }
}

function onDragoverdraggable(ev) {
    ev.stopPropagation();
}

function onMousedowndraggable(ev) {
    if ($(ev.target).attr("draggable")) {
        // alert($(ev.target).attr("draggable"));
        ev.target.style.cursor = "grab";
        ev.target.style.border = "1px dashed black";
    } else {
        ev.target.style.border = "1px solid black";
    }
}

function onMouseoutdraggable(ev) {
    ev.target.style.cursor = "pointer";
    // ev.target.style.border = "1px solid black";
}

function onDragenddraggable(ev) {
    var initSourceZoneHeight;
    ev.target.style.cursor = "pointer";
    ev.target.style.border = "1px solid black";
    // alert("ev.target.id: " + ev.target.id);
    // ev.target.style.cursor = "no-drop";
    // alert("Dragend");
}

function onDragdraggable(ev) {
    ev.target.style.cursor = "grabbing";
    ev.target.style.border = "1px dashed black";
}

function onMouseupdraggable(ev) {
    ev.target.style.border = "1px solid black";
    ev.target.style.cursor = "pointer";
}

//drag and drop functions-------------------------------------------koniec

//skomentowałem poniższe 4 linijki, bo były kopią fukcji pod nimi
//function onInputInput(ev, np)
//{
//    var myTarget = document.getElementById("rslts_input_" + np); //komórka tabeli wyników
//    myTarget.nextSibling.innerText = 0;
//}

/* 
██╗███╗   ██╗██████╗ ██╗   ██╗████████╗███████╗
██║████╗  ██║██╔══██╗██║   ██║╚══██╔══╝██╔════╝
██║██╔██╗ ██║██████╔╝██║   ██║   ██║   ███████╗
██║██║╚██╗██║██╔═══╝ ██║   ██║   ██║   ╚════██║
██║██║ ╚████║██║     ╚██████╔╝   ██║   ███████║
╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝    ╚═╝   ╚══════╝
                                               
*/
//region [rgba(120,80,80,0.5)] gap filling - inputy


function onInputInput(ev, np, zz, gaap_ctr) {
    var myTarget = document.getElementById("rslts_input_" + np); //komórka tabeli wyników
    var list = document.getElementById("results_input_" + np + "_ul"); //element <ul>
    var corr_list = document.getElementById("gapcorrects_" + np + "_ul");
    var iii;
    var pointss = 0;
    var regexer;

    if (ev.target.value != "") { //jeśli inputbox nie jest pusty
        list.childNodes[zz].innerText = ev.target.value;
        dodawanie();
    } else {
        list.childNodes[zz].innerText = "";
        dodawanie();
    }

    function dodawanie() {
        //stara opcja
        //for (iii = 0; iii < gaap_ctr; iii++)
        //{
        //    regexer = new RegExp("\\b" + list.childNodes[iii].innerText + "\\b", "gi");
        //    if (corr_list.childNodes[iii].innerText.search(regexer) != -1 && list.childNodes[iii].innerText != "")
        //    {
        //        pointss = pointss + 1;
        //    }
        //}

        //nowa opcja
        for (iii = 0; iii < gaap_ctr; iii++) {

            //regexer = new RegExp("(?=\\b|^)" + list.childNodes[iii].innerText + "\\b(?=\/|\b|$)(?!\s|')", "gi"); //good one?

            regexer = new RegExp("(?=\/|\\b|^|')" + list.childNodes[iii].innerText + "(?=\\?|\\.|\\!|\/|$)", "gim");

            if (corr_list.childNodes[iii].innerText.search(regexer) != -1 && list.childNodes[iii].innerText != "")
            //if (corr_list.childNodes[iii].innerText == regexer)
            {
                //console.log("corr_list.childNodes[iii].innerText = " + corr_list.childNodes[iii].innerText + "\nregexer = " + regexer);
                //console.clear();
                //console.log("pointss before = " + pointss);
                pointss = pointss + 1;
                //console.log("pointss after = " + pointss);
            } else {
                //console.log("No shit");
            }
        }
    }
    myTarget.nextSibling.innerText = parseInt(pointss);
    var cls_nme = myTarget.nextSibling.className;
    doladowanie(cls_nme);
}

//endregion

/* 
████████╗██╗███╗   ███╗███████╗██████╗ 
╚══██╔══╝██║████╗ ████║██╔════╝██╔══██╗
   ██║   ██║██╔████╔██║█████╗  ██████╔╝
   ██║   ██║██║╚██╔╝██║██╔══╝  ██╔══██╗
   ██║   ██║██║ ╚═╝ ██║███████╗██║  ██║
   ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝
                                       
*/
//timer functions---------------------------------------------------

function startTimer(duration, display) {
    //duration = testTime = localStorage.getItem('OnStoppage-' + document.getElementById('testId').value);
    var timer = duration,
        hours, minutes, seconds;
    wal = setInterval(function() {
        hours = parseInt(timer / 3600, 10);
        minutes = parseInt(timer % 3600 / 60, 10);
        seconds = parseInt(timer % 60, 10);

        if (minutes == 60) {
            minutes = 00;
        }
        //hours = myObj.test.Time.substr(0, 2);
        //minutes = myObj.test.Time.substr(3, 2);
        //seconds = myObj.test.Time.substr(6, 2);
        //hours = localStorage.getItem('OnStoppage-' + document.getElementById('testId').value).substr(0, 2);
        //minutes = localStorage.getItem('OnStoppage-' + document.getElementById('testId').value).substr(3, 2);
        //seconds = localStorage.getItem('OnStoppage-' + document.getElementById('testId').value).substr(6, 2);


        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        //localStorage.setItem('OnStoppage-' + document.getElementById('testId').value, hours + ":" + minutes + ":" + seconds);

        display.innerHTML = "Czas do zakończenia testu:<br><span id='time-show' class='center'>" + hours + ":" + minutes + ":" + seconds + "</span>";


        // kiedy zegar wybija 0 (koniec testu ze względu na upływ czas) -------------
        if (--timer < 0) {
            timer = 0;
            $("#exampleModal").modal();
            onCleaning();
            //// dezaktywowanie wszystkich inputów
            //var atryb = document.querySelectorAll('input');
            //for (var i = 0; i < atryb.length; i++) {
            //    atryb[i].setAttribute("disabled", "");
            //}
            //// dezaktywowanie wszystkich draggablów
            //var atryb_draggable = document.querySelectorAll('.draggable');
            //for (var i = 0; i < atryb_draggable.length; i++) {
            //    // atryb_draggable[i].setAttribute("draggable", "false");
            //    atryb_draggable[i].removeAttribute("draggable");
            //}
            //// dezaktywowanie wszystkich przycisków
            //var atryb_butt = document.querySelectorAll('button');

            //for (var i = 0; i < atryb_butt.length; i++) {
            //    $(atryb_butt[i]).addClass("disabled").removeClass("active").html("Test zakończył się.");
            //    clearInterval(myInterval1);
            //    clearInterval(myInterval2);
            //}

            //var audio_plyr = document.querySelectorAll('audio');
            //for (var i = 0; i < audio_plyr.length; i++) {
            //    // $(audio_plyr[i]).pause = true;
            //    $(audio_plyr[i]).remove();
            //    $(atryb_butt[i]).html("Test zakończył się.");
            //    clearInterval(myInterval1);
            //    clearInterval(myInterval2);
            //}

            //// kiedy zegar wybija 0 (koniec testu ze względu na upływ czasu) ------------- koniec

            //var outtime = setTimeout(function () {
            //    display.innerHTML = "<span id='time-show'>Test zakończył się.</span>";
            //}, 3000);
            //// clearTimeout(outtime);
            //clearInterval(wal);
            //clearInterval(myInterval1);
            //clearInterval(myInterval2);
        }
    }, 1000);
}
//timer functions------------------------------------------koniec
/* 
██████╗ ██████╗  █████╗  ██████╗     ███╗   ██╗    ██████╗ ██████╗  ██████╗ ██████╗     
██╔══██╗██╔══██╗██╔══██╗██╔════╝     ████╗  ██║    ██╔══██╗██╔══██╗██╔═══██╗██╔══██╗    
██║  ██║██████╔╝███████║██║  ███╗    ██╔██╗ ██║    ██║  ██║██████╔╝██║   ██║██████╔╝    
██║  ██║██╔══██╗██╔══██║██║   ██║    ██║╚██╗██║    ██║  ██║██╔══██╗██║   ██║██╔═══╝     
██████╔╝██║  ██║██║  ██║╚██████╔╝    ██║ ╚████║    ██████╔╝██║  ██║╚██████╔╝██║         
╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝     ╚═╝  ╚═══╝    ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝         
                                                                                        
 ██████╗████████╗██████╗                                                                
██╔════╝╚══██╔══╝██╔══██╗                                                               
██║        ██║   ██║  ██║                                                               
██║        ██║   ██║  ██║                                                               
╚██████╗   ██║   ██████╔╝                                                               
 ╚═════╝   ╚═╝   ╚═════╝                                                                
                                                                                        
*/
//ustawianie wysokości sourcezone/dropzone, aby pomieściły draggables
function dimensioning() {
    var initDropZoneHeight = [];
    var initSourceZoneHeight = [];
    var x = document.getElementsByClassName("dropzone");
    var y = document.getElementsByClassName("sourcezone");
    var i;

    for (i = 0; i < y.length; i++) {
        initSourceZoneHeight[i] = y[i].clientHeight;
        initDropZoneHeight[i] = x[i].clientHeight;
        $("#sourcezone" + i).css("min-height", initSourceZoneHeight[i]);
        $("#dropzone" + i).css("height", initSourceZoneHeight[i]);
        // ("#sourcezone0").height("350px");
        // //console.log("sourcezone" + i) + " height is: " + initSourceZoneHeight[i];
    }
}
//ustawianie wysokości sourcezone/dropzone, aby pomieściły draggables - koniec

//word counter in textareas ------------------------------------
// function onTxtAreaInputter(e, np) {
//     // alert("Writer");
//     // var numOfWords = $("#writer" + np).val().replace(/^[\s,.;]+/, "").replace(/[\s,.;]+$/, "").split(/[\s,.;]+/).length;
//     var words = $('#writer' + np).val().split(/[\s\.,;]+/);

//     $("#writer" + np).append(words.length);
// }

/* 
██████╗ ████████╗███████╗        ██████╗ ███████╗██████╗  ██████╗
██╔══██╗╚══██╔══╝██╔════╝        ██╔══██╗██╔════╝██╔══██╗██╔════╝
██████╔╝   ██║   ███████╗        ██████╔╝█████╗  ██████╔╝██║     
██╔═══╝    ██║   ╚════██║        ██╔═══╝ ██╔══╝  ██╔══██╗██║     
██║        ██║   ███████║        ██║     ███████╗██║  ██║╚██████╗
╚═╝        ╚═╝   ╚══════╝        ╚═╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝
                                                                 
 ██████╗ █████╗ ██╗      ██████╗███████╗                         
██╔════╝██╔══██╗██║     ██╔════╝██╔════╝                         
██║     ███████║██║     ██║     ███████╗                         
██║     ██╔══██║██║     ██║     ╚════██║                         
╚██████╗██║  ██║███████╗╚██████╗███████║                         
 ╚═════╝╚═╝  ╚═╝╚══════╝ ╚═════╝╚══════╝                         
                                                                 
*/

function doladowanie(cls_nme) {
    if (cls_nme.search(/\bvocabulary\b/gi) != -1) {
        var list_total = 0;
        for (i = 0; i < document.getElementsByClassName("vocabulary").length; i++) {
            list_total = list_total + parseInt(document.getElementsByClassName("vocabulary")[i].innerText);
        }
        document.getElementById("vocabulary_total").innerHTML = list_total;
    } else if (cls_nme.search(/\blistening\b/gi) != -1) {
        var list_total = 0;
        for (i = 0; i < document.getElementsByClassName("listening").length; i++) {
            list_total = list_total + parseInt(document.getElementsByClassName("listening")[i].innerText);
        }
        document.getElementById("listening_total").innerHTML = list_total;
    } else if (cls_nme.search(/\bgrammar\b/gi) != -1) {
        var list_total = 0;
        for (i = 0; i < document.getElementsByClassName("grammar").length; i++) {
            list_total = list_total + parseInt(document.getElementsByClassName("grammar")[i].innerText);
        }
        document.getElementById("grammar_total").innerHTML = list_total;
    } else if (cls_nme.search(/\breading\b/gi) != -1) {
        var list_total = 0;
        for (i = 0; i < document.getElementsByClassName("reading").length; i++) {
            list_total = list_total + parseInt(document.getElementsByClassName("reading")[i].innerText);
        }
        document.getElementById("reading_total").innerHTML = list_total;
    }

    var personal_total = 0;
    for (i = 0; i < document.getElementsByClassName("personal_total").length; i++) {
        personal_total = parseInt(personal_total) + parseInt(document.getElementsByClassName("personal_total")[i].innerText);
    }
    document.getElementById("personal_total").innerText = parseInt(personal_total);

    //wyliczenia prcentowe i klasyfikacja ocen

    var listening_percentage;
    var vocabulary_percentage;
    var grammar_percentage;
    var reading_percentage;
    var total_percentage;

    listening_percentage = document.getElementById("listening_total").innerText / document.getElementById("listening_max_total").innerText;
    listening_percentage = Math.round(listening_percentage * 100);
    $("#lisPercent").text(listening_percentage);
    var grade = grading("listening", listening_percentage);
    $("#lisGrade").text(grade);

    //console.log("listening_percentage: " + listening_percentage + "; grade: " + grade);

    vocabulary_percentage = document.getElementById("vocabulary_total").innerText / document.getElementById("vocabulary_max_total").innerText;
    vocabulary_percentage = Math.round(vocabulary_percentage * 100);
    var grade = grading("vocabulary", vocabulary_percentage);
    $("#vocPercent").text(vocabulary_percentage);
    $("#vocGrade").text(grade);
    // console.log("vocabulary_percentage: " + vocabulary_percentage + "; grade: " + grade);

    grammar_percentage = document.getElementById("grammar_total").innerText / document.getElementById("grammar_max_total").innerText;
    grammar_percentage = Math.round(grammar_percentage * 100);
    $("#gramPercent").text(grammar_percentage);
    var grade = grading("grammar", grammar_percentage);
    $("#gramGrade").text(grade);
    // console.log("grammar_percentage: " + grammar_percentage + "; grade: " + grade);

    reading_percentage = document.getElementById("reading_total").innerText / document.getElementById("reading_max_total").innerText;
    reading_percentage = Math.round(reading_percentage * 100);
    $("#readPercent").text(reading_percentage);
    var grade = grading("reading", reading_percentage);
    $("#readGrade").text(grade);
    // console.log("reading_percentage: " + reading_percentage + "; grade: " + grade);

    total_percentage = document.getElementById("personal_total").innerText / document.getElementById("total_max_total").innerText;
    total_percentage = Math.round(total_percentage * 100);
    $("#totPercent").text(total_percentage);
    var grade = grading("total", total_percentage);
    $("#totGrade").text(grade);
}

function grading(skilll, skilll_percentage) {
    if (skilll_percentage <= 54) {
        return grade = (2.0).toFixed(1);
    } else if (skilll_percentage > 54 && skilll_percentage <= 62) {
        return gradee = (3.0).toFixed(1);
    } else if (skilll_percentage > 62 && skilll_percentage <= 70) {
        return grade = (3.5).toFixed(1);
    } else if (skilll_percentage > 70 && skilll_percentage <= 79) {
        return grade = (4.0).toFixed(1);
    } else if (skilll_percentage > 79 && skilll_percentage <= 86) {
        return grade = (4.5).toFixed(1);
    } else if (skilll_percentage > 86 && skilll_percentage <= 95) {
        return grade = (5.0).toFixed(1);
    } else if (skilll_percentage > 95 && skilll_percentage <= 100) {
        return grade = (6.0).toFixed(1);
    }
}

// window.addEventListener("load", function(event) {
//     console.log("All resources finished loading!");
// });

//sprawdzenie czy #fixer jest widoczny: jeśłi tak, to znaczy, że użytkownik nie robil jeszcze tego testu i mozna ustawić wartość StartTime w jquey ajax post

/* 
███████╗████████╗ ██████╗ ██████╗ ██████╗  █████╗  ██████╗ ███████╗
██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗██╔══██╗██╔══██╗██╔════╝ ██╔════╝
███████╗   ██║   ██║   ██║██████╔╝██████╔╝███████║██║  ███╗█████╗  
╚════██║   ██║   ██║   ██║██╔═══╝ ██╔═══╝ ██╔══██║██║   ██║██╔══╝  
███████║   ██║   ╚██████╔╝██║     ██║     ██║  ██║╚██████╔╝███████╗
╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
                                                                   
*/
function onStoppage() {
    //console.log("Stoppage commenced");
    //alert(document.getElementById('time-show').innerHTML);
    //console.log(document.getElementById('time-show').innerHTML);

    //if ($("#cleaner").text() == "Test zakończył się.") {
    //    localStorage.removeItem('OnStoppage-' + document.getElementById('testId').value);
    //}
    //else {
    //    localStorage.setItem('OnStoppage-' + document.getElementById('testId').value, document.getElementById('time-show').innerText);
    //}

    /// added on 15 April 2019 16:25 *******************
    if ($("#time-show").css("visibility") == "visible") {
        var getdata2 = JSON.stringify({
            StoppageTime: document.getElementById('time-show').innerText,
            TestID: document.getElementById('testId').value,
            UserName: document.getElementById('userName').value
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            //dataType: "html",
            cache: false,
            url: "desktopmodules/EngraftService.asmx/ChangeStoppageTime",
            data: getdata2,
            async: false,
            //dataType: "json",
            error: function(data) {
                alert("Błąd aktulizacji bazy danych.\nSpróbuj ponownie za chwilę.");
            }
        });
    }

    ///*******************************************************************
    //localStorage.setItem('OnStoppage-' + document.getElementById('testId').value, document.getElementById('time-show').innerText);



    //if ((localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) == "NaN:NaN:NaN") || (localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) == ": :")) {
    //    localStorage.removeItem('OnStoppage-' + document.getElementById('testId').value);
    //}
    //else {
    //    localStorage.setItem('OnStoppage-' + document.getElementById('testId').value, document.getElementById('time-show').innerText);
    //};
};




var d = new Date();
//window.addEventListener('DOMContentLoaded', function () {
$(document).ready(function() {
    //alert("documentready");


    /* 
     █████╗      ██╗ █████╗ ██╗  ██╗                                      
    ██╔══██╗     ██║██╔══██╗╚██╗██╔╝                                      
    ███████║     ██║███████║ ╚███╔╝                                       
    ██╔══██║██   ██║██╔══██║ ██╔██╗                                       
    ██║  ██║╚█████╔╝██║  ██║██╔╝ ██╗                                      
    ╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝                                      
                                                                          
    ██╗      ██████╗  █████╗ ██████╗     ██████╗  █████╗ ████████╗ █████╗ 
    ██║     ██╔═══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
    ██║     ██║   ██║███████║██║  ██║    ██║  ██║███████║   ██║   ███████║
    ██║     ██║   ██║██╔══██║██║  ██║    ██║  ██║██╔══██║   ██║   ██╔══██║
    ███████╗╚██████╔╝██║  ██║██████╔╝    ██████╔╝██║  ██║   ██║   ██║  ██║
    ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝     ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
                                                                          
    */

    setTimeout(function() { callAjax(); }, 1000); //opóżnienie wywołania ajax, aby zebral dane ze strony
    //callAjax();


    function callAjax() {
        $.ajax({
            type: "POST",
            contentType: "application/x-www-form-urlencoded; charset=UTF-8", //to trzeba sprawdzać
            data: { UserName: document.getElementById('userName').value, TestID: document.getElementById('testId').value },
            url: "desktopmodules/EngraftService.asmx/LoadData",
            //dataType: "text",
            cache: false,
            timeout: 7000,
            //async: false,
            success: function(data, xhr) {

                $("#checker").html(data);

                // examples and tasks
                // $(".reading-section").next().children().first().addClass("task");
                // $(".writing-section").next().children().first().addClass("task");
                // $(".listening-section").next().children().siblings().first().addClass("task");
                // examples and tasks

                $('#exampleModalSub').removeClass("modal-right").removeClass("modal-full-height").removeClass("modal-lg").addClass("modal-sm");
                var package = $("#package");
                var resultsOne = $("#results1");
                package.css({ "display": "none", "visibility": "hidden" });
                resultsOne.css({ "display": "none", "visibility": "hidden" });
                //console.log("#fixer visible; dbFinished = " + dbFinished);

                //hrs = hrs < 10 ? "0" + hrs : hrs;

                //console.log("time-show: " + document.getElementById("time-show").innerText + "\ntotalTestTime: " + document.getElementById("totalTestTime").value + "\nhrs: " + hrs + "\nmins: " + mins + "\nsecs: " + secs + "\nlocalStorage.getItem(OnStoppage- + document.getElementById(testId).value: " + localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) + "\ndbStoppageTime: " + dbStoppageTime);
                //if ($("#fixer").css("visibility") == "visible") {

                if (!((dbUserName == "") || (dbUserName == undefined) || (dbUserName == null))) {
                    if (dbFinished == "False") {
                        //nowe1 27.09.2019
                        if (!!dbAudiosStarted) {
                            $(function() {
                                $('[data-toggle="tooltip"]').tooltip()
                            })
                            $("audio").each(function() {
                                var incl = dbAudiosStarted.includes($(this).attr("id") + " ");
                                if (incl) {
                                    $(this).parent().attr({ "data-toggle": "tooltip", "data-placement": "top", "title": "To nagranie już było przez Ciebie odtwarzane!", "data-html": "true" }).end().siblings("button").attr("disabled", true).text("This recording has already been played by you!").removeClass("btn-primary").addClass("btn-danger").end().remove();
                                }
                            })
                        }
                        //nowe1 27.09.2019

                        //if ((hrs + ":" + mins + ":" + secs).toString() != (document.getElementById("totalTestTime").value).toString()) {
                        //if ((localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) != "") && (localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) != null)) {
                        if (!((dbStoppageTime == "") || (dbStoppageTime == "NaN:NaN:NaN") || (dbStoppageTime == undefined) || (dbStoppageTime == null) || (dbStoppageTime == ": :"))) {
                            //console.log("Crazy dbStoppageTime");
                            hours = dbStoppageTime.substr(0, 2);
                            minutes = dbStoppageTime.substr(3, 2);
                            seconds = dbStoppageTime.substr(6, 2);

                            hours = parseInt(hours * 3600, 10);
                            minutes = parseInt(minutes * 60, 10);
                            seconds = parseInt(seconds, 10);

                            duration = hours + minutes + seconds;
                            //console.log("duration 2204:" + duration);
                            //console.log("dbStoppageTime 2200: " + dbStoppageTime);
                            //localStorage.setItem('OnStoppage-' + document.getElementById('testId').value, dbStoppageTime);
                            $("#demodaler").html("Zamknij");
                            $('#exampleModalSub').removeClass("modal-sm");
                            $(".modal-title").text("Test z j. angielskiego - kontynuacja");
                            $("#intro").html("<div><p><b>" + document.getElementById('userName').value + "</b>, kontynuujesz pracę z najnowszym testem z jęz. angielskiego ponieważ przerwałeś (-aś) ją kiedy zegar odliczania czasu trwania testu pokazywał wartość <b>" + dbStoppageTime + "</b>.</p>Ilość zadań: <b>" + iloscZadan + "</b>.</p><p><b>Uwaga!</b> Pamiętaj, że zamknięcie i następnie ponowne otwarcie okna przeglądarki nie spowoduje zresetowania czasu trwania testu.</p><p>W związku z tym nie zaleca się przerywania pracy nad rozwiązywaniem testu aż do jego <u>ukończenia</u>.</p></div>");
                            addOnUnloadAttributes();
                            $(function() {
                                $('#exampleModal').modal('show');
                            });
                        } else {
                            //hours = hrs;
                            //minutes = mins;
                            //seconds = secs;

                            hours = document.getElementById("totalTestTime").value.substr(0, 2);
                            minutes = document.getElementById("totalTestTime").value.substr(3, 2);
                            seconds = document.getElementById("totalTestTime").value.substr(6, 2);

                            hours = parseInt(hours * 3600, 10);
                            minutes = parseInt(minutes * 60, 10);
                            seconds = parseInt(seconds, 10);

                            duration = hours + minutes + seconds;
                            //console.log("duration 2226: " + duration);
                            //hrs = parseInt(Number(hrs) * 3600);
                            //mins = parseInt(Number(mins) * 60);
                            //secs = parseInt(Number(secs));
                            //duration = hrs + mins + secs;
                            //startTimer(duration, display);

                            //if (hrs != 0 && mins != 0 && secs != 0) {
                            //    localStorage.setItem('OnStoppage-' + document.getElementById('testId').value, hrs + ":" + mins + ":" + secs);
                            //}
                            //else {
                            //    localStorage.setItem('OnStoppage-' + document.getElementById('testId').value, document.getElementById('totalTestTime').value);
                            //}


                            $("#demodaler").html("Zamknij");
                            $('#exampleModalSub').removeClass("modal-sm");
                            $(".modal-title").text("Test z j. angielskiego");
                            $("#intro").html("<div><p><b style='font-weight:bolder;'>" + document.getElementById('userName').value + "</b>, przed Tobą najnowszy test z jęz. angielskiego.</p><p>Czas trwania: <b>" + document.getElementById('totalTestTime').value + "</b>. Ilość zadań<b>: " + iloscZadan + "</b>.</p><p>Kliknięcie przycisku <b>\"Zamknij\"</b> spowoduje zamknięcie tego okna i rozpoczęcie odliczania czasu do zakończenia testu.</p><p><b>Uwaga!</b> Zamknięcie i następnie ponowne otwarcie okna przeglądarki nie spowoduje zresetowania czasu trwania testu.</p><p>W związku z tym nie zaleca się przerywania pracy nad rozwiązywaniem testu aż do jego <u>ukończenia</u>.</p></div>");
                            addOnUnloadAttributes();
                            $(function() {
                                $('#exampleModal').modal('show');
                            });
                        }


                    } else {
                        $("#demodaler").html("Zamknij");
                        $("#kryteria").css({ "display": "none", "visibility": "hidden" });
                        $(".modal-title").text("Test już zrobiony.")
                        $("#intro").html("<p>Ten test już rowiązywałeś/-łaś.</p><p>Kliknij przycisk \"Zamknij\", aby zapoznać się z wynikami.</p>");

                        //localStorage.removeItem('OnStoppage-' + document.getElementById('testId').value);
                        var revealDate = new Date(document.getElementById("revealDate").value);
                        var currentDate = new Date();
                        if (revealDate - currentDate >= 0) {

                            //$("#results0").css({ "display": "none", "visibility": "hidden" });    //stara opcja

                            ////Manipulating the columns visibility--------------------------------------------------------------
                            $(".results tr td:nth-last-child(1), .results tr th:nth-last-child(1), .results tr td:nth-last-child(2), .results tr th:nth-last-child(2), .results tr td:nth-last-child(4), .results tr th:nth-last-child(4)").hide();
                            $(".results tr td").filter(function() {
                                $(this).filter(":contains('Writing')").siblings(":eq(0), :eq(1), :eq(2), :eq(3)").css("display", "table-cell").siblings(":eq(5)").css({ "display": "table-cell", "width": "50%" }).children("textarea").css("height", $(this).height());
                            });
                            $("#closingRemarks > p:nth-child(8)").append("<p><b><u>Uwaga:</u></b> Pełne dane dotyczące tego testu, np. poprawne odpowiedzi, statystyka procentowa poszczegónych działów, itp., będzie dostępna od " + new Date(revealDate).toLocaleDateString("pl-PL") + ", czyli po upłynięciu wyznacznego przez lektora terminu na wykonanie tego testu.");
                            $(".results tfoot").hide();

                            ////Manipulating the columns visibility--------------------------------------------------------------

                            $("#postRevealInfo").css({ "display": "block", "visibility": "visible" });
                        } else {

                            $("#results0").css({ "display": "block", "visibility": "visible" });
                            $("#postRevealInfo").css({ "display": "none", "visibility": "hidden" });
                        }
                        $(function() {
                            $('#exampleModal').modal('show');
                        });
                    }
                } else {
                    /* 
 █████╗      ██╗ █████╗ ██╗  ██╗                                                   
██╔══██╗     ██║██╔══██╗╚██╗██╔╝                                                  
███████║     ██║███████║ ╚███╔╝                                                   
██╔══██║██   ██║██╔══██║ ██╔██╗                                                   
██║  ██║╚█████╔╝██║  ██║██╔╝ ██╗                                                  
╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝                                                  
                                                                                
██╗███╗   ██╗███████╗███████╗██████╗ ████████╗    ██████╗  █████╗ ████████╗█████╗ 
██║████╗  ██║██╔════╝██╔════╝██╔══██╗╚══██╔══╝    ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
██║██╔██╗ ██║███████╗█████╗  ██████╔╝   ██║       ██║  ██║███████║   ██║  ███████║
██║██║╚██╗██║╚════██║██╔══╝  ██╔══██╗   ██║       ██║  ██║██╔══██║   ██║  ██╔══██║
██║██║ ╚████║███████║███████╗██║  ██║   ██║       ██████╔╝██║  ██║   ██║   ██║ ██║
╚═╝╚═╝  ╚═══╝╚══════╝╚══════╝╚═╝  ╚═╝   ╚═╝       ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═╝
                                                                                                       
                    */
                    //utworzenie pola danych w DB
                    var insertDBData = JSON.stringify({
                        TestID: document.getElementById('testId').value,
                        RevealDate: document.getElementById('revealDate').value,
                        TestType: document.getElementById('testType').value,
                        TotalTestTime: document.getElementById('totalTestTime').value,
                        Group: document.getElementById('group').value,
                        Level: document.getElementById('level').value,
                        UserName: document.getElementById('userName').value,
                        UserEmail: document.getElementById('userMail').value,
                        Datee: teraz,
                        StartTime: startingTime,
                        EndTime: startingTime,
                        Started: "True",
                        Finished: "False"
                    });
                    try {
                        $.ajax({
                            type: "POST",
                            url: "desktopmodules/EngraftService.asmx/InsertData",
                            //cache: false,
                            //contentType: "application/json; charset=utf-8",
                            data: insertDBData,
                            timeout: 5000,
                            //dataType: "json",
                            success: getSuccess,
                            error: getFail,
                            complete: errorsOnComplete
                        });
                    } catch (e) {
                        alert(e);
                    }

                    function getSuccess(data, textStatus, jqXHR) {
                        $(function() {
                            $('#exampleModal').modal('show');
                        });
                        // alert(data.Response + " - sukces");
                        //console.log("Pole bazych danych zostało utworzone.")
                    }

                    function getFail(jqXHR, textStatus, errorThrown) {
                        //alert("getFail");
                        return;
                    }

                    function errorsOnComplete(jqXHR, textStatus) {

                        if (textStatus == "timeout") {
                            $(function() {
                                $('#exampleModal').modal('hide');
                            });
                            //$('#exampleModal').removeClass('show');
                            clearInterval(wal);

                            //setTimeout(function () {
                            alert("\nUwaga - Wystąpił błąd w dostępie do bazy danych.\nKod błędu textStatus: " + textStatus + "\n\nProszę skopiować treść tego komunikatu i wysłać pod adres test_master[at]engraft.pl\n\nOdśwież stronę, \na w przypadku dalszego braku reakcji ze strony serwera,\nspróbuj ponownie wykonać te czynności za kilka minut.");
                            return;
                            //}, 1000);
                        }

                    }

                    // koniec tworzenia pola danych /////////////////////////////////////////////////////


                    //alert("dbUserName == undefined");
                    hours = document.getElementById("totalTestTime").value.substr(0, 2);
                    minutes = document.getElementById("totalTestTime").value.substr(3, 2);
                    seconds = document.getElementById("totalTestTime").value.substr(6, 2);

                    hours = parseInt(hours * 3600, 10);
                    minutes = parseInt(minutes * 60, 10);
                    seconds = parseInt(seconds, 10);

                    duration = hours + minutes + seconds;
                    //console.log("duration 2348: " + duration);
                    //hrs = parseInt(Number(hrs) * 3600);
                    //mins = parseInt(Number(mins) * 60);
                    //secs = parseInt(Number(secs));
                    //duration = hrs + mins + secs;
                    //startTimer(duration, display);

                    //if (hrs != 0 && mins != 0 && secs != 0) {
                    //    localStorage.setItem('OnStoppage-' + document.getElementById('testId').value, hrs + ":" + mins + ":" + secs);
                    //}
                    //else {
                    //    localStorage.setItem('OnStoppage-' + document.getElementById('testId').value, document.getElementById('totalTestTime').value);
                    //}


                    $("#demodaler").html("Zamknij");
                    $('#exampleModalSub').removeClass("modal-sm");
                    $(".modal-title").text("Test z j. angielskiego");
                    $("#intro").html("<div><p><b style='font-weight:bolder;'>" + document.getElementById('userName').value + "</b>, przed Tobą najnowszy test z jęz. angielskiego.</p><p>Czas trwania: <b>" + document.getElementById('totalTestTime').value + "</b>. Ilość zadań<b>: " + iloscZadan + "</b>.</p><p>Kliknięcie przycisku <b>\"Zamknij\"</b> spowoduje zamknięcie tego okna i rozpoczęcie odliczania czasu do zakończenia testu.</p><p><b>Uwaga!</b> Zamknięcie i następnie ponowne otwarcie okna przeglądarki nie spowoduje zresetowania czasu trwania testu.</p><p>W związku z tym nie zaleca się przerywania pracy nad rozwiązywaniem testu aż do jego <u>ukończenia</u>.</p></div>");
                    $("#fixer").css({ "display": "block", "visibility": "visible" });
                    $("#checker").css({ "display": "block", "visibility": "visible" });
                    $(".btn-wrapper").css({ "display": "block", "visibility": "visible" });
                    $("#demo").css({ "display": "block", "visibility": "visible" });
                    addOnUnloadAttributes();

                }


            },
            error: function(xhr) {
                //alert("An error occured: " + xhr.status + " " + xhr.statusText);
                if (xhr.statusText == "timeout") {
                    return;
                    //$("#demodaler").html("Zamknij");
                    //$('#exampleModalSub').removeClass("modal-sm");
                    //$(".modal-title").text("Test z j. angielskiego - Błąd w dostępie do danych na serwerze");
                    //$("#intro").html("<div><p><b>Uwaga - </b>przekroczono limit czasu dostępu do bazy danych.</p><p>Odśwież stronę, w przypadku dalszego braku reakcji ze strony serwera, spróbuj ponownie wykonać te czynności za kilka minut.</p></div>");
                    //alert("Uwaga - przekroczono limit czasu dostępu do bazy danych.\nOdśwież stronę, \na w przypadku dalszego braku reakcji ze strony serwera,\nspróbuj ponownie wykonać te czynności za kilka minut.");
                }
            },
            complete: function(xhr) {
                //alert("Complete with xhr.statusText: " + xhr.statusText);
                if (xhr.statusText == "timeout") {
                    alert("Uwaga - przekroczono limit czasu dostępu do bazy danych.\n\nOdśwież stronę, \na w przypadku dalszego braku reakcji ze strony serwera,\nspróbuj ponownie wykonać te czynności za kilka minut.");
                    return;
                } else if (xhr.statusText == "error") {
                    alert("Uwaga - wystąpił błąd w dostępie do bazy danych.\n\nOpis błędu w jęz. angielskim: " + xhr.status + ", " + xhr.statusText + "\n\nOdśwież stronę, \na w przypadku dalszego braku reakcji ze strony serwera,\nspróbuj ponownie wykonać te czynności za kilka minut.");
                    return;
                } else if (xhr.statusText == "success") {
                    $(function() {
                        $('#exampleModal').modal('show');
                    });
                }
            }
        });
    };

    function addOnUnloadAttributes() {
        $("body").attr("onunload", "onStoppage()");
        $("body").attr("onbeforeunload", "return ''");
    }



    //window.addEventListener("unload", function (event) { onStoppage(); });

    //if ((localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) == "Test zakończył się.") || (localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) == "NaN:NaN:NaN")) {
    //    localStorage.removeItem('OnStoppage-' + document.getElementById('testId').value);
    //};

    //zamknięcie modala

    $("#demodaler").on("click", function() {
        modalRemover(dbFinished, dbUserName, dbStoppageTime);
    });

    $(".close").on("click", function() {
        modalRemover(dbFinished, dbUserName, dbStoppageTime);
    });

    $(".modal").keydown(function(event) { //when Esc key is hit
        if (event.which === 27) {
            modalRemover(dbFinished, dbUserName, dbStoppageTime);
        }
    });



    function modalRemover(dbFinished, dbUserName, dbStoppageTime) {

        $("#demo").css("filter", "none");

        //$("#exampleModal").modal('hide');

        $('.loadingwheel-container').css({ 'display': 'none', 'visibility': 'hidden' }).remove();

        if ($("#fixer").css("visibility") == "visible") {
            //if (dbStoppageTime != undefined || dbStoppageTime != "" || dbStoppageTime != "NaN:NaN:NaN") {
            //    hours = dbStoppageTime.substr(0, 2);
            //    minutes = dbStoppageTime.substr(3, 2);
            //    seconds = dbStoppageTime.substr(6, 2);
            //}
            //else {
            //    hours = hrs;
            //    minutes = mins;
            //    seconds = secs;
            //}


            //localStorage.setItem('OnStoppage-' + document.getElementById('testId').value, document.getElementById('time-show').innerText);
            //if (localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) != null) {

            //    hours = localStorage.getItem('OnStoppage-' + document.getElementById('testId').value).substr(0, 2);
            //    minutes = localStorage.getItem('OnStoppage-' + document.getElementById('testId').value).substr(3, 2);
            //    seconds = localStorage.getItem('OnStoppage-' + document.getElementById('testId').value).substr(6, 2);

            //hours = parseInt(hours * 3600, 10);
            //minutes = parseInt(minutes * 60, 10);
            //seconds = parseInt(seconds, 10);
            //duration = hours + minutes + seconds;
            //}

            startTimer(duration, display);



            //usunięcie localStorage po wczytaniu strony
            //localStorage.removeItem('OnStoppage-' + document.getElementById('testId').value);

        }

    };

    //koniec zamknięcia modala

    // $('#intro').replaceWith(package);

    // $("*").not(".modal-content").css("filter","blur(5px)");
    // $(".modal-content").css("filter","none");

    //alert("Reading: " + readAmount + "\nVocabulary: " + vocabularyAmount + "\nListening: " + listenAmount + "\nGrammar: " + grammarAmount);
    document.getElementById("testDate").innerHTML = d.toLocaleDateString();
    document.getElementById("testTime").innerHTML = d.toLocaleTimeString();

    //document.getElementById("testId").value = myObj.test.TestID;



    ////I metoda
    //   $('#checker').load("EngraftDatabaseHandler.ashx?UserName=" + document.getElementById('userName').value + "&NumerTestu=" + document.getElementById('testId').value);

    //II metoda
    //$.get("DatabaseHandler.ashx",
    //    { UserName: "John", NumerTestu: "12adfrt" },
    //    function (data) {
    //        $('#checker').html(data);
    //    });

    //III metoda
    //alert("NumerTestu ze skryptu: " + document.getElementById("testId").value);







    // Tooltips Initialization

    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    })

    $('[data-sizer]').each(function() {

        $(this).attr('size', $(this).attr('data-sizer'));
    });


    $('[data-criteria]').each(function() {
        if ($(this).attr("data-criteria") === "undefined") {
            $(this).removeAttr("data-criteria");
        } else {
            $(function() {

                $('[data-toggle="tooltip"]').tooltip();
            })


            //console.log("data-criteria - before before= " + $(this).attr("data-criteria"));

            //zamiana apostrofów na &#39; w celu uniknięcia probemów z formatowaniem
            var replaced = $(this).attr("data-criteria").replace(/'/gi, "&#39;");
            //console.log("typeof replaced: " + typeof replaced + " - " + replaced);
            //var replaced = ($(this).attr("data-criteria")).toString();

            //console.log("data-criteria - before = " + replaced);


            $(this).append(" <a style='white-space:nowrap;text-align:left;'><i class='fa fa-info-circle' style='white-space:nowrap; text-align:left;' data-toggle='tooltip' data-html='true' data-placement='top' title='" + replaced + "'></i></a>");


            //console.log("data-criteria - after = " + $(this).attr('data-criteria'));


        }
    });




    //if (localStorage.getItem('OnStoppage-' + document.getElementById('testId').value) == "NaN:NaN:NaN") {
    //    localStorage.removeItem('OnStoppage-' + document.getElementById('testId').value);
    //};

    document.getElementById('intro_user_name').innerHTML = document.getElementById('userName').value;

    // <%@Import Namespace="DotNetNuke.Entities.Users"%>
    //region [rgba(50,50,150,0.5)]
    // $("#cleaner").html = <%= TabId %>;
    // var currentUserId = <%=UserController.GetCurrentUserInfo().UserID%>;
    // alert( & lt; & percnt; = Convert.ToString(PortalSettings.ActiveTab.Title) & percnt; & gt;);

    //cieniowanie rzędów
    // function tblZebraColoring() {
    //$('#fixer').css("visibility", "hidden");

    // var d = new Date();
    // document.getElementById("testDate").innerHTML = d.toLocaleDateString();
    // document.getElementById("testTime").innerHTML = d.toLocaleTimeString();
    //wypisanie maksymalnej ilości pumktów do zdobycia - początek

    // var list_max_total = 0;
    // for (var i = 0; i < document.getElementsByClassName("listening_max").length; i++) {
    //     list_max_total = list_max_total + parseInt(document.getElementsByClassName("listening_max")[i].innerText);
    // }
    // console.log("list_max_total: " + list_max_total);
    // document.getElementById("listening_max_total").innerText = list_max_total;
    // console.log("list_max_total(2): " + list_max_total);

    // var voc_max_total = 0;
    // for (i = 0; i < document.getElementsByClassName("vocabulary_max").length; i++) {
    //     voc_max_total = voc_max_total + parseInt(document.getElementsByClassName("vocabulary_max")[i].innerText);
    // }
    // document.getElementById("vocabulary_max_total").innerText = voc_max_total;

    // var gram_max_total = 0;
    // for (i = 0; i < document.getElementsByClassName("grammar_max").length; i++) {
    //     gram_max_total = gram_max_total + parseInt(document.getElementsByClassName("grammar_max")[i].innerText);
    // }
    // document.getElementById("grammar_max_total").innerText = gram_max_total;

    // var read_max_total = 0;
    // for (i = 0; i < document.getElementsByClassName("reading_max").length; i++) {
    //     read_max_total = read_max_total + parseInt(document.getElementsByClassName("reading_max")[i].innerText);
    // }
    // document.getElementById("reading_max_total").innerText = read_max_total;
    // //wypisanie maksymalnej ilości pumktów do zdobycia - koniec

    // var max_total = 0;
    // for (i = 0; i < document.getElementsByClassName("max_total").length; i++) {
    //     max_total = parseInt(max_total) + parseInt(document.getElementsByClassName("max_total")[i].innerText);
    // }
    // document.getElementById("total_max_total").innerText = parseInt(max_total);

    // var elmnt = document.getElementById("writer14");
    // var cln = elmnt.cloneNode(true);
    // document.getElementById("demo").appendChild(cln);

    $("[id*='max_total']").css("color", "cyan");



    //endregion

    // $('.results tr:odd').nextAll().css("background-color", "red");

    //$(window).bind('keydown', function (event) {
    //    if (event.ctrlKey || event.metaKey) {
    //        switch (String.fromCharCode(event.which).toLowerCase()) {
    //            case 's':
    //                event.preventDefault();
    //                alert('ctrl-s');
    //                break;
    //            case 'f':
    //                event.preventDefault();
    //                alert('ctrl-f');
    //                break;
    //            case 'g':
    //                event.preventDefault();
    //                alert('ctrl-g');
    //                break;
    //        }
    //    }
    //});



    $(window).on('load', function() {

    });

});