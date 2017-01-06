(function () {
    changeCss('body', 'font-size:' + parseInt(eval(eval(screenWidth * 4.7) / 100)) + 'px;');
    changeCss('.navbarbrand', 'font-size:' + fontSize + 'px !important;');
    changeCss('h4', 'font-size:' + parseInt(eval(eval(screenWidth * 4) / 100)) + 'px;');
    changeCss('h3', 'font-size:' + fontSize + 'px;');
    changeCss('h5', 'font-size:' + parseInt(eval(eval(screenWidth * 3.5) / 100)) + 'px;');
    changeCss('h6', 'font-size:' + parseInt(eval(eval(screenWidth * 3.5) / 100)) + 'px;');
    
    changeCss('.divCollection', 'font-size:' + parseInt(eval(eval(screenWidth * 5) / 100)) + 'px; \n\
                height: '+ parseInt(eval(eval(screenHeight * 25) / 100)) + 'px; line-height: '+ parseInt(eval(eval(screenHeight * 25) / 100)) + 'px;');
    
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
})();

function onLoad() {
    if ((/(ipad|iphone|ipod|android|windows phone)/i.test(navigator.userAgent))) {
        document.addEventListener('deviceready', initApp, false);
    } else {
        initApp();
    }
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