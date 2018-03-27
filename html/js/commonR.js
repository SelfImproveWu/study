/**
 * Created by admin on 2018/3/19.
 */
//添加删除切换Element的Class
function hasClass(obj, cls) {
    //Log.info(obj.className);
    //Log.info('ut_focus_style fdkdkd'.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))+'aaa');

    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) {
        obj.className +=(" " + cls);
    }
}

function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, ' ').trim();
    }
}