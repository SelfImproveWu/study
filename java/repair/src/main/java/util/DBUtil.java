package util;

import java.io.FileInputStream;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Properties;

/**
 * JDBC �Ĺ�����
 * 
 * ���а���: ��ȡ���ݿ�����, �ر����ݿ���Դ�ȷ���.
 */
public class DBUtil {
	public static Connection getConnection() throws Exception {
		Properties properties = new Properties();
		// InputStream inStream =
		// DBUtil.class.getClassLoader().getResourceAsStream("jdbc.properties");
		// properties.load(inStream);
		//getServletContext().getRealPath("/WEB-INF/");
		DBUtil db = new DBUtil();
		String classesUrl = db.getClass().getResource("").getPath().replaceAll("%20", " ");
		String filePath = classesUrl.substring(0, classesUrl.indexOf("WEB-INF")) + "WEB-INF/jdbc.properties";
		InputStream inStream = new FileInputStream(filePath);
		properties.load(inStream);
		// 1. ׼����ȡ���ӵ� 4 ���ַ���: user, password, url, jdbcDriver
		String user = properties.getProperty("user").trim();
		String password = properties.getProperty("password").trim();
		String url = properties.getProperty("url").trim();
		String jdbcDriver = properties.getProperty("jdbcDriver").trim();

		// 2. ��������: Class.forName(driverClass)
		Class.forName(jdbcDriver);

		// 3.��ȡ���ݿ�����
		Connection connection = DriverManager.getConnection(url, user, password);
		return connection;
	}
//	public String getFileUrl(){
//		String classesUrl =	this.getClass().getResource("").getPath().replaceAll("%20", " ");
//		System.out.println("classesUrl---"+classesUrl);
//		String filePath = classesUrl.substring(0, classesUrl.indexOf("WEB-INF")) + "WEB-INF/jdbc.properties";
//	}
	public static void releaseDB(ResultSet resultSet, Statement statement, Connection connection) {

		if (resultSet != null) {
			try {
				resultSet.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		if (statement != null) {
			try {
				statement.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}

		if (connection != null) {
			try {
				connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
//	public static void main(String args[]){
//		DBUtil db = new DBUtil();
//		try {
//			db.getConnection();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//	}

}