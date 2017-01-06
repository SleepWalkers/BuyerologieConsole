package com.buyerologie.console.web.authority;

import javax.annotation.Resource;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.buyerologie.common.vo.JsonVO;
import com.buyerologie.core.spring.mvc.CheckToken;
import com.buyerologie.user.AuthorityService;
import com.buyerologie.user.UserService;
import com.buyerologie.user.exception.UserException;
import com.buyerologie.user.exception.UserNotFoundException;
import com.buyerologie.user.model.User;

@Controller
public class AuthorityApiController {

    @Resource
    private UserService      userService;

    @Resource
    private AuthorityService authorityService;

    @ResponseBody
    @Secured({ "ROLE_ADMIN", "ROLE_USER_MASTER", "ROLE_USER_EDITOR" })
    @RequestMapping(value = { "/api/user/authority/search" }, method = { org.springframework.web.bind.annotation.RequestMethod.POST })
    public String authoritySearch(@RequestParam String userName, @RequestParam String redirectUrl)
                                                                                                  throws UserNotFoundException {

        User user = this.userService.getUser(userName);

        if (user == null) {
            throw new UserNotFoundException();
        }
        JsonVO jsonVO = new JsonVO(true);
        jsonVO.setIsRedirect(true);
        redirectUrl = redirectUrl + "?userId=" + user.getId();
        jsonVO.setRedirectURL(redirectUrl);
        return jsonVO.toString();
    }

    @CheckToken(resetToken = true)
    @ResponseBody
    @Secured({ "ROLE_ADMIN", "ROLE_USER_MASTER", "ROLE_USER_EDITOR" })
    @RequestMapping(value = { "/api/user/authority/relate" }, method = { org.springframework.web.bind.annotation.RequestMethod.POST })
    public String relateAuthority(@RequestParam int userId, @RequestParam String[] authorityArr,
                                  @RequestParam String redirectUrl) throws UserException {
        User user = this.userService.getUser(userId);
        if (user == null) {
            throw new UserNotFoundException();
        }

        for (String authority : authorityArr) {
            authorityService.grant(userId, authority);
        }

        JsonVO jsonVO = new JsonVO(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);
        return jsonVO.toString();
    }

    @CheckToken(resetToken = true)
    @ResponseBody
    @Secured({ "ROLE_ADMIN", "ROLE_USER_MASTER", "ROLE_USER_EDITOR" })
    @RequestMapping(value = { "/api/user/authority/unrelate" }, method = { org.springframework.web.bind.annotation.RequestMethod.POST })
    public String unrelateAuthority(@RequestParam int userId, @RequestParam String authority,
                                    @RequestParam String redirectUrl) throws UserException {
        User user = this.userService.getUser(userId);
        if (user == null) {
            throw new UserNotFoundException();
        }

        authorityService.revoke(userId, authority);

        JsonVO jsonVO = new JsonVO(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);
        return jsonVO.toString();
    }
}