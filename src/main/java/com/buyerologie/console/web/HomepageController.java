package com.buyerologie.console.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.buyerologie.user.exception.UserException;

@Controller
public class HomepageController {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String homepage() throws UserException {

        return "home/homepage";
    }
}
