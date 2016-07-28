package edu.hhu.share.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.jfinal.core.Controller;
import com.jfinal.json.Json;
import com.jfinal.kit.JsonKit;

import edu.hhu.share.entities.SWYS;

/**
 * 水文要素维护和资费维护的控制器
 * @author Jicun
 *
 */
public class SWYSController extends Controller{

	public void index(){
		setAttr("swyss", SWYS.dao.findAll());
		render("/view/swys.jsp");
	}
	public void zf(){
		setAttr("swyss", SWYS.dao.findAll());
		render("/view/zf.jsp");
	}
	/**
	 * 修改单行数据
	 */
	public void commit(){
		String mData=getPara("swys");
		SWYS swys = JSON.parseObject(mData,SWYS.class);
		swys.turnDB().update();
		renderText("success");
	}
	
	/**
	 * 插入一条数据
	 */
	public void add(){
		String mData=getPara("swys");
		SWYS swys = JSON.parseObject(mData,SWYS.class);
		swys.turnDB().save();
		renderText("success");
	}
	
	/**
	 * 删除一条数据
	 */
	public void drop(){
		String ysdm = getPara("swys");
		SWYS.dao.drop(ysdm);
		renderText("success");
	}
	
	/**
	 * 得到所有的数据
	 */
	public void jsonAll(){
		renderJson(SWYS.dao.findAll());
	}
}
