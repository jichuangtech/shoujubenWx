const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * Order 对象
 */
function copyOrder(src) {
    return {
        id: src.id,
        name: src.name,
        color: src.color,
        c1: src.c1,
        c2: src.c2,
        c3: src.c3,
        c4: src.c4,
        c5: src.c5,
        c6: src.c6,
        c7: src.c7,
        c8: src.c8,
        c9: src.c9,
        number: src.number,
        unitPrice: src.unitPrice,
        total: src.total
    };
}

function newOrder() {
    return {
        id: -1,
        name: "",
        color: "",
        c1: "",
        c2: "",
        c3: "",
        c4: "",
        c5: "",
        c6: "",
        c7: "",
        c8: "",
        c9: "",
        number: "",
        unitPrice: "",
        total: ""
    }
}

function Arabia_To_SimplifiedChinese(Num) {
    for (let i = Num.length - 1; i >= 0; i--) {
        Num = Num.replace(",", "") //替换Num中的“,”
        Num = Num.replace(" ", "") //替换Num中的空格
    }
    if (isNaN(Num)) { //验证输入的字符是否为数字
        //alert("请检查小写金额是否正确");
        return;
    }
    //字符处理完毕后开始转换，采用前后两部分分别转换
    let part = String(Num).split(".");
    let newchar = "";
    //小数点前进行转化
    for (let i = part[0].length - 1; i >= 0; i--) {
        if (part[0].length > 10) {
            //alert("位数过大，无法计算");
            return "";
        } //若数量超过拾亿单位，提示
        let tmpnewchar = ""
        let perchar = part[0].charAt(i);
        switch (perchar) {
            case "0":
                tmpnewchar = "零" + tmpnewchar;
                break;
            case "1":
                tmpnewchar = "一" + tmpnewchar;
                break;
            case "2":
                tmpnewchar = "二" + tmpnewchar;
                break;
            case "3":
                tmpnewchar = "三" + tmpnewchar;
                break;
            case "4":
                tmpnewchar = "四" + tmpnewchar;
                break;
            case "5":
                tmpnewchar = "五" + tmpnewchar;
                break;
            case "6":
                tmpnewchar = "六" + tmpnewchar;
                break;
            case "7":
                tmpnewchar = "七" + tmpnewchar;
                break;
            case "8":
                tmpnewchar = "八" + tmpnewchar;
                break;
            case "9":
                tmpnewchar = "九" + tmpnewchar;
                break;
        }
        switch (part[0].length - i - 1) {
            case 0:
                tmpnewchar = tmpnewchar;
                break;
            case 1:
                if (perchar != 0) tmpnewchar = tmpnewchar + "十";
                break;
            case 2:
                if (perchar != 0) tmpnewchar = tmpnewchar + "百";
                break;
            case 3:
                if (perchar != 0) tmpnewchar = tmpnewchar + "千";
                break;
            case 4:
                tmpnewchar = tmpnewchar + "万";
                break;
            case 5:
                if (perchar != 0) tmpnewchar = tmpnewchar + "十";
                break;
            case 6:
                if (perchar != 0) tmpnewchar = tmpnewchar + "百";
                break;
            case 7:
                if (perchar != 0) tmpnewchar = tmpnewchar + "千";
                break;
            case 8:
                tmpnewchar = tmpnewchar + "亿";
                break;
            case 9:
                tmpnewchar = tmpnewchar + "十";
                break;
        }
        newchar = tmpnewchar + newchar;
    }
    //替换所有无用汉字，直到没有此类无用的数字为止
    while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
        newchar = newchar.replace("零亿", "亿");
        newchar = newchar.replace("亿万", "亿");
        newchar = newchar.replace("零万", "万");
        newchar = newchar.replace("零零", "零");
    }
    //替换以“一十”开头的，为“十”
    if (newchar.indexOf("一十") == 0) {
        newchar = newchar.substr(1);
    }
    //替换以“零”结尾的，为“”
    if (newchar.lastIndexOf("零") == newchar.length - 1) {
        newchar = newchar.substr(0, newchar.length - 1);
    }
    return newchar;
}

function DX(n) {
        if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
            return "数据非法";
        var unit = "千百拾亿千百拾万千百拾元角分", str = "";
            n += "00";
        var p = n.indexOf('.');
        if (p >= 0)
            n = n.substring(0, p) + n.substr(p+1, 2);
            unit = unit.substr(unit.length - n.length);
        for (var i=0; i < n.length; i++)
            str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
        return str.replace(/零(千|百|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元");
}

function c2i(str) {
    return str === "" || str === undefined ? 0 : str;
}

/**
 * 该方法以 iphone6 plus为基准，进行计算其他设备的尺寸大小
 *  6 plus pixelRatio = 3
 */
const iphone6PlusWidth = 414;

function getCanvasFontSize(iphone6pSize, windowWidth) {
    return iphone6pSize * windowWidth / iphone6PlusWidth;
}

/**
 * 将小数点后两位存在0的位去除掉
 */
function convertDecimalPart(src) {
    let result = "" + src;
    let lastPart = result.charAt(result.length -1);
    let last2Part = result.charAt(result.length - 2);
    let pointIndex = result.indexOf(".");
        

    if("0" === lastPart && "0" === last2Part) {
        result = result.substring(0, pointIndex);
    } else if ("0" === lastPart) {
        result = result.substring(0, result.length - 1);
    }
    console.log(" convertDecimalPart srtSrc: " + src + ", srtSrc.length: " + src.length + ", pointIndex: " + pointIndex + ", lastPart: " + lastPart + ", last2Part: " + last2Part + ", result: " + result);
    return result;
}


module.exports = {
    formatTime: formatTime,
    copyOrder: copyOrder,
    newOrder: newOrder,
    Arabia_To_SimplifiedChinese: Arabia_To_SimplifiedChinese,
    DX: DX,
    c2i: c2i,
    getCanvasFontSize: getCanvasFontSize,
    convertDecimalPart: convertDecimalPart
}