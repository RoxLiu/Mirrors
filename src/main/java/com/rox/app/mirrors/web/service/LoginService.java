package com.rox.app.mirrors.web.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.stereotype.Service;

import com.rox.app.mirrors.web.service.LoginService;

@Service
public class LoginService {
    private Log logger = LogFactory.getLog(this.getClass());
//	@Resource
//	private LoginDAO loginDAO;

    public boolean login(String loginId, String loginPwd) throws Exception {
//		boolean answer = false;
//		long result = 0;
//		try {
//			result = loginDAO.validLogin(loginId, loginPwd);
//		} catch (Exception e) {
//			result = 0;
//			logger.error("login error:" + e.getMessage(), e);
//		}
//		if (result == 1) {
//			answer = true;
//		} else {
//			answer = false;
//		}
//		return answer;

        return true;
    }

}
