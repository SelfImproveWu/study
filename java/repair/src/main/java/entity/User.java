package entity;

public class User {
	
	private int id;
	private int sex;//0男 1 女
	private String tel;
	private String address;//地址
	private String identityID;//身份证号
	private String password;//登录密码
	private String loginName;//用户名
	private String name;//名称

	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}


	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		
		this.sex = sex;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getAdress() {
		return address;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public void setAdress(String adress) {
		this.address = adress;
	}
	public String getIdentityID() {
		return identityID;
	}
	public void setIdentityID(String identityID) {
		this.identityID = identityID;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
}
