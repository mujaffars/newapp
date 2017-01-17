var dateFormatted;

(function () {
    changeCss('body', 'font-size:' + parseInt(eval(eval(screenWidth * 4.7) / 100)) + 'px;');
    changeCss('.navbarbrand', 'font-size:' + fontSize + 'px !important;');
    changeCss('h4', 'font-size:' + parseInt(eval(eval(screenWidth * 4) / 100)) + 'px;');
    changeCss('h3', 'font-size:' + fontSize + 'px;');
    changeCss('h5', 'font-size:' + parseInt(eval(eval(screenWidth * 3.5) / 100)) + 'px;');
    changeCss('h6', 'font-size:' + parseInt(eval(eval(screenWidth * 3.5) / 100)) + 'px;');

    changeCss('.divCollection', 'font-size:' + parseInt(eval(eval(screenWidth * 5) / 100)) + 'px; \n\
                height: ' + parseInt(eval(eval(screenHeight * 25) / 100)) + 'px; line-height: ' + parseInt(eval(eval(screenHeight * 25) / 100)) + 'px;');

    changeCss('.btn', 'font-size:' + fontSize + 'px;');
    changeCss('.navbar-brand', 'font-size:' + eval(fontSize / 2) + 'px;');
    changeCss('#divCallRecords', 'font-size:' + recordFontSize + 'px;');
    changeCss('label.error', 'font-size:' + eval(fontSize / 1.5) + 'px;');
    changeCss('.imgLoader', 'height:' + eval(fontSize / 2) + 'px;');
    changeCss('#GridView1, #btnRefresh', 'font-size:' + eval(fontSize / 2.2) + 'px;');
    changeCss('.fa-check, .fa-check-circle, .fa-spinner, .fa-head', 'font-size:' + eval(20 * screenWidth / 360) + 'px;');



    $('.lnkLogOut').click(function () {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            (navigator.app && navigator.app.exitApp()) || (device && device.exitApp());
        } else {
            localStorage.setItem("logedIn", "false");
            $('#divCallRecords').hide();
            $('.tblLogin').show();
            $('.lnkLogOut').addClass('hide');
            window.location.reload();
        }
    })
    $('.fa-refresh').click(function () {
        $('#divLoading').removeClass('hide');
        getRecords();
    })

    $("#recordDate").datepicker({
        onSelect: function (dateText) {
            console.log("Selected date: " + dateText + "; input's current value: " + this.value);
            dateFormatted = this.value;
            refreshTab();
        }
    });

})();

function onLoad() {
    var d = new Date();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var output = (('' + day).length < 2 ? '0' : '') + day + '/' +
            (('' + month).length < 2 ? '0' : '') + month + '/' +
            d.getFullYear();
    var dateToday = output;

    dateFormatted = (('' + month).length < 2 ? '0' : '') + month + '/' +
            (('' + day).length < 2 ? '0' : '') + day + '/' +
            d.getFullYear();

    //dateFormatted = '01/16/2016';
    //$('.dateToday').text(dateToday);
    $('#recordDate').val(dateFormatted);

    $('a[data-toggle="tab"]').on('click', function (e) {
        var url = $(this).attr("href"); // the remote url for content
        var target = $(this).data("target"); // the target pane
        var tab = $(this); // this tab

        var theTab = $(tab).attr('id');

        if (theTab === 'tab1') {
            $('#home').html('<h4>Loading ...</h4>')
        } else if (theTab === 'tab2') {
            $('#menu1').html('<h4>Loading ...</h4>')
        } else if (theTab === 'tab3') {
            $('#menu2').html('<h4>Loading ...</h4>')
        }

        $(target).load(url + dateFormatted, function (result) {

            if (theTab === 'tab1') {
                var returnHtml = $("#home").find("div:nth-child(4)").html();
                var arrReturnHtml = returnHtml.split('<div>');

                var morEveData = arrReturnHtml[0].trim();
                var morEve = morEveData.split(' ');

                var morningCollection = 0;
                var eveningCollection = 0;
                if (morEve[1] !== undefined && morEve[1].trim() !== '') {
                    morningCollection = parseInt(morEve[1]);
                }
                if (morEve[3] !== undefined) {
                    eveningCollection = parseInt(morEve[3]);
                }
                if (isNaN(morningCollection)) {
                    morningCollection = 0;
                }
                var totalCollection = eval(morningCollection + eveningCollection);

                var gridTable = '<h4>Details not found</h4>';
                if ($('#home').find('#GridView1').length) {
                    gridTable = '<table class="table table-bordered table-striped">' + $('#home').find('#GridView1').html() + '</table>';
                }

                $('#home').html('<table id="tblMilkCollection">\n\
                <tr>\n\
                    <td>\n\
                        <div class="divCollection">' + morningCollection + '</div>\n\
                    </td>\n\
                    <td>\n\
                        <div class="divCollection">' + eveningCollection + '</div>\n\
                    </td>\n\
                </tr>\n\
            </table>\n\
            \n\
            <h4 style="text-align: center;">Total: ' + totalCollection + '</h4>');

                $('#home').append(gridTable);
            }
            else if (theTab === 'tab2') {
                var gridTable = '<h4>Details not found</h4>';
                if ($('#menu1').find('#GridView1').length) {
                    gridTable = '<table class="table table-bordered table-striped">' + $('#menu1').find('#GridView1').html() + '</table>';
                }
                $('#menu1').html(gridTable);
            } else if (theTab === 'tab3') {
                var gridTable = '<h4>Details not found</h4>';
                if ($('#menu2').find('#GridView1').length) {
                    gridTable = '<table class="table table-bordered table-striped">' + $('#menu2').find('#GridView1').html() + '</table>';
                }
                $('#menu2').html(gridTable);
            }
            tab.tab('show');
        });

    });

    // initially activate the first tab..
    $('#tab1').tab('show');

    refreshTab();

}

