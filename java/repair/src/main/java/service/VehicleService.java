/**
 * 
 */
package service;

import java.util.ArrayList;
import java.util.List;

import entity.Vehicle;
import util.DAOUtil;

/**
 * @author wuzq
 *
 */
public class VehicleService {

	/**
	 * @param userId
	 * @return
	 */
	public ArrayList<Vehicle> getVehicleListByUserId(String userId) {
		ArrayList<Vehicle> vehicleList = new ArrayList<Vehicle>();
		try{
			String sql = "SELECT * FROM vehicle WHERE user_id = ?";
			List<Object> params = new ArrayList<Object>();
			params.add(userId);
			DAOUtil dao = new DAOUtil();
			vehicleList = (ArrayList<Vehicle>) dao.getForList(Vehicle.class, sql, params.toArray());			
		}catch(Exception e){
			e.printStackTrace();
		}
		return vehicleList;
	}

	/**
	 * @param vehicle
	 */
	public String addVehicle(Vehicle vehicle) {
		String result = "success";
		try{
			String sql="INSERT INTO vehicle (user_id , name , mark , vehicleType_name , chassisNo , insuranceCompany_name)VALUES(?,?,?,?,?,?)";
			List<Object> params = new ArrayList<Object>();
			params.add(vehicle.getUser_id());
			params.add(vehicle.getName());
			params.add(vehicle.getMark());
			params.add(vehicle.getVehicleType_name());
			params.add(vehicle.getChassisNo());
			params.add(vehicle.getInsuranceCompany_name());
			DAOUtil dao = new DAOUtil();
			dao.update(sql, params.toArray());
		}catch(Exception e){
			e.printStackTrace();
			result = e.getMessage();
		}		
		return result;		
	}
	/**
	 * 删除车辆信息
	 * @param vehicleId
	 * @return
	 */
	public String delete(int vehicleId){
		String result = "success";
		try{
			String sql="DELETE FROM vehicle WHERE id=?";
			
			List<Object> params = new ArrayList<Object>();
			params.add(vehicleId);			
			DAOUtil dao = new DAOUtil();
			dao.update(sql, params.toArray());
		}catch(Exception e){
			e.printStackTrace();
			result = e.getMessage();
		}		
		return result;	
	}
	/**
	 * 更新车辆信息
	 * @param vehicle
	 * @return
	 */
	
	public String update(Vehicle vehicle){
		String result = "success";
		try{
			String sql="UPDATE vehicle SET user_id =?, name =?, mark = ? , vehicleType_name = ? , chassisNo = ?, insuranceCompany_name = ?  WHERE id = ?";
			List<Object> params = new ArrayList<Object>();
			params.add(vehicle.getUser_id());
			params.add(vehicle.getName());
			params.add(vehicle.getMark());
			params.add(vehicle.getVehicleType_name());
			params.add(vehicle.getChassisNo());
			params.add(vehicle.getInsuranceCompany_name());
			params.add(vehicle.getId());
			DAOUtil dao = new DAOUtil();
			dao.update(sql, params.toArray());
		}catch(Exception e){
			e.printStackTrace();
			result = e.getMessage();
		}		
		return result;		
	}
	
}
