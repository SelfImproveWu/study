package service;

import java.util.ArrayList;
import java.util.List;
import entity.RepairEntity;
import util.DAOUtil;

public class RepairService {
	/**
	 * 根据用户ID获取修理单列表
	 * @param userId
	 * @return
	 */
	public ArrayList<RepairEntity> listByUserId(String userId) {
		ArrayList<RepairEntity> list = new ArrayList<RepairEntity>();
		try{
			String sql = "SELECT * FROM repairsheet WHERE user_id = ?";
			List<Object> params = new ArrayList<Object>();
			params.add(userId);
			DAOUtil dao = new DAOUtil();
			list = (ArrayList<RepairEntity>)dao.getForList(RepairEntity.class, sql, params.toArray());
		}catch(Exception e){
			e.printStackTrace();
		}
		return list;
	}

	public String add(RepairEntity repairsheet) {
		String result = "success";
		try{
			String sql = "INSERT INTO repairSheet (repairNo, repairDate, user_id,vehicle_id,drivingDistance,tankNum,description,status) VALUES (?,?,?,?,?,?,?,?)";
			
			List<Object> params = new ArrayList<Object>();
			params.add(repairsheet.getRepairNo());
			params.add(repairsheet.getRepairDate());
			params.add(repairsheet.getUser_id());
			params.add(repairsheet.getVehicle_id());
			params.add(repairsheet.getDrivingDistance());
			params.add(repairsheet.getTankNum());
			params.add(repairsheet.getDescription());
			params.add(repairsheet.getStatus());
			
			DAOUtil dao = new DAOUtil();
			dao.update(sql, params.toArray());	
			
		}catch(Exception e){
			
			result = e.getMessage();
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 管理员更新修理单
	 * @param repairsheet
	 * @return
	 */
	public String updateByAdmin(RepairEntity repairsheet) {
		String result = "success";
		try{
			String sql = "INSERT INTO repairSheet (repairNo, repairDate, user_id,vehicle_id,drivingDistance,tankNum,description,status) VALUES (?,?,?,?,?,?,?,?)";
			
			List<Object> params = new ArrayList<Object>();
			params.add(repairsheet.getRepairNo());
			params.add(repairsheet.getRepairDate());
			params.add(repairsheet.getUser_id());
			params.add(repairsheet.getVehicle_id());
			params.add(repairsheet.getDrivingDistance());
			params.add(repairsheet.getTankNum());
			params.add(repairsheet.getDescription());
			params.add(repairsheet.getStatus());
			
			DAOUtil dao = new DAOUtil();
			dao.update(sql, params.toArray());	
			
		}catch(Exception e){
			
			result = e.getMessage();
			e.printStackTrace();
		}
		return result;
	}
	/**
	 * 普通更新
	 * @param repairsheet
	 * @return
	 */

	public String update(RepairEntity repairsheet) {
		String result = "success";
		try{
			String sql = "UPDATE repairSheet SET  repairDate= ? ,drivingDistance= ? ,tankNum= ? ,description=? WHERE id = ?";
			
			List<Object> params = new ArrayList<Object>();
			params.add(repairsheet.getRepairDate());
			params.add(repairsheet.getDrivingDistance());
			params.add(repairsheet.getTankNum());
			params.add(repairsheet.getDescription());
			params.add(repairsheet.getId());
			DAOUtil dao = new DAOUtil();
			dao.update(sql, params.toArray());	
			
		}catch(Exception e){
			
			result = e.getMessage();
			e.printStackTrace();
		}
		return result;
	}

}
