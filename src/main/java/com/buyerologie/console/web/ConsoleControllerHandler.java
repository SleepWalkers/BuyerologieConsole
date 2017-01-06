package com.buyerologie.console.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.ModelAndView;

import com.buyerologie.core.spring.mvc.interceptor.DefaultControllerHandler;
import com.buyerologie.user.UserService;

@Component("ControllerHandler")
public class ConsoleControllerHandler extends DefaultControllerHandler {

    @Resource
    private UserService userService;

    @Override
    public void postSyncHandle(HttpServletRequest request, HttpServletResponse response,
                               ModelAndView modelAndView) throws Exception {

        modelAndView.addObject("gv_user", userService.getCurrentUser());
    }

    @Override
    public void postAsyncHandle(HttpServletRequest request, HttpServletResponse response,
                                ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void preHandle(HttpServletRequest arg0, HttpServletResponse arg1) throws Exception {
    }

}
