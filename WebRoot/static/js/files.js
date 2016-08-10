

/**
 * 通过两个条件进行筛选
 */
function select(){
	var nfSelect = $('#nfSelect');
	var ysSelect = $('#ysSelect');
	var year = nfSelect.val();
	var stid = ysSelect.val();
	$.ajax({
	    type: "POST",
	    cache: false,
	    dataType:"json",
	    url: "/files/selects/",
	    data:{'year':year,'stid':stid},
	    success : function(data,stau){
	    	console.log(data);
	    	var old_st = $('#old_sts');
	    	old_st.html('');
	    	html = '';
	    	var dn = data.length;
	    	for(var i =0;i<dn;i++){
	    		html += '<option>'+data[i].STCD+','+data[i].STNM+'</option>\n'
	    	}
	    	old_st.html(html)
	    },
	});
}

/**
 * 增加一个站点，显示输入框
 * @param e
 */
function show(e){
	var btn = $(e);
	var id = btn.attr('id');
	$('#'+id+'_show').fadeIn(100);
}

/**
 * 增加一个站点到列表中
 * @param e
 */
function addClick(e){
	var btn = $(e);
	var id = btn.attr('id');
	var input = $('#'+id+'_st');
	var text =  $.trim(input.val());
	
	if(id == 'add'){
		$.ajax({
		    type: "POST",
		    cache: false,
		    dataType:"json",
		    url: "/files/jsonST/",
		    data:{'stcd':text},
		    success : function(data,stau){
		    	if('res' in data){
		    		alert("请输入正确的代码！！");
			    	return;
		    	}else{
		    		text = data.STCD+','+data.STNM;
			    	var select = $('#'+id+'_sts');
			    	select.append('<option>'+text+'</option>');
			    	$('#'+id+'_show').fadeOut(100);
			    	return;
		    	}
		    },
		    fail : function(){
		    	alert("请输入正确的代码！！");
		    	return;
		    },
		});
	}else{
		var flag = 0;
		var texts = '';
		var oldSelect = $('#old_sts');
		oldSelect.find('option').each(function (){
			if($(this).text().split(',')[0] == text){
				texts = $(this).text()
				flag = 1;
			}
		});
		if(flag == 0){
			alert('请输入正确的代码！！');
			return;
		}
		var select = $('#'+id+'_sts');
		select.append('<option>'+texts+'</option>');
		$('#'+id+'_show').fadeOut(100);
	}
}

/**
 * 移除一个站点从列表中
 * @param e
 */
function rmClick(e){
	var btn = $(e);
	var id = btn.attr('id');
	var select = $('#'+id+'_sts');
	var text = select.val();
	select.find('option').each(function (){
		if(text.includes($(this).text())){
			$(this).remove();
		}
	});
}

/**
 * 将上一年站点选中的站点移动到去掉站点列表中
 */
function rmST(){
	var select = $('#old_sts');
	var texts = select.val();
	var mSelect = $('#dll_sts');
	var n = texts.length;
	for(var i=0;i<n;i++){
		var text = texts[i];
		mSelect.append('<option>'+text+'</option>');
	}
}