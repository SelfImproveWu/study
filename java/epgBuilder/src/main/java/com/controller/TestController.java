package com.controller;

import java.io.File;
import java.util.Date;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import com.service.OrderService;

@Controller
@RequestMapping("/test")
public class TestController {
	@RequestMapping("/test")
	public @ResponseBody String test() {
		return "hello, world! This com from spring!";
	}

	/**
	 * 改动背景图
	 * 
	 * @param request
	 * @return
	 */
	@RequestMapping("/fileUpAndSetBg")
	public String fileUpAndSetBg(@RequestParam("file") CommonsMultipartFile file) {

		try {
			long startTime = System.currentTimeMillis();
			System.out.println("fileName：" + file.getOriginalFilename());
			String path = "E:/springUpload/" + new Date().getTime()
					+ file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));

			File newFile = new File(path);
			if (!newFile.getParentFile().exists()) {// 文件不存在创建文件
				newFile.getParentFile().mkdirs();

			}
			if (!newFile.exists()) {// 文件不存在创建文件
				newFile.createNewFile();

			}
			// 通过CommonsMultipartFile的方法直接写文件（注意这个时候）
			file.transferTo(newFile);
			long endTime = System.currentTimeMillis();
			System.out.println("方法二的运行时间：" + String.valueOf(endTime - startTime) + "ms");
			OrderService os = new OrderService();
			os.uploadAndSetBgImg(path, "E://order.css");

		} catch (Exception e) {
			e.printStackTrace();
		}

		return "file UP is success!!";
	}
	// public void

}
