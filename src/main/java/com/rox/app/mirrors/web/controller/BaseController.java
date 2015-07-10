package com.rox.app.mirrors.web.controller;

import org.springframework.web.servlet.ModelAndView;

/**
 * 基类
 * @author lixu
 */
public class BaseController {
    
	protected ModelAndView ajaxDone(int statusCode, String message) {
		ModelAndView mav = new ModelAndView("layout/ajaxDone");
		mav.addObject("statusCode", statusCode);
		mav.addObject("message", message);
		mav.addObject("callbackType", "closeCurrent");
		mav.addObject("reloadParentTab", "1");
		return mav;
	}

    protected ModelAndView ajaxDoneCloseWin(int statusCode, String message) {
        ModelAndView mav = new ModelAndView("layout/ajaxDone");
        mav.addObject("statusCode", statusCode);
        mav.addObject("message", message);
        mav.addObject("callbackType", "closeCurrent");
        return mav;
    }
	   
	protected ModelAndView ajaxJsonDone(String json) {
		ModelAndView mav = new ModelAndView("layout/ajaxJsonDone");
		mav.addObject("json",json);
		return mav;
	}
	
	protected ModelAndView ajaxUnDone(int statusCode, String message) {
		ModelAndView mav = new ModelAndView("layout/ajaxDone");
		mav.addObject("statusCode", statusCode);
		mav.addObject("message", message);
		return mav;
	}
	protected ModelAndView ajaxDoneFail(String message) {
		return ajaxUnDone(300, message);
	}

	protected ModelAndView ajaxDoneSuccessOnlyMsg(String message) {
		return ajaxUnDone(200, message);
	}
	
	protected ModelAndView ajaxDoneSuccess(String message) {
		return ajaxDone(200, message);
	}

	protected ModelAndView ajaxDoneSuccessOnlyClose(String message) {
        return ajaxDoneCloseWin(200, message);
    }
	
	protected ModelAndView ajaxDoneSuccessReloadParentDialog(String message) {
		ModelAndView mav = new ModelAndView("layout/ajaxDone");
		mav.addObject("statusCode", 200);
		mav.addObject("message", message);
		mav.addObject("callbackType", "closeCurrent");
		mav.addObject("reloadParentDialog", "1");
		return mav;
	}
	
	protected ModelAndView ajaxDoneSuccessReloadCurrentDialog(String message) {
		ModelAndView mav = new ModelAndView("layout/ajaxDone");
		mav.addObject("statusCode", 200);
		mav.addObject("message", message);
		mav.addObject("reloadParentDialog", "1");
		return mav;
	}
	
	protected ModelAndView ajaxDoneError(String message) {
		return ajaxDone(300, message);
	}
}
