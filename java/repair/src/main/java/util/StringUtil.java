/**
 * 
 */
package util;

/**
 * @author wuzq
 *
 */
public class StringUtil {
	public static String getString(Object obj) {
		return null == obj ? "" : obj.toString().trim();
	}
}
