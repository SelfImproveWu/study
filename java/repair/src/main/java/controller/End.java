/**
 * 
 */
package controller;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

/**
 * @author wuzq
 *
 */
public class End implements ApplicationListener<ContextRefreshedEvent> {

	@Override
	public void onApplicationEvent(ContextRefreshedEvent event) {
	//需要执行的逻辑代码，当spring容器初始化完成后就会执行该方法。
		if(event.getApplicationContext().getParent() == null){//root application context 没有parent，他就是老大.
			System.out.println("controller is already init!");		
			System.out.println("next is 2B time!");				
			System.out.println("write one bug, run anyWhere!");	
			}
	}
}
