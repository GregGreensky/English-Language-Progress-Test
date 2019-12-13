var revealDates = [];
$(document).ready(function() {

    // Tooltips Initialization
    $(function() {
        $('[data-toggle="tooltip"]').tooltip();
    });

    /*
    ██╗███╗   ██╗██████╗ ██╗   ██╗████████╗
    ██║████╗  ██║██╔══██╗██║   ██║╚══██╔══╝
    ██║██╔██╗ ██║██████╔╝██║   ██║   ██║   
    ██║██║╚██╗██║██╔═══╝ ██║   ██║   ██║   
    ██║██║ ╚████║██║     ╚██████╔╝   ██║   
    ╚═╝╚═╝  ╚═══╝╚═╝      ╚═════╝    ╚═╝   
                                           
    */
    //OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO tego ma nie być na testy.engraft.pl
    var person = prompt("Please enter your name:", "*********");

    if (person === null || person === "") {
        //txt = "User cancelled the prompt.";
    } else {
        document.getElementById("userName").value = person;
    }

    $(".loadingwheel-container").show();

    //var adresMailowy = prompt("Please enter your email address:", "************");

    //if (adresMailowy === null || person === "") {
    //    //txt = "User cancelled the prompt.";
    //}
    //else {
    //    document.getElementById("userMail").value = adresMailowy;
    //}

    //OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO 
    //ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
    //    var table = $('#data_collector').DataTable(
    //        {


    //            "searching": true,
    //            "processing": true,
    //            "serverSide": false,
    //            "ordering": true,
    //            "paging": true,

    //            //select: {
    //            //    style: 'os',
    //            //    selector: 'td:first-child'
    //            //},
    //            order: [[1, 'asc']],
    //            "language": {
    //                "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Polish.json"
    //            },
    //            lengthChange: false,
    //            //dom: 'B<"clear">lfrtip',
    //            //buttons: [

    //            //    {
    //            //        extend: 'copy',
    //            //        text: 'Kopiuj'
    //            //    }
    //            //],


    //            "columns": [

    //                { "data": "dbTestId" },
    //                { "data": "TestType" },
    //                { "data": "EndTime" },
    //                { "data": "TotalGrade" }, 
    //                { "data": "AnswersForStudent" }


    //            ],

    //            "columnDefs": [
    //                //{ "visible": false, "targets": -1 },
    //                {
    //                    targets: [3,4],
    //                    defaultContent: "<button type='button' class='btn btn-outline-primary btn-sm m-0 waves-effect'>Pokaż</button>",
    //                    data: null
    //                }
    //            ],

    //            "ajax": {
    //                "url": "desktopmodules/EngraftService.asmx/CollectiveDataDownload",
    //                "type": "POST",
    //                "dataSrc": "",
    //                //"contentType": "application/x-www-form-urlencoded; charset=UTF-8", //to trzeba sprawdzać
    //                "data": { UserName: document.getElementById('userName').value },
    //                "dataType": "json",
    //                "timeout": 5000



    //            }
    //        }

    //);           


    //    $('.dataTables_length').addClass('bs-select');  

    //    //table.buttons().container()
    //    //    .appendTo('#example_wrapper .small-6.columns:eq(0)');
    //    //table.button(2).enable();

    //    //table.button('2-1').text('Not available');


    //ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd

    function snackbarr(amountOfTests) {
        // Get the snackbar DIV
        var x = document.getElementById("snackbar");
        $("#testCount").html(amountOfTests);
        // Add the "show" class to DIV
        x.className = "show";
        // After 3 seconds, remove the show class from DIV
        setTimeout(function() {
            x.className = x.className.replace("show", "");
            $("#testNumber").text($("#data_collector tbody tr:not(:hidden)").length);
        }, 3000);
    }
    /*
     
 █████╗      ██╗ █████╗ ██╗  ██╗
██╔══██╗     ██║██╔══██╗╚██╗██╔╝
███████║     ██║███████║ ╚███╔╝
██╔══██║██   ██║██╔══██║ ██╔██╗ 
██║  ██║╚█████╔╝██║  ██║██╔╝ ██╗
╚═╝  ╚═╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
                                
                                 
     
    */
    //setTimeout(function () { callAjax(); }, 1000); //opóżnienie wywołania ajax, aby zebral dane ze strony
    //callAjax();


    //function callAjax() {
    $.ajax({
        type: "POST",
        contentType: "application/x-www-form-urlencoded; charset=UTF-8", //to trzeba sprawdzać
        data: { UserName: document.getElementById('userName').value },
        url: "desktopmodules/EngraftService.asmx/CollectiveDataDownload",
        dataType: "json",
        timeout: 7000,
        //async: false,
        success: function(data) {


            var tabElements;
            var sesStoreAnswers = "";
            var rowsShown;
            var textL;

            //$('#data_collector').DataTable();
            //$('.dataTables_length').addClass('bs-select');
            //console.log(data[0].EndTime);
            //console.log(data.length);
            //console.log("RevealDate = " + data[0].RevealDate);

            snackbarr(data.length);
            //$("#testNumber").text(data.length);


            if (data.length === 1) {
                $("body").css("overflow-y", "scroll");
                $(".no-show").removeClass("no-show").addClass("show");
                $(".i-container").remove();
            } else {
                $("body").css("overflow-y", "scroll");
                $(".no-show").removeClass("no-show").addClass("show");
            }

            /* 
 ██████╗  █████╗  ██████╗ ██╗███╗   ██╗ ██████╗ 
 ██╔══██╗██╔══██╗██╔════╝ ██║████╗  ██║██╔════╝ 
 ██████╔╝███████║██║  ███╗██║██╔██╗ ██║██║  ███╗
 ██╔═══╝ ██╔══██║██║   ██║██║██║╚██╗██║██║   ██║
 ██║     ██║  ██║╚██████╔╝██║██║ ╚████║╚██████╔╝
 ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝╚═╝  ╚═══╝ ╚═════╝                                                              
            */

            //paging functionality ===================================

            $(".custom-select").on("change", function() { //wybór ilosci testow na stronie
                //$("#data_collector tr").show();
                if (this.value !== "Il. testów na stronie") {
                    //console.log(this.value);

                    if (this.value < data.length) { //jesli wybrana ilosc testow na stronie jest mniejsza od calkowitej ilosci testow
                        $(".page-item:not(:first, :nth-of-type(2), :last)").hide();
                        //$("#pager ul li").append('<li class="page-item"><a class="page-link waves-effect waves-effect" aria-label="2" href="#">' + 2 + '</a></li> ');
                        var pagingAmount = data.length / this.value;
                        $("#pager ul").empty();
                        $("#pager ul").append("<li class='page-item prev'><a class='page-link' aria-label=Previous><span aria-hidden=true>&laquo;</span><span class='sr-only'>Previous</span></a></li>");
                        for (i = 1; i < pagingAmount + 1; i++) {
                            //$("<li class='page-item'><a class='page-link waves-effect waves-effect' aria-label='" + i + "' href='#'>" + i + "</a></li>").insertAfter(".previouss");
                            $("#pager ul").append("<li class='page-item'><a class='page-link waves-effect waves-effect' aria-label='" + i + "' href='#'>" + i + "</a></li>").removeClass("active");
                        }
                        $("#pager ul li:nth-child(2)").addClass("active");
                        $("#pager ul").append("<li class='page-item next'><a class='page-link' aria-label=Previous><span aria-hidden=true>&raquo;</span><span class='sr-only'>Next</span></a></li>");

                        //showing/hiding rows
                        rowsShown = this.value;

                        $("#data_collector tr").show();
                        $("#data_collector tr:gt(" + rowsShown + ")").hide();

                        //showing/hiding rows


                    } else { //jeśli liczba rekordów jest mniejsza lub równa liczbie na selector
                        $(".page-item:not(:nth-of-type(2), :first, :last)").hide(); //schowanie wszystkich przycisków oprócz "1", "prev" i "next"
                        $(".page-item").first().addClass("disabled");
                        $(".page-item").last().addClass("disabled");
                        $(".page-item:nth-of-type(2)").addClass("active"); //dodanie niebieskości do przycisku "1"
                        $("#data_collector tr").show(); //pokazanie wszystkich rzędów tabeli
                    }

                } else {
                    //$(".page-item(:prev, :next").addClass("disabled");
                    //$(this).val(1);
                }

            });

            $('.pagination').on('click', 'li:not(.prev):not(.next)', function() { //kliknięcie na przyciski  numeryczne stronicowania (bez prev i next)
                $('.pagination li').removeClass('active');
                $(this).not('.prev,.next').addClass('active');

                var currentPagerText = Number($("li.next").siblings(".active").text());
                var lowerLimit = (Number(rowsShown) * currentPagerText) - (Number(rowsShown) - 1);
                var higherLimit = currentPagerText * rowsShown;
                //var rowsVisible = rowsShown * currentPagerText;
                //console.log("Spot on: rowsShown = " + rowsShown + "\ncurrentPagerText = "
                //    + currentPagerText + "\nlowerLimit = " + lowerLimit + "\nhigherLimit = " + higherLimit);

                $("#data_collector tr:not(thead tr)").hide();
                $("#data_collector tr:not(:lt(" + (lowerLimit) + "), :gt(" + (higherLimit) + "))").show();

            });

            $('.pagination').on('click', 'li.prev', function() { //kliknięcie na pager prev
                var currentPagerText = Number($("li.next").siblings(".active").text()) - 1;
                var lowerLimit = (Number(rowsShown) * currentPagerText) - (Number(rowsShown) - 1);
                var higherLimit = currentPagerText * rowsShown;
                //var rowsVisible = rowsShown * currentPagerText;
                //console.log("Previous: rowsShown = " + rowsShown + "\ncurrentPagerText = "
                //    + currentPagerText + "\nlowerLimit = " + lowerLimit + "\nhigherLimit = " + higherLimit);
                if ($(this).next().hasClass("active") === false) {
                    $('li.active').removeClass('active').prev().not(".prev").addClass('active');
                    //console.log($(this).next().hasClass("active"));
                    $("#data_collector tr:not(thead tr)").hide();
                    $("#data_collector tr:not(:lt(" + (lowerLimit) + "), :gt(" + (higherLimit) + "))").show();
                } else {
                    //$("li:nth-of-type(2)").addClass("active");
                    //console.log($(this).next().hasClass("active"));
                }
                //console.log($(this).next().hasClass("active"));
            });

            $('.pagination').on('click', 'li.next', function() { //kliknięcie na pager next
                //$("#data_collector tr:not(:lt(1))").show();
                //$("#data_collector tr:not(:eq(0))").show();
                var currentPagerText = Number($("li.next").siblings(".active").text()) + 1;
                var lowerLimit = (Number(rowsShown) * currentPagerText) - (Number(rowsShown) - 1);
                var higherLimit = currentPagerText * rowsShown;
                //var rowsVisible = rowsShown * currentPagerText;
                //console.log("Next: rowsShown = " + rowsShown + "\ncurrentPagerText = "
                //    + currentPagerText + "\nlowerLimit = " + lowerLimit + "\nhigherLimit = " + higherLimit);

                //$("#data_collector tr:gt(2)").hide();
                if ($(this).prev().hasClass("active") === false) {
                    $('li.active').removeClass('active').next().not(".next").addClass('active');
                    $("#data_collector tr:not(thead tr)").hide();
                    $("#data_collector tr:not(:lt(" + (lowerLimit) + "), :gt(" + (higherLimit) + "))").show();
                    //console.log($(this).next().hasClass("active"));
                } else {
                    //$("li:nth-of-type(2)").addClass("active");
                    //console.log($(this).next().hasClass("active"));
                    //console.log("crucial");
                    //$("#data_collector tr:not(thead tr)").hide();
                    //$("#data_collector tr:not(:lt(" + (lowerLimit) + "))").show();
                    //alert("Previous active");
                }


                //$('li.active').removeClass('active').next().not(".next").addClass('active');
            });

            //paging functionality ===================================

            sessionStorage.setItem(document.getElementById('userName').value, JSON.stringify(data));

            var tabela = $("#data_collector");

            //tabela.append("<tbody><tr><td>" + data[0].dbTestId + "</td><td>" + data[0].TestType + "</td><td>" + data[0].EndTime + "</td><td>" + data[0].TotalGrade + "</td><td><button type='button' class='btn btn-outline-primary btn-sm m-0 waves-effect'>Pokaż</button></td></tr></tbody");
            tabElements = "<tbody>";

            for (var i = 0; i <= data.length - 1; i++) {
                //formatedDate = data[i].EndTime.slice(0, 10);
                formatedDate = data[i].EndTime.slice(0, 10).replace(/(\d{2}).(\d{2}).(\d{4})/, "$3.$2.$1");
                //formatedDate = formatedDate.toLocaleDateString(); //albo to albo to z linijki niżej
                //formatedDate = formatedDate.valueOf();   //albo to albo to z linijki wyżej
                tabElements += "<tr><td>" + Number(data[i].dbTestId) + "</td><td>" + data[i].TestType + "</td><td>" + formatedDate + "</td><td>" + data[i].TotalGrade + "</td><td><button type='button' id='testIdBtn-" + data[i].dbTestId + "' class='btn btn-primary btn-sm m-0 waves-effect' data-item=" + i + ">Pokaż</button></td></tr>";
                sesStoreAnswers += "pocz-test:" + data[i].dbTestId + ":" + data[i].AnswersForStudent + "kon-test:" + data[i].dbTestId + "||";
                var revDate = data[i].RevealDate;
                revealDates.push(revDate);

            }

            sessionStorage.setItem(document.getElementById('userName').value, JSON.stringify(sesStoreAnswers));
            tabElements += "</tbody>";
            tabela.append(tabElements);




            $(".searcher_wrapper").css("display", "block");

            $(".ex").on("click", function() {
                $("#searcher").val(""); //oczyszczenie pola wyszukiwania
                $(".ex").css("opacity", "0"); //"schowanie iksa (x)
                $(".custom-select").val("0"); //uaktywnienie opcji "Ilość..."

                //$("#data_collector tbody tr").each(function () {                //pokazanie całej tabeli
                //    $(this).html = $(this).html($(this).html().replace(/<mark>(.*\w*\d*)<\/mark>/gi, "$&"));
                ////alert($(this).html());
                //    //$(this).html = $(this).html().replace(/<mark>(.*)<\/mark>/gi, "$&");
                //    //console.log("html()");
                //    $(this).find("tbody, tr, td").css("background", "none").show();
                //});



                //$("#pager .pagination ul li").each(function () {
                //    $(this).hide();
                //});
                $("#pager .pagination li:not(.prev, .next, :eq(1))").hide(); //schowanie niepotrzebnych pagerów
                $("#pager .pagination li:eq(1)").addClass("active"); //pager 1 dostaje  niebieskie tło (class "active")

                $("#data_collector tbody tr td").css("border", "none"); //zlikwidowanie koloru krawędzi
                $("#data_collector tbody tr td").each(function() { //zlikwiowanie podświetlenia
                    $(this).html = $(this).html($(this).html().replace(/<mark>(\w*|\d*|.*)<\/mark>/gi, "$1"));
                    $(this).parent().show();
                    //var dehighlited = $(this).html().replace(/<mark>(\w*)<\/mark>/gi, "$1");
                    //$(this).html(dehighlited).show();
                });

                $("#testNumber").text($("#data_collector tbody tr:not(:hidden)").length);
                //console.clear();
            });

            /*
██████╗ ██╗   ██╗████████╗████████╗ ██████╗ ███╗   ██╗███████╗    
██╔══██╗██║   ██║╚══██╔══╝╚══██╔══╝██╔═══██╗████╗  ██║██╔════╝    
██████╔╝██║   ██║   ██║      ██║   ██║   ██║██╔██╗ ██║███████╗    
██╔══██╗██║   ██║   ██║      ██║   ██║   ██║██║╚██╗██║╚════██║    
██████╔╝╚██████╔╝   ██║      ██║   ╚██████╔╝██║ ╚████║███████║    
╚═════╝  ╚═════╝    ╚═╝      ╚═╝    ╚═════╝ ╚═╝  ╚═══╝╚══════╝                                                                             
            */

            $("#data_collector").on("click", ".btn", function() { //delegation for dynamically created elements!!!!
                //alert("Klik");
                $(".loadingwheel-container").css({ "display": "block", "opacity": "1", "z-index": "755" }).show();
                //$("body").css({ "opacity":"0.2"});
                var btnNameLength = this.id.length;
                var btnDashIndex = this.id.indexOf("-");
                var buttonIdentifier = this.id.substr(btnDashIndex + 1, btnNameLength); //getting name of button clicked
                //alert("kliker: " + buttonIdentifier);

                $(this).parent().parent().css("background-color", "lightblue").siblings().css("background-color", "");
                //$(this).parent().parent().siblings().css("background-color", "");
                var sessionStorageString = sessionStorage.getItem(document.getElementById('userName').value);
                var studentAnswersLength = sessionStorageString.length;
                var testNumberIndexFirst = sessionStorageString.indexOf("pocz-test:" + buttonIdentifier + ":");
                var testNumberIndexLength = ("pocz-test:" + buttonIdentifier + ":").length;
                var testNumberIndexLast = sessionStorageString.lastIndexOf("kon-test:" + buttonIdentifier + "||");
                //console.log("testNumberIndexFirst:" + testNumberIndexFirst + "\ntestNumberIndexLast:" + testNumberIndexLast);
                var testAnswers = sessionStorageString.substring(testNumberIndexFirst + testNumberIndexLength, testNumberIndexLast);
                testAnswers = testAnswers.replace(/&#92;&#39;/g, "'").replace(/&#34;/g, "");

                //reveal date getter
                var dataTestItem = $(this).attr("data-item");
                var rD = revealDates[dataTestItem];
                //console.log(rD);
                //var rdd = new Date.parse(rD);
                //console.log(rdd);
                //console.log("Reveal Date(" + dataTestItem + ") = " + new Date(rD));
                //console.log("Reveal Date(" + dataTestItem + ") = " + Date(revealDates[dataTestItem]) + "\n Parse Date" + dataTestItem + " = " + Date.parse(Date(revealDates[dataTestItem])) + "\n Parse Today's Date = " + Date.parse(new Date));






                //console.log(testAnswers);

                //$("#demo").hide("fade", 1000, callback);

                function callback() {
                    setTimeout(function() {
                        $("#demo").empty().append(testAnswers).show("clip", 500);
                        $(".loadingwheel-container").hide("clip", 600);

                        var dateArray = rD.split(' ');
                        var year = dateArray[0].split('.');
                        var time = dateArray[1].split(':');

                        var revelationDate = new Date(year[2], year[1] - 1, year[0], time[0], time[1], time[2]);
                        var revDateParsed = Date.parse(revelationDate);
                        var todaysDateParsed = Date.parse(new Date);

                        if (revDateParsed > todaysDateParsed) {
                            ////Manipulating the columns visibility--------------------------------------------------------------
                            $(".results tr td:nth-last-child(1), .results tr th:nth-last-child(1), .results tr td:nth-last-child(2), .results tr th:nth-last-child(2), .results tr td:nth-last-child(4), .results tr th:nth-last-child(4)").hide();
                            $(".results tr td").filter(function() {
                                $(this).filter(":contains('Writing')").siblings(":eq(0), :eq(1), :eq(2), :eq(3)").css("display", "table-cell").siblings(":eq(5)").css({ "display": "table-cell", "width": "50%" }).children("textarea").css("height", $(this).height());
                            });
                            $(".results tfoot").remove();
                            $(".right-texter").remove();

                            $("#closingRemarks > p:nth-child(8)").append("<p><b><u>Uwaga:</u></b> Pełne dane dotyczące tego testu, np. poprawne odpowiedzi, statystyka procentowa poszczegónych działów, itp., będzie dostępna od " + revelationDate.toLocaleDateString("pl-PL") + " r, czyli po upłynięciu wyznacznego przez lektora terminu na wykonanie tego testu.</p>");
                        }

                        ////Manipulating the columns visibility--------------------------------------------------------------
                    }, 500);
                }


                if ($(this).text() === "Pokaż") {
                    $("#demo").hide("blind", 20, callback);
                    $(this).text("Schowaj");
                    $(".btn").not(this).text("Pokaż");

                } else {
                    $(this).parent().parent().css("background-color", "");
                    $(this).text("Pokaż");
                    $("#demo").hide("blind", 500);
                    $(".loadingwheel-container").hide("clip", 600);
                    //$("body").css("opacity", "1");
                }

                //$(this).text($(this).text() === 'Pokaż' ? 'Schowaj' : 'Pokaż');



            });

            /* 
███████╗███████╗ █████╗ ██████╗  ██████╗██╗  ██╗
██╔════╝██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
███████╗█████╗  ███████║██████╔╝██║     ███████║
╚════██║██╔══╝  ██╔══██║██╔══██╗██║     ██╔══██║
███████║███████╗██║  ██║██║  ██║╚██████╗██║  ██║
╚══════╝╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
                                                
                                                            
             */

            //funkcjonalność wyszukiwania----------------------------------------------------------
            $("#searcher").keyup(function() {
                $(function() {
                    $('[data-toggle="tooltip"]').tooltip();
                });
                //    //selection//////////////////////////////////////////////////////////////////////////////////////////
                //if ($("#searcher").val().length >= 1) {     //jeśli w polu wyszukiwania jest co najmniej 1 znak
                //    $(".ex").css("opacity", "1");

                //    $("#data_collector tbody tr td").each(function () {
                //    var searchedValue = $("#searcher").val().toLowerCase();
                //        var text = $(this).filter(":not(:last-of-type)").text();      //tekst z wszystkich komórek oprócz ostatniej w rzędzie
                //        var textLast = $(this).parent().find("td").filter(":last-of-type").text();      //tekst ostatniej komóki w wierszu

                //        textL = text.toLowerCase();
                //        var textLLast = textLast.toLowerCase();
                //        var position = textL.indexOf(searchedValue);
                //        var positionLast = textLLast.indexOf(searchedValue);



                //        var scannedText = $(this).text().toLowerCase();
                //        //console.log($(this).find("td").last().text());        //good checker
                //        if (scannedText.includes(searchedValue) === false) {        //jeśli komórka nie zawiera wyszukiwanego tekstu
                //            $("#pager .pagination li:not(.prev, .next, :eq(1))").hide();
                //            //$(this).html = $(this).html($(this).html().replace(/<mark>/gi, ""));  //moje początkowe
                //            $(this).html = $(this).html($(this).html().replace(/<mark>(\w*)<\/mark>/gi, "$1"));
                //            //$(this).not().text($('#searcher').val()).hide(); //////////
                //            //$("#data_collector tbody tr:not(:contains('" + $('#searcher').val().toLowerCase() + "'))").hide(); //OOOKKKKKKK
                //            //$("" + "" + $(this).text() + ":not(:contains('" + $('#searcher').val().toLowerCase() + "'))").css("color", "red");
                //            //$(this).has(textL).css("color", "red");
                //            console.log($(this).parent().filter().text());


                //            //$(this).last().css("color", "red");
                //            //console.log($(this).filter("td:first-child").text());
                //            $(this).parent().hide();
                //        }
                //        else {      //jeśli wiersz zawiera wyszukiwany tekst

                //            //$("#data_collector tbody tr td:not(:last-of-type").each(function () {

                //                //var text = $(this).text();            //oryginał początkowy

                //                //console.log("text = " + text + " position = " + position);
                //            if (position >= 0 && (positionLast === -1 || positionLast >= 0)) {

                //                var matches = scannedText.substring(position, searchedValue.length + position);  //oryginał
                //                var regex = new RegExp(matches, 'ig');                                //oryginał
                //                var highlighted = text.replace(regex, `<mark>${matches}</mark>`);     //oryginał
                //                //var highlighted = text.replace(matches, "<mark>" + matches + "</mark>");  //oryginał
                //                //var highlighted = $(this).text().replace(matches, "<mark>$&</mark>");       //moje

                //                //console.log("textL = " + textL + ", textLLast = " + textLLast + ", searchedValue = " + searchedValue + ", position = " + position + ", positionLast = " + positionLast + ", matches = " + matches + ", highlighted = " + highlighted);

                //                //console.log(highlighted);

                //                $(this).html(highlighted).show();       //OK

                //                $(this).parent().show();                //OK


                //                //alert($(this).parent().prev().html());

                //                //console.log("$('<mark>, $(this).parent().prev()).length: 1 = "  + $("<mark>", $(this).parent().prev()).length);

                //                //$(this).filter(function () {
                //                //    return $("<mark>", $(this).parent().prev()).length === 0;
                //                //}).parent().prev().hide();


                //                //alert("position = " + position + ", positionLast = " + positionLast);
                //            }
                //            else {
                //                //$(this).html(highlighted).hide();

                //                //$(this).filter(function () {

                //                //    //console.log("$('<mark>', $(this).parent().prev()).length: 2 = " + $(this).parent().prev().html());
                //                //    $("<mark>", $(this)).length === 0;
                //                //}).hide();

                //                //alert("position = " + position + ", positionLast = " + positionLast);
                //            }

                //            //});


                //            $("#data_collector tbody tr td:not(:last-child):contains(" + $('#searcher').val() + ")").css("border", "1px solid orange");
                //            $("#data_collector tbody tr td:not(:contains(" + $('#searcher').val() + "))").each(function () {
                //                $(this).css("border", "none");
                //                $(this).html = $(this).html($(this).html().replace(/<mark>(.*)<\/mark>/gi, "$&"));

                //            });
                //        }
                //        //$(this).filter(function () {
                //        //    return $(textL, this).length === 0;
                //        //}).css("color", "red");
                //    });

                //}
                //else {                                      //jeśli w polu wyszukiwania nie ma żadnych znaków
                //    $(".custom-select").val("0");
                //    //$("#data_collector tbody tr").each(function () {

                //        //$("#data_collector tbody tr td:contains(" + $('#searcher').val() + ")").css("border", "none");
                //        //$("#data_collector tbody tr td:not(:contains(" + $('#searcher').val() + "))").css("border", "none");
                //    $("#data_collector tbody tr td").css("border", "none");
                //        //$(this.children).has('mark').each(function () {
                //            //$(this.children).html = $(this).html($(this).html().replace(/<mark>/gi, ""));
                //        $("#data_collector").html = $("#data_collector").html($("#data_collector").html().replace(/<mark>(\w*)<\/mark>/gi, "$1"));
                //    $("#data_collector tbody tr").show();
                //        //});
                //    //});
                //    //console.clear();

                //}
                //selection//////////////////////////////////////////////////////////////////////////////////////////

                //new approach start----------------------------------------------------------------------------------
                if ($("#searcher").val().length > 0) { //jeśli w polu wyszukiwania jest co najmniej 1 znak
                    $(".ex").css("opacity", "1");

                    //var textLast = $("#data_collector tbody tr").find("td").filter(":last-of-type").text();      //tekst ostatniej komóki w wierszu

                    //if (textLast.includes($("#searcher").val())) {
                    //    alert("Hit");
                    //}


                    $("#data_collector tbody tr td").filter(function() {
                        //$(this).filter(":contains(" + $("#searcher").val() + ")");
                        //}).css("color", "green");

                        //$(this).siblings().filter("td:not(:last-of-type)").css("background-color", "green"); //good check
                        //$(this).siblings().filter(":last-of-type").css("background-color", "red"); //good check
                        //console.log($(this).siblings().filter(":last-of-type").text()); //good check

                        //console.log($(this).children("td").filter(":not(:last-of-type)").text());
                        //if ($(this).filter(":not(:last-of-type)").text().includes($("#searcher").val()) === true) {   //OK moje
                        //if ($(this).siblings().filter(":not(:last)").text().includes($("#searcher").val()) === true) {

                        //$(this).siblings().filter("td:not(:last-of-type)").css("color", "green");
                        //$(this).siblings().filter("td:last").children().css("color", "red");
                        //$(this).css("color", "green");
                        //$(this).children().filter("td:contains(" + $("#searcher").val() + ")").css("color", "green");

                        //console.log($(this).siblings().filter(":not(:last)").text());

                        var scannedText = $(this).text();
                        var lastOne = $(this).parent().children(":last").text();
                        //console.log(scannedText + " - " + lastOne);
                        //console.log(scannedText);
                        var searchedValue = $("#searcher").val();
                        var position = scannedText.indexOf(searchedValue);
                        var matches = scannedText.substring(position, searchedValue.length + position); //oryginał
                        var regex = new RegExp(matches, 'gi'); //oryginał
                        var highlighted = scannedText.replace(regex, `<mark>${matches}</mark>`); //oryginał
                        //var highlighted = $(this).text().replace(matches, "<mark>$&</mark>");       //moje



                        //$(this).filter(":last-of-type").css("background-color", "brown"); 

                        //$(this).filter(":not(:last-of-type)").filter(":contains(" + searchedValue + ")").html(highlighted).siblings(":not(:last-of-type)").addBack().css("background-color", "green"); 

                        //$(this).find(".btn").filter(":contains(" + searchedValue + ")").parent().css("background-color", "lightgreen");
                        //$(this).find(".btn").filter(":not(:contains(" + searchedValue + "))").parent().css("background-color", "red");
                        //$(this).filter(":not(:last-of-type)").parent().filter(":not(:contains(" + searchedValue + "))").css("background-color", "pink"); 

                        var mainTdsPositive = $(this).filter(":not(:last-of-type)").filter(":contains(" + searchedValue + ")");
                        var btnColsPositive = $(this).find(".btn").filter(":not(:contains(" + searchedValue + "))").parent();
                        var btnColsNegative = $(this).find(".btn").filter(":not(:contains(" + searchedValue + "))").parent();
                        var mainTdsNegative = $(this).filter(":not(:last-of-type)").parent().filter(":not(:contains(" + searchedValue + "))");

                        //console.log("mainTdsPositive.text() = " + mainTdsPositive.text());



                        $(this)
                            .parent()
                            .children(":not(:last-of-type)")
                            .filter(":not(:contains(" + searchedValue + "))")
                            .parent()
                            .hide()
                            .end()


                        .parent()
                            .children(":not(:last-of-type)")
                            .filter(":contains(" + searchedValue + ")")
                            .parent()
                            .show()
                            .end();


                        //$(this).html = $(this).html($("#data_collector").html().replace(/<mark>([\w*.*])<\/mark>/gi, "$1"));

                        var dehighlited = $(this).html($(this).html().replace(/<mark>(\w*|.*|\d*)<\/mark>/gi, "$1"));

                        $(this).filter(":not(:hidden)").filter(":not(:last-of-type)").filter(":contains(" + searchedValue + ")").html(highlighted).show();

                        $(this).filter(":not(:hidden)").filter(":not(:last-of-type)").filter(":not(:contains(" + searchedValue + "))").html(dehighlited.html()).show();


                        //---------------------------------------------
                        //.find(":button")

                        //.filter(":not(:contains(" + searchedValue + ")), :contains(" + searchedValue + ")")
                        //.parent()
                        //.parent()
                        //.children(":not(:last-of-type)")

                        //.filter(":not(:contains(" + searchedValue + "))")
                        //.parent()
                        //.css("background-color", "red");
                        //.hide();
                        //.end()
                        //.filter(":not(:contains(" + searchedValue + "))")
                        //.css("background-color", "pink");
                        //.hide();
                        //---------------------------------------
                        //$(this)

                        //    .filter(":not(:last-of-type), :last-of-type")
                        //    .filter(":contains(" + searchedValue + ")")
                        //    .filter(":not(:last-of-type)")
                        //    .html(highlighted)

                        //    .parent()
                        //    .css("background-color", "green");
                        //    //.show();

                        //$(this).filter(":last-of-type").find("button").filter(":contains(" + searchedValue + ")").html(highlighted).parent().css("background-color", "purple").show(); 

                        //$(this).filter(":not(:last-of-type), :not(:contains(" + $("#searcher").val() + "))").parent().hide();

                        //$(this).parent().filter(":not(:contains(" + $("#searcher").val() + "))").css("background-color", "red").filter(":contains(" + $("#searcher").val() + ")").css("background-color", "pink");
                        //$("#data_collector tbody").show();




                        //}
                        //else  {
                        //    //$(this).parent().hide();
                        //    $(this).siblings().filter("td:last").children(":first").css("color", "green");
                        //    $(this).parent(":not(:contains(" + $("#searcher").val() + "))").hide();
                        //}
                        //$("#data_collector tbody tr").show();
                    });

                } else {

                    //$(this).html = $(this).html($(this).html().replace(/<mark>(\w*.*\d*)<\/mark>/gi, "$1"));
                    //$("#data_collector").show();
                    $("#data_collector tbody tr td").each(function() { //zlikwiowanie podświetlenia
                        $(this).html = $(this).html($(this).html().replace(/<mark>(\w*|\d*|.*)<\/mark>/gi, "$1"));
                        $(this).parent().show();
                    });

                }




                $("#testNumber").text($("#data_collector tbody tr:not(:hidden)").length);
                if ($("#testNumber").text() === "0") {
                    $(".searcher_wrapper").hide().show("shake");
                }
            });
            //new approach end----------------------------------------------------------------------------------
            //$("#searcher").keyup(function () {
            //    if ($("#searcher").val().length >= 1) {     //jeśli w polu wyszukiwania jest co najmniej 1 znak
            //        $(".ex").css("opacity", "1");

            //        var searchedValue = $("#searcher").val().toLowerCase();



            //        $("#data_collector tbody tr td:not(:last-child").each(function () {
            //            var text = $(this).children().text();
            //            var textL = text.toLowerCase();
            //                var position = textL.indexOf(searchedValue);
            //            //console.log($("#data_collector tbody tr td:not(:last-of-type):not(:contains('" + value + "'))").parent());
            //            //if ($(this).text().includes(searchedValue) === true) {
            //            if (position !== -1) {
            //                var matches = textL.substring(position, searchedValue.length + position);
            //                var highlighted = $(this).text().replace(matches, "<mark>$&</mark>"); 
            //                $(this).html(highlighted).show();
            //                $(this).parent().show();
            //            }
            //            else {
            //                //$(this).parent().hide();
            //            }
            //        });
            //    }


            //    $("#testNumber").text($("#data_collector tbody tr:not(:hidden)").length);
            //});


            $("#searcher").focus(function() {
                $(this).val("");
                $(".ex").css("opacity", "0");
                //$("#data_collector tbody").html = $("#data_collector tbody").html($("#data_collector tbody").html().replace(/<mark>([\w*.*\d*])<\/mark>/gi, "$1")).find("td").css("border", "none");
                $("#data_collector tbody tr td").each(function() { //zlikwiowanie podświetlenia
                    $(this).html = $(this).html($(this).html().replace(/<mark>(\w*|\d*|.*)<\/mark>/gi, "$1"));
                    $(this).parent().show();
                });

                $(".custom-select").val(0);
                $("#data_collector tbody tr").show();
                $("#pager .pagination li:not(.prev, .next, :eq(1))").hide();
                $("#pager .pagination li:eq(1)").addClass("active");
                $("#pager .pagination li:first").addClass("disabled");
                $("#pager .pagination li:last").addClass("disabled");
                $("#testNumber").text($("#data_collector tbody tr:not(:hidden)").length);
                //console.clear();
            });
            //funkcjonalność wyszukiwania----------------------------------------------------
            $(".loadingwheel-container").hide("fold");
            $(".table-wrapper").show("fold");
        },
        error: function(xhr, data) {
            //alert("An error occured: " + xhr.status + " " + xhr.statusText);
            if (xhr.status === 200 && !!data) {
                $(".table_inner_wrapper").css("overflow-y", "hidden");
                $(".table-wrapper").css("min-width", "250px");
                snackbarr(0);
                $("#data_collector").remove();
                setTimeout(function() {
                    $("#demo").html("<div>Niestety, nie zrobiłeś/-aś jeszcze żadnego testu.</div>").css("text-align", "center");
                }, 3000);
                $(".loadingwheel-container").hide("clip", 600);
                $(".table-wrapper").show("fold");
            } else {
                alert("\nUwaga - Wystąpił błąd w dostępie do bazy danych.\nKod błędu textStatus: " + xhr.statusText + "\n\nProszę skopiować treść tego komunikatu i wysłać pod adres test_master[at]engraft.pl\n\nOdśwież stronę, \na w przypadku dalszego braku reakcji ze strony serwera,\nspróbuj ponownie wykonać te czynności za kilka minut.");
            }
        }
    });
    //}






    //funkcjnalność ikon sortowania--------------------------------------------------
    //$(".fa-angle-up").on("click", function () {




    //   // $(".fa-caret-up").each(function () { 
    //   // $(this).css("font-size", "16px").toggleClass("fa-caret-up fa-angle-up").removeAttr("disabled").attr("onclick", "makeAllSortable(0)").attr("data-original-title", "Sortuj rosnąco");
    //   //     const these_carets = $(this);

    //   //         //these_carets.css("font-size", "16px").toggleClass("fa-caret-up fa-angle-up").removeAttr("disabled").attr("onclick", "makeAllSortable(0)").attr("data-original-title", "Sortuj rosnąco");

    //   //});

    //    //$(".fa-angle-up").each(function () {
    //    //    $(this).css("font-size", "16px");
    //    //});


    //    //$(".fa-caret-up").not($(this)).removeClass("fa-caret-up").addClass("fa-angle-up").removeAttr("disabled").attr("onclick", "makeAllSortable(0)").attr("data-original-title", "Sortuj rosnąco");

    //    //$(this).css("font-size", "16px").removeClass("fa-angle-up").addClass("fa-caret-up").attr("disabled", "disabled").removeAttr("onclick").attr("data-original-title", "Posortowano rosnąco");

    //    //$(this).css("font-size", "16px").removeAttr("fa-angle-up").attr("fa-caret-up");
    //    //alert("This clicked");


    //});

    //funkcjnalność ikon sortowania--------------------------------------------------
    function sortTable(table, col, reverse, thiss) {
        //alert(thiss.className);


        var tb = table.tBodies[0], // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
            tr = Array.prototype.slice.call(tb.rows, 0), // put rows into array
            i;
        reverse = -((+reverse) || -1);
        //console.log("Top reverse = " + reverse);
        tr = tr.sort(function(a, b) { // sort rows
            if ($(thiss).hasClass("nums") === false) {
                //console.log("Primal reverse = " + reverse * (a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim())));
                return reverse // `-1 *` if want opposite order
                    *
                    (a.cells[col].textContent.trim() // using `.textContent.trim()` for test
                        .localeCompare(b.cells[col].textContent.trim())
                    );
            } else {
                // console.log(a.cells[col].textContent.trim() + "\n" + b.cells[col].textContent.trim());
                //var aa = Number(a.cells[col].textContent.trim());
                //var bb = Number(b.cells[col].textContent.trim());
                var zwrot;

                if (reverse === 1) {

                    zwrot = Number(a.cells[col].textContent.trim()) - Number(b.cells[col].textContent.trim());
                } else if (reverse === -1) {
                    zwrot = Number(b.cells[col].textContent.trim()) - Number(a.cells[col].textContent.trim());
                }
                //console.log("zwrot = " + zwrot);

                if (zwrot > 0) {
                    return 1;
                } else if (zwrot < 0) {
                    return -1;
                } else {
                    return 0;
                }
                //console.log("a = " + a + "\nb = " + b + "; reverse = " + reverse);

                //return reverse.valueOf();// `-1 *` if want opposite order    
            }

        });
        for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
        //console.log(thiss);
        arrows(thiss, reverse);

        //console.log("reverse = " + reverse);


    }

    function makeSortable(table) {
        var th = table.tHead,
            i;
        th && (th = th.rows[0]) && (th = th.cells);
        if (th) i = (th.length - 1);
        else return; // if no `<thead>` then do nothing
        //console.log("th.length = " + th.length + "\ni = " + i + "\nth[i-1].innerText = " + th[i-1].innerText);
        while (--i >= 0)(function(i) {
            var dir = 1;
            th[i].addEventListener('click', function() { sortTable(table, i, (dir = 1 - dir), this); });
            //console.log(th[i].innerText);
        }(i));

    }

    function makeAllSortable(parent) {
        parent = parent || document.body;
        var t = parent.getElementsByTagName('table'),
            i = t.length;
        while (--i >= 0) makeSortable(t[i]);
    }

    makeAllSortable();

    function arrows(header, dir) {

        //if ($(header).find("i").slice(0, 1).attr("class") === "fas fa-caret-up") {
        if (dir === -1) { //descending

            //switching = false;
            //shouldSwitch = true;

            //1111111111111111111111111111111111
            $(header).find("i.fas.fa-caret-up").removeClass("fas fa-caret-up").addClass("fas fa-angle-up").css({ "color": "green", "font-size": "16px" }).attr("data-original-title", "Sortuj rosnąco");
            //2222222222222222222222222222222222
            $(header).find("i.fas.fa-angle-down").removeClass("fas fa-angle-down").addClass("fas fa-caret-down").css({ "color": "red", "font-size": "19px" }).attr("data-original-title", "Posortowane malejąco");
            //33333333333333333333333333333333333
            $(header).siblings().find("i.fas.fa-caret-up").removeClass("fas fa-caret-up").addClass("fas fa-angle-up").css({ "color": "green", "font-size": "16px" }).attr("data-original-title", "Sortuj rosnąco");
            //444444444444444444444444444444444444
            $(header).siblings().find("i.fas.fa-caret-down").removeClass("fas fa-caret-down").addClass("fas fa-angle-down").css({ "color": "green", "font-size": "16px" }).attr("data-original-title", "Sortuj rosnąco");
            //switching = true;
            //dir = "desc";
        }
        //else if ($(header).find("i").slice(1, 2).attr("class") === "fas fa-caret-down") {
        else if (dir === 1) { //ascending



            //1111111111111111111111111111111111111
            $(header).find("i.fas.fa-angle-up").removeClass("fas fa-angle-up").addClass("fas fa-caret-up").css({ "color": "red", "font-size": "19px" }).attr("data-original-title", "Posortowane rosnąco");
            //222222222222222222222222222222222
            $(header).find("i.fas.fa-caret-down").removeClass("fas fa-caret-down").addClass("fas fa-angle-down").css({ "color": "green", "font-size": "16px" }).attr("data-original-title", "Sortuj malejąco");
            //333333333333333333333333333333333
            $(header).siblings().find("i.fas.fa-caret-up").removeClass("fas fa-caret-up").addClass("fas fa-angle-up").css({ "color": "green", "font-size": "16px" }).attr("data-original-title", "Sortuj rosnąco");
            //444444444444444444444444444444444
            $(header).siblings().find("i.fas.fa-caret-down").removeClass("fas fa-caret-down").addClass("fas fa-angle-down").css({ "color": "green", "font-size": "16px" }).attr("data-original-title", "Sortuj rosnąco");
            //dir = "desc";
            //switching = false;
            //shouldSwitch = true;

        }
        //else if ($(header).find("i").slice(0, 1).attr("class") === "fas fa-angle-up") {

        //    if ($(header).find("i").slice(1, 2).attr("class") === "fas fa-angle-down") {
        //        //console.log("Line 287: dir = " + dir + "\nswitching = " + switching + "\nswitchcount = " + switchcount);
        //        //dir = "asc";
        //        //switching = true;
        //        //shouldSwitch = true;
        //    }
        //    //else {
        //    //    dir = "desc";
        //    //    switching = false;
        //    //}

        //    //dir = "desc";
        //    //111111111111111111111111111111111111
        //    ($(header).siblings().find("i.fas.fa-caret-up").removeClass("fas fa-caret-up").addClass("fas fa-angle-up").css({ "color": "green", "font-size": "16px" }).attr("data-original-title", "Sortuj rosnąco"));
        //    //222222222222222222222222222222222
        //    ($(header).siblings().find("i.fas.fa-caret-down").removeClass("fas fa-caret-down").addClass("fas fa-angle-down").css({ "color": "green", "font-size": "16px" }).attr("data-original-title", "Sortuj malejąco"));
        //    //333333333333333333333333333333333
        //    ($(header).find("i.fas.fa-angle-up").removeClass("fas fa-angle-up").addClass("fas fa-caret-up").css({ "color": "red", "font-size": "18px", "left": "10px" }).attr("data-original-title", "Posortowane rosnąco"));
        //    //444444444444444444444444444444444
        //    //($(header).find("i.fas.fa-angle-down").removeClass("fas fa-angle-down").addClass("fas fa-caret-down").css({ "color": "red", "font-size": "18px", "left": "10px" }).attr("data-original-title", "Posortowane rosnąco"));
        //}
    }

});