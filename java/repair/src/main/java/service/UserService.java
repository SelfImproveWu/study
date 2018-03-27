package service;

import java.util.ArrayList;
import java.util.List;
import entity.User;
import util.DAOUtil;

public class UserService {

	/**
	 * У���¼���
	 * 
	 * @param user
	 * @return
	 */
	public User doLogin(String loginName, String password) {
		User  user = new User();
		try {
			String sql = "SELECT * FROM user WHERE loginName =?";
			List<Object> params = new ArrayList<Object>();
			params.add(loginName);
			DAOUtil dao = new DAOUtil();
			user = dao.get(User.class, sql, params.toArray());// ��ȡ��ͬ��¼�����û����ݼ���

			if (null != user && null != user.getPassword()) {
				user= user.getPassword().toString().trim().equals(password) ? user : null;// 如果相同返回user信息，不同，直接清空
				
				//System.out.println("user1--password---" + user1.getPassword());
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return user;
	};

	// private void addLoginLog(User user) {//待用
	// StringBuilder sbSql = new StringBuilder();
	// sbSql.append("INSERT INTO userLogin ");
	// sbSql.append("VALUES(?,?,?,?,?,?)");
	// DAOUtil dao = new DAOUtil();
	// try{
	// dao.update(sbSql.toString(), user);
	// }catch(Exception e){
	// e.printStackTrace();
	// }
	//
	// }

//	public static void main(String args[]) {
//		UserService us = new UserService();
//		User user = new User();
//		user.setLoginName("zhangsan");
//		user.setPassword("123456");
//		boolean bl = us.doLogin(user);
//		System.out.println("bl----" + bl);
//
//	}

	/**
	 * @param user
	 * @return
	 */
	public boolean add(User user) {
		boolean bl = true;
		try {
			String strSql = "INSERT INTO user (name, address, sex, identityID, loginName, password,tel) values(?,?,?,?,?,?,?)";
			List<Object> params = new ArrayList<Object>();
			params.add(user.getName());
			params.add(user.getAddress());
			params.add(user.getSex());
			params.add(user.getIdentityID());
			params.add(user.getLoginName());
			params.add(user.getPassword());
			params.add(user.getTel());
			DAOUtil dao = new DAOUtil();
			dao.update(strSql, params.toArray());// ��ȡ��ͬ��¼�����û����ݼ���
		} catch (Exception e) {
			bl = false;
			e.printStackTrace();
		}
		return bl;
	}
	/**
	 * 查询是否重名
	 * @param loginName
	 * @return
	 */
	public boolean isRepeatUser(String loginName) {
		boolean bl = false;
		try {
			String sql = "SELECT * FROM user WHERE loginName = ?";
			DAOUtil dao = new DAOUtil();
			List<Object> params = new ArrayList<Object>();
			params.add(loginName);
			List<User> userList = dao.getForList(User.class, sql, params.toArray());
			bl = userList.size() >= 1 ? true : false;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bl;
	}

}
