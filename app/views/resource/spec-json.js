//***********************************************************
// Name: json to table
// Author: Wally.he@hylinkad.com
// Date: 2015.05.29
// Desc: 
//***********************************************************

window.hylink = window.hylink || {};
(function(hy){
	var DEFAULT_COL = 3;
	var jsonData = null;

	function loadData(name){
		var car = $("script[data-spec-json-car]").attr("data-spec-json-car");
		if(car && car!=""){
			$.get("http://"+((location.hostname=='www.chevrolet.com.cn' || location.hostname=='m.chevrolet.com.cn')?'www':'webtest')+".chevrolet.com.cn/data/"+car+".json", function (data) {
		        jsonData = data;
		        _fireEvent("onDataReady", data);
		    },'json');
		}
	}

	loadData();

	function isDataReady(){
		return jsonData ? true : false;
	}

	function getSpecData(){
		return jsonData;
	}

	//车型比较,
	function compareCars(jsons, models, col){
		jsons = jsons ? jsons : jsonData;
		var carNums = jsons.length;
		if(carNums>1 && carNums!=models.length)	{alert("数据不匹配");return;}
		if(col==null || typeof col!="number"){
			col = DEFAULT_COL;
		}
		if(carNums>col){
			col = carNums;
		}
		var indexArr  = [];
		for(var i=0;i<carNums;i++){
			indexArr.push(getCarIndex(jsons[i], models[i]));
		}

		var mJson = {name:[], spec:[]};//合并后的格式
		for(i=0;i<carNums;i++){
			mJson.name.push(jsons[i].name[indexArr[i]]);
		}

		var catalogNum = getCatalogTotal(jsons, carNums);

		for(i=0;i<catalogNum;i++){
			if(!jsons[0].spec[i])	continue;
			if(jsons[0].spec[i].catalog=="外观颜色"||jsons[0].spec[i].catalog=="选装包"||jsons[0].spec[i].catalog=="内饰颜色")	continue;//车身颜色不会在车型比较中出现
			var catalogObj = _compareCarsCatalog(jsons, indexArr, carNums, i);
			mJson.spec.push(catalogObj);
			//break;
		}
		var outStr = _jsonToTable(mJson, -1);
		outStr = _formatCol(outStr, col);
		return outStr;
	}

	function _compareCarsCatalog(jsons, indexArr, carNums, catalogIndex){
		var arr = [];
		for(var i=0;i<carNums;i++){
			arr.push(jsons[i].spec[indexArr[i]]);
		}
		var specObj0 = jsons[0].spec[catalogIndex];
		
		var specObj = {catalog:specObj0.catalog, content:null};
		var carSpecArr = _getSingleCarSpec(jsons, indexArr, carNums, catalogIndex);
		
		var conArr = carSpecArr[0];
		for(i=1;i<carSpecArr.length;i++){
			conArr = _mergeCarsKeyAndValue(conArr, carSpecArr[i]);
			//console.log(conArr, carSpecArr[i]);
			//break;
		}
		specObj.content = conArr;
		return specObj;
	}

	function _mergeCarsKeyAndValue(conArr, conArr2){
		var v0 = [];
		if(conArr == undefined)
		{
			return;
		}else if(conArr.length == 0)
		{
			return;
		}
		for(var i=0;i<conArr[0].v.length;i++){
			v0.push("-");
		}

		var retArr = [];
		var sameSpecArr = [];
		for(var i=0;i<conArr.length;i++){
			var key = conArr[i].k;
			var isFound = false;
			for(var ii=0;ii<conArr2.length;ii++){
				if(conArr2[ii].k==key){
					sameSpecArr.push({k:key, m:0, v:conArr[i].v.concat(conArr2[ii].v[0])});
					conArr.splice(i, 1); i--;
					conArr2.splice(ii, 1);
					isFound = true;
					break;
				}
			}
		}

		//车型1与车型2相同部分
		for(i=0;i<sameSpecArr.length;i++){
			retArr.push(sameSpecArr[i]);
		}
		//车型1
		for(i=0;i<conArr.length;i++){
			retArr.push({k:conArr[i].k, m:0, v:conArr[i].v.concat("-")});
		}
		//车型2
		for(i=0;i<conArr2.length;i++){
			retArr.push({k:conArr2[i].k, m:0, v:v0.concat(conArr2[i].v[0])});
		}
		return retArr;
	}

	function _getSingleCarSpec(jsons, indexArr, carNums, catalogIndex){
		var carSpecArr = [];
		for(var n=0;n<carNums;n++){
			var specObj0 = jsons[n].spec[catalogIndex];
			var conArr = [];
			if(specObj0 == undefined)
			{
				var new_obj = new Object();
				new_obj.catalog = "";
				new_obj.content = [];
				specObj0 = new_obj;
			}
			for(var i=0,len=specObj0.content.length;i<len;i++){
				conArr.push({k:specObj0.content[i].k, m:0, v:[specObj0.content[i].v[indexArr[n]]]});
			}
			carSpecArr.push(conArr);
		}
		return carSpecArr;
	}

	function getCatalogTotal(jsons, carNums){
		var catalogNum = jsons[0].spec.length;
		for(i=1;i<carNums;i++){
			var tempCatalogNum = jsons[i].spec.length;
			if(tempCatalogNum>catalogNum){
				catalogNum = tempCatalogNum;
			}
		}
		return catalogNum;
	}

	function getCarIndex(value, model){
		var index = -1;
		if(model!=null && typeof(model)=="string"){
			for(var i=0;i<value.name.length;i++){
				if(model==value.name[i].model){
					index = i;
					break;
				}
			}
			if(index==-1){	alert("找不到车型: "+model);return;}
		}
		return index;
	}

	function _formatCol(value, col){
		var spec = $(value);
		var curCol = $("table:eq(0) tr:eq(0) td", spec).length-1;
		if(col>curCol){
			var tdStr = "";
			for(var i=0,len=col-curCol;i<len;i++){
				tdStr	+=	"<td class='empty'></td>";
			}
			$("table tr", spec).append(tdStr);
		}
		
		return spec;
	}

	var geshu;

	//输出车型配制表
	function jsonToTable (value, model, oneTable) {
		var jsons = value ? value : jsonData;
		return oneTable ? _jsonToTable2(jsons, model) : _jsonToTable(jsons, model);
	}
	//手风琴(下拉展开形式)表格, 每个分类是一个table
	function _jsonToTable(jsons, model){
		var index  = getCarIndex(jsons, model);
		var str = createTableHead(jsons.name, index);

		str += createTableContent(jsons.spec, jsons.name.length, index);
		if(index==-1 && model==null){//多车型, 需要合并相同的字段
			str = mergeData(str);
			str = classConvert(str);
		}
		return str;
	}
	//以另一种全表格输出方式, 整个配置表就是一个table.
	function _jsonToTable2(jsons, model){
		var index  = getCarIndex(jsons, model);
		var str = createTableHead(jsons.name, index);

		str += createTableContent2(jsons.spec, jsons.name.length, index);
		if(index==-1 && model==null){//多车型, 需要合并相同的字段
			str = mergeData(str);
			str = classConvert(str);
		}
		return str;
	}

	function insert_flg(str,flg,sn){
		var newstr="";
		for(var i=0;i<str.length;i+=sn){
			var tmp=str.substring(i, i+sn);
			newstr+=tmp+flg;
		}
		return newstr;
	}

	function createTableHead(value, index){
		var str = "<table class='spec_header'><tbody>";
		geshu = 810/value.length; // 950 - 140
		var isChineseName = value[0].model!="";
		str += "<tr class='model'><td class='key header_table_td' data-style='140'>车型名称</td>";
		for(var i=0;i<value.length;i++){
			if(index>-1 && index!=i)	continue;
			var obj = value[i];
			str += "<td class='value header_table_td' data-style='"+geshu+"'>";
			//str += isChineseName ? obj.model : obj.model_en;
			var  _aa = isChineseName ? obj.model : obj.model_en;
			var _ind = _aa.indexOf("(");
			if(_ind != -1)
			{
				_aa = insert_flg(_aa,"<br />",_ind);
			}
			str += _aa;
			str += "</td>";
		}
		str += "</tr>";
		/*if(value[0].model_en!="" && isChineseName){
			str += "<tr class='model'><td class='key heaer_table_price'>车型英文名</td>";
			for(var i=0;i<value.length;i++){
				if(index>-1 && index!=i)	continue;
				var obj = value[i];
				str += "<td class='value heaer_table_price'>";
				str += obj.model_en;
				str += "</td>";
			}
		}*/
		
		str += "<tr class='price'><td class='key heaer_table_price'>官方指导价(元)</td>";
		for(var i=0;i<value.length;i++){
			if(index>-1 && index!=i)	continue;
			var obj = value[i];
			str += "<td class='value heaer_table_price'>";
			str += formatPrice(obj.price);
			str += "</td>";
		}
		str += "</tr>";
		if(value[0].price2>0 ){
			str += "<tr class='model'><td class='key heaer_table_price'>节能惠民价(元)</td>";
			for(var i=0;i<value.length;i++){
				if(index>-1 && index!=i)	continue;
				var obj = value[i];
				str += "<td class='value heaer_table_price'>";
				str += formatPrice(obj.price2);
				str += "</td>";
			}
			str += "</tr>";
		}
		str += "</tbody></table>";
		return str;
	}

	function createTableContent(value, num, index){
		var str = "<div class='accordion_box_mask'><div class='accordion-box specacc'>";//
		for(var i=0;i<value.length;i++){
			str += createTableCatalog(value[i], num, index);
		}
		return str;
	}

	function createTableContent2(value, num, index){
		var str = "<div class='spec_table_content'><table class=''><tbody>";//
		for(var i=0;i<value.length;i++){
			str += createTableCatalog2(value[i], num, index);
		}
		str += "</tbody></table></div>";

		return str;
	}

	function createTableCatalog(value, num, index){
		//catalog bar
		var str = "<div class='accordion-item'>";
		str += "<div class='sub-title'  data-isdisplay = 'false' >";
		str += 		"<span>"+value.catalog+"</span>";
		str += "<div class='heng'></div><div class='shu'></div>";
		str += 	"</div>";
		//end catalog bar

		//content
		str += "<div class='accordion-wrap'>";
		str += 		"<div class='accordion-sub-item'>";
		str += 			"<div class='accordion-con'>";
		str += 				"<table><tbody>";

		//create empty tr td for 对齐表格
		str += "<tr>";
		str += "<td data-style='140' height='0' style='padding:0'>";
		for(var ii=0;ii<num;ii++){
			str  += "<td data-style='"+geshu+"' style='padding:0; border-left:1px solid #b1b1b1 '>";
			//str += '&nbsp;';
			str += "</td>";
		}
		str += "</tr>";

		var conArr = value.content;
		if(conArr != undefined)
		{
			for(var i=0;i<conArr.length;i++){
				var obj = conArr[i];
				str  += "<tr data-merge='"+obj.m+"' class='content'>";
				str  += "<td class='key cont_table_name'>";
				str  += obj.k.split("\n").join("<br/>");
				str  += "</td>";
				var data = obj.v;
				for(var ii=0;ii<num;ii++){
					if(index>-1 && index!=ii)	continue;
					str  += "<td class='value cont_table_value'>";
					str += data[ii];
					str += "</td>";
				}
				str += "</tr>";
			}
		}

		str += 				"</tbody></table>";
		str += 			"</div>";
		str += 		"</div>";
		str += "</div>";
		str += "</div>";
		str = conArr.length != 0 ? str : "";
		return str;
	}

	function createTableCatalog2(value, num, index){
		//catalog bar
		var str = "<tr class='title' >";
		str += 		"<th>"+value.catalog+"</th>";
		str += 		"<td colspan='"+num+"'></td>";
		str += 	"</tr>";


		var conArr = value.content;
		if(conArr != undefined)
		{
			for(var i=0;i<conArr.length;i++){
				var obj = conArr[i];
				str  += "<tr data-merge='"+obj.m+"' class='content'>";
				str  += "<td class='key cont_table_name'>";
				str  += obj.k.split("\n").join("<br/>");
				str  += "</td>";
				var data = obj.v;
				for(var ii=0;ii<num;ii++){
					if(index>-1 && index!=ii)	continue;
					str  += "<td class='value cont_table_value'>";
					str += data[ii];
					str += "</td>";
				}
				str += "</tr>";
			}
		}

		str = conArr.length != 0 ? str : "";
		return str;
	}

	function mergeData(value){
		var table = $(value);
		$("tr[data-merge='1']", table).each(function(index, element){
			var td = $("td", element);
			var arr = [];
			var curI = 1;
			var curV = td.eq(curI).text();
			var curN = 1;
			for(var i=curI+1;i<td.length;i++){
				if(td.eq(i).text()==curV){
					td.eq(curI).attr("colspan", ++curN);//.addClass("colspan"+curN);
					td.eq(i).remove();
				}else{
					curI = i;
					curV = td.eq(curI).text();
					curN = 1;
				}
			}
		});
		return table;
	}

	function classConvert(value){
		var table = $(value);
		$("td[data-style]", table).each(function(index, element){
			$(this).attr("width", $(this).attr("data-style"));
		});
		
		return table;
	}

	function formatPrice(strNum){
		if (strNum.toString().length <= 3) {
			return "TBC";
		}
		if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
			return strNum;
		}
		var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
		var re = new RegExp();
		re.compile("(\\d)(\\d{3})(,|$)");
		while (re.test(b)) {
			b = b.replace(re, "$1,$2$3");
		}
		return a + "" + b + "" + c;
	}

	function getFeatures(jsons, model, arr){
		jsons = jsons ? jsons : jsonData;
		var retArr = [];
		var foundNum = 0;
		var index  = getCarIndex(jsons, model);
		//if(index<0){alert("找不到车型["+model+"]");return [];}
		var spec = jsons.spec;

		for(var i=0;i<spec.length;i++){
			var dArr = spec[i].content;

			for(var k=0;k<dArr.length;k++){
				var cObj = dArr[k];
				for(var n=0;n<arr.length;n++){
					if(cObj.k=="发动机" && arr[n] =="发动机"){//TODO 临时这样, 到时直接完全匹配
						retArr[n] = {name:arr[n], value:cObj.v[index]};
						foundNum++;
						if(foundNum>=arr.length)	return retArr;
						//break;
					}else{
						if(cObj.k.indexOf(arr[n])!=-1  && arr[n] !="发动机"){
							retArr[n] = {name:arr[n], value:cObj.v[index]};
							foundNum++;
							if(foundNum>=arr.length)	return retArr;
						}
					}
					//break;
				}
			}
		}
		return retArr;
	}

	var _listeners = [];
    function addEventListener(type, fn){
    	if (typeof _listeners[type] === "undefined") {
            _listeners[type] = [];
        }
        if (typeof fn === "function") {
            _listeners[type].push(fn);
        }    
    }
    function removeEventListener(type, fn){
    	var arrayEvent = _listeners[type];
        if (typeof type === "string" && arrayEvent instanceof Array) {
            if (typeof fn === "function") {
                // 清除当前type类型事件下对应fn方法
                for (var i=0, length=arrayEvent.length; i<length; i+=1){
                    if (arrayEvent[i] === fn){
                        _listeners[type].splice(i, 1);
                        break;
                    }
                }
            } else {
                // 如果仅仅参数type, 或参数fn邪魔外道，则所有type类型事件清除
                delete _listeners[type];
            }
        }
    }
    function _fireEvent(type, obj){
    	var arrayEvent = _listeners[type];
        if (arrayEvent instanceof Array) {
            for (var i=0, length=arrayEvent.length; i<length; i+=1) {
                if (typeof arrayEvent[i] === "function") {
                	var params = { type: type, target:this };
                	if(obj){
                		for(var prop in obj){
                			params[prop] = obj[prop];
                		}
                	}
                    arrayEvent[i](params);    
                }
            }
        } 
    }

	hy.isSpecDataReady = isDataReady;
	hy.getSpecData = getSpecData;
	hy.addSpecEventListener = addEventListener;
	hy.removeSpecEventListener = removeEventListener;
	hy.specJsonToTable = jsonToTable;
	hy._specJsonToTable = _jsonToTable;
	hy.compareCars = compareCars;
	hy.formatPrice = formatPrice;
	hy.getFeatures = getFeatures;


})(hylink);