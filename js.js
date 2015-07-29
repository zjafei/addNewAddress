/**
 * User: Eric Ma
 * Email: zjafei@gmail.com
 * Date: 2015/5/30
 * Time: 15:32
 */
define(function (require, exports, module) {
    var dialogPlus = require('dialogPlus');

    module.exports = function (callback, type) {
        var cb = function () {
        };

        if (typeof callback === "function") {
            cb = callback;
        }
        var title = '新增发货地址';
        switch (type) {
            case 1:
                title = '新增收货地址';
                break;
            default:
        }
        _ADDNEWADDRESS = dialogPlus({
            title: title,
            padding: 5,
            url: seajs.data.base + 'modules/widget/addNewAddress/index.html',
            quickClose: true,
            setUp: {
                callback: cb,
                type: type
            }
        });
        _ADDNEWADDRESS.showModal();
    };
});