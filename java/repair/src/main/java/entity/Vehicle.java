/**
 * 
 */
package entity;

/**
 * @author wuzq
 *
 */
public class Vehicle {
	/**
	 * 主键 ID
	 */
	public int id;
	/**
	 * 用户名称
	 */
	public int user_id;
	/**
	 * 车辆名称
	 */
	public String name;
	/**
	 * 底盘号
	 */
	public String chassisNo;
	/**
	 * 保险公司id
	 */
	/**
	 * 保险公司名称
	 */
	public String insuranceCompany_name;

	/**
	 * 车型名称
	 * 
	 */
	public String vehicleType_name;
	/**
	 * 车牌号
	 */
	public String mark;
	/**
	 * @return the id
	 */
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getUser_id() {
		return user_id;
	}
	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getChassisNo() {
		return chassisNo;
	}
	public void setChassisNo(String chassisNo) {
		this.chassisNo = chassisNo;
	}

	public String getInsuranceCompany_name() {
		return insuranceCompany_name;
	}
	public void setInsuranceCompany_name(String insuranceCompany_name) {
		this.insuranceCompany_name = insuranceCompany_name;
	}

	public String getVehicleType_name() {
		return vehicleType_name;
	}
	public void setVehicleType_name(String vehicleType_name) {
		this.vehicleType_name = vehicleType_name;
	}
	public String getMark() {
		return mark;
	}
	public void setMark(String mark) {
		this.mark = mark;
	}
	

}	
