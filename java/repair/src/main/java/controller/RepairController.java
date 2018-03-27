package controller;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.fastjson.JSON;

import entity.RepairEntity;
import service.RepairService;
import util.StringUtil;
@Controller 
@RequestMapping("/repair")
public class RepairController {
	@RequestMapping("/listByUserId")
	public @ResponseBody String listByUserId(HttpServletRequest request){
		String result= "";
		try{
			String userId = StringUtil.getString(request.getParameter("userId"));
			ArrayList<RepairEntity> list = new ArrayList<RepairEntity>();
			RepairService rs = new RepairService();
			list = rs.listByUserId(userId);//查看所有订单
			result = JSON.toJSONString(list);
			}catch(Exception e){
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 前台加载首页
	 * @param request
	 * @return
	 */
	@RequestMapping("/index")
	public ModelAndView index(HttpServletRequest request){
		ModelAndView mdv = new ModelAndView();
		try{
			String userId = StringUtil.getString(request.getParameter("userId"));
			mdv.setViewName("repair");
			mdv.addObject("userId", userId);
		}catch(Exception e){
			e.printStackTrace();
		}		
		return mdv;
	}
	@RequestMapping(value="/add", method=RequestMethod.POST)
	public @ResponseBody String add(HttpServletRequest request){
		String result= "";
		try{
			int status = 0;//状态
			String userId = StringUtil.getString(request.getParameter("userId"));
			String repairNo = StringUtil.getString(request.getParameter("repairNo"));//修理单号
			String vehicleId = StringUtil.getString(request.getParameter("vehicleId"));
			String drivingDistance = StringUtil.getString(request.getParameter("drivingDistance"));//驾驶里程
			String tankNum = StringUtil.getString(request.getParameter("tankNum"));//油量
			String description = StringUtil.getString(request.getParameter("description"));
			
			RepairEntity repairsheet = new RepairEntity();
			repairsheet.setUser_id(Integer.parseInt(userId));
			repairsheet.setDrivingDistance(Integer.parseInt(drivingDistance));
			repairsheet.setVehicle_id(Integer.parseInt(vehicleId));
			repairsheet.setTankNum(Integer.parseInt(tankNum));
			repairsheet.setRepairNo(repairNo);
			repairsheet.setDescription(description);
			repairsheet.setStatus(status);
			
			ArrayList<RepairEntity> list = new ArrayList<RepairEntity>();
			RepairService rs = new RepairService();
			
			result = rs.add(repairsheet);//添加修理单
			result = JSON.toJSONString(list);
			
			}catch(Exception e){
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 管理员更新数据
	 * @param request
	 * @return
	 */
	@RequestMapping(value="/updateByAdmin", method=RequestMethod.POST)
	public @ResponseBody String updateByAdmin(HttpServletRequest request){
		String result= "";
		try{
			String userId = StringUtil.getString(request.getParameter("userId"));
			String repairNo = StringUtil.getString(request.getParameter("repairNo"));//修理单号
			String vehicleId = StringUtil.getString(request.getParameter("vehicleId"));
			String drivingDistance = StringUtil.getString(request.getParameter("drivingDistance"));//驾驶里程
			String tankNum = StringUtil.getString(request.getParameter("tankNum"));//油量
			String description = StringUtil.getString(request.getParameter("description"));
			String totalPrice = StringUtil.getString(request.getParameter("totalPrice"));//总价
			String itamsNum = StringUtil.getString(request.getParameter("itamsNum"));//修理数
			String fittingNum = StringUtil.getString(request.getParameter("fittingNum"));//配件数
			String status = StringUtil.getString(request.getParameter("status"));
			
			RepairEntity repairsheet = new RepairEntity();
			repairsheet.setUser_id(Integer.parseInt(userId));
			repairsheet.setDrivingDistance(Integer.parseInt(drivingDistance));
			repairsheet.setVehicle_id(Integer.parseInt(vehicleId));
			repairsheet.setTankNum(Integer.parseInt(tankNum));
			repairsheet.setRepairNo(repairNo);
			repairsheet.setDescription(description);
			repairsheet.setStatus(Integer.parseInt(status));
			repairsheet.setTotalPrice(Float.parseFloat(totalPrice));
			repairsheet.setIteamsNum(Integer.parseInt(itamsNum));
			repairsheet.setFittingNum(Integer.parseInt(fittingNum));
			
			ArrayList<RepairEntity> list = new ArrayList<RepairEntity>();
			RepairService rs = new RepairService();
			
			list = rs.listByUserId(userId);//查看所有订单
			result = JSON.toJSONString(list);
			
			}catch(Exception e){
			e.printStackTrace();
		}
		return result;
	}
	@RequestMapping(value="/update", method=RequestMethod.POST)
	public @ResponseBody String update(HttpServletRequest request){
		String result= "";
		try{
			int status = 0;//状态
			String userId = StringUtil.getString(request.getParameter("userId"));
			String repairNo = StringUtil.getString(request.getParameter("repairNo"));//修理单号
			String vehicleId = StringUtil.getString(request.getParameter("vehicleId"));
			String drivingDistance = StringUtil.getString(request.getParameter("drivingDistance"));//驾驶里程
			String tankNum = StringUtil.getString(request.getParameter("tankNum"));//油量
			String description = StringUtil.getString(request.getParameter("description"));
			
			RepairEntity repairsheet = new RepairEntity();
			repairsheet.setUser_id(Integer.parseInt(userId));
			repairsheet.setDrivingDistance(Integer.parseInt(drivingDistance));
			repairsheet.setVehicle_id(Integer.parseInt(vehicleId));
			repairsheet.setTankNum(Integer.parseInt(tankNum));
			repairsheet.setRepairNo(repairNo);
			repairsheet.setDescription(description);
			repairsheet.setStatus(status);
			
			ArrayList<RepairEntity> list = new ArrayList<RepairEntity>();
			RepairService rs = new RepairService();
			
			list = rs.listByUserId(userId);//查看所有订单
			result = JSON.toJSONString(list);
			
			}catch(Exception e){
			e.printStackTrace();
		}
		return result;
	}
	
}