function refreshTab() {
    var $this;

    $('.nav-tabs').find('li').each(function () {
        if ($(this).hasClass('active')) {
            $this = $(this).find('a');
        }
    })

    var url = $($this).attr("href"); // the remote url for content
    var target = $($this).data("target"); // the target pane
    var tab = $($this); // this tab
    var theTab = $(tab).attr('id');

    if (theTab === 'tab1') {
        $('#home').html('<h4>Loading ...</h4>')
    } else if (theTab === 'tab2') {
        $('#menu1').html('<h4>Loading ...</h4>')
    } else if (theTab === 'tab3') {
        $('#menu2').html('<h4>Loading ...</h4>')
    }

    $(target).load(url + dateFormatted, function (result) {
        if (theTab === 'tab1') {
            var returnHtml = $("#home").find("div:nth-child(4)").html();
            var arrReturnHtml = returnHtml.split('<div>');

            var morEveData = arrReturnHtml[0].trim();
            var morEve = morEveData.split(' ');

            var morningCollection = 0;
            var eveningCollection = 0;
            if (morEve[1] !== undefined) {
                morningCollection = parseInt(morEve[1]);
            }
            if (morEve[3] !== undefined) {
                eveningCollection = parseInt(morEve[3]);
            }
            if (isNaN(morningCollection)) {
                morningCollection = 0;
            }
            var totalCollection = eval(morningCollection + eveningCollection);


            console.log($("#home").find('#GridView1').html());

            var gridTable = '<h4>Details not found</h4>';
            if ($('#home').find('#GridView1').length) {
                gridTable = '<table class="table table-bordered table-striped">' + $('#home').find('#GridView1').html() + '</table>';
            }
            $('#home').html('<table id="tblMilkCollection">\n\
                <tr>\n\
                    <td>\n\
                        <div class="divCollection">' + morningCollection + '</div>\n\
                    </td>\n\
                    <td>\n\
                        <div class="divCollection">' + eveningCollection + '</div>\n\
                    </td>\n\
                </tr>\n\
            </table>\n\
            \n\
            <h4 style="text-align: center;">Total: ' + totalCollection + '</h4>');

            $('#home').append(gridTable);
        }
        tab.tab('show');
    });
}

function changeCss(className, classValue) {
    // we need invisible container to store additional css definitions
    var cssMainContainer = $('#css-modifier-container');
    if (cssMainContainer.length == 0) {
        var cssMainContainer = $('<div id="css-modifier-container"></div>');
        cssMainContainer.hide();
        cssMainContainer.appendTo($('head'));
    }

    // and we need one div for each class
    classContainer = cssMainContainer.find('div[data-class="' + className + '"]');
    if (classContainer.length == 0) {
        classContainer = $('<div data-class="' + className + '"></div>');
        classContainer.appendTo(cssMainContainer);
    }

    // append additional style
    classContainer.html('<style>' + className + ' {' + classValue + '}</style>');
}