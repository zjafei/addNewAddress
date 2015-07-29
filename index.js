/**
 * User: Eric Ma
 * Email: zjafei@gmail.com
 * Date: 2015/5/11
 * Time: 10:31
 */
define(function (require, exports, module) {
    var errorClass = 'has-error',
        name = $('#name'),
        street = $('#street'),
        phone = $('#phone'),
        userCenterAddressFormSubmit = $('#userCenterAddressFormSubmit'),
        userCenterAddressForm = $('#userCenterAddressForm'),
        autoClosePopDialog = require('autoClosePopDialog'),
        tools = require('tools'),
        alertMag = require('alertMag'),
        autoLocal = require('autoLocal');

    var nameParent = name.parent(),
        streetParent = street.parent(),
        phoneParent = phone.parent();

    function getAddObj() {
        var select = $('#areadiv > select');
        return{
            'name': $('#name').val(),
            'province': select.eq(0).val(),
            'city': select.eq(1).val(),
            'area': select.eq(2).val(),
            'street': $('#street').val(),
            'phone': $('#phone').val(),
            'defaultAdd':$('#defaultAdd').prop('checked')
        };
    }
    autoLocal($('#area'));

    userCenterAddressFormSubmit.click(function () {
        userCenterAddressFormSubmit.blur();
        $('.show .' + errorClass).removeClass(errorClass);
        $('.js-alert-msg').remove();

        var checkForm = true;

        if (name.val() === '') {
            nameParent.addClass(errorClass);
            //nameParent.append(alertMag('danger', '姓名不能为空'));
            checkForm = false;
        }

        if (street.val() === '') {
            streetParent.addClass(errorClass);
           // streetParent.append(alertMag('danger', '街道地址不能为空'));
            checkForm = false;
        }

        var phoneVal = phone.val();
        if (!tools.regex.mobPhone(phoneVal) && !tools.regex.phone(phoneVal)) {
            phoneParent.addClass(errorClass);
           // phoneParent.append(alertMag('danger', '联系方式不正确'));
            checkForm = false;
        }

        if (checkForm) {
            //type=0 发货
            var url=top.APP_PATH+'/Usercenter/Commuser/shipaddress';
            if(top._ADDNEWADDRESS.setUp.type==1)
            {
                url=top.APP_PATH+'/Usercenter/Commuser/recaddress';
            }
            alert(url);
            $.ajax({
                type: 'post',
                url: url,
                data: userCenterAddressForm.serialize(),
                async: false,
                dataType: 'json',
                success: function (data) {
                    switch (data.status) {
                        case 1:
                            top._ADDNEWADDRESS.setUp.callback(getAddObj());
                            break;
                    }
                },
                error: function () {
                    checkForm = false;
                    alert('网络错误');
                }
            });
        }
    });
});