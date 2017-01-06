package com.buyerologie.console.web.authority;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.buyerologie.user.AuthorityService;
import com.buyerologie.user.UserService;
import com.buyerologie.user.model.Authority;
import com.buyerologie.user.model.User;
import com.buyerologie.utils.UserAuthUtil;

@Controller
public class AuthorityController {

    @Resource
    private UserService      userService;

    @Resource
    private AuthorityService authorityService;

    @Secured({ "ROLE_ADMIN" })
    @RequestMapping(value = { "/user/authority" }, method = RequestMethod.GET)
    public String authorityMagager(Model model,
                                   @RequestParam(required = false, defaultValue = "0") int userId) {
        if (userId != 0) {
            setAuthorityManageModel(model, userId);
        }
        return "authority/authorityManage";
    }

    private void setAuthorityManageModel(Model model, int userId) {
        User user = this.userService.getUser(userId);

        if (user != null) {
            List<Authority> allAuthorities = this.authorityService.get();

            Map<String, Authority> authorityMap = buildEnNameAuthorityMap(allAuthorities);
            List<Authority> userAuthorities = filterUserAuthorities(user.getAuth(), authorityMap);

            List<Authority> unrelatedAuthorities = filterUnrelateAuthorities(userAuthorities,
                allAuthorities);

            model.addAttribute("userAuths", userAuthorities);
            model.addAttribute("unrelatedAuthorities", unrelatedAuthorities);
            model.addAttribute("user", user);
        }
    }

    private List<Authority> filterUnrelateAuthorities(List<Authority> userAuthorities,
                                                      List<Authority> allAuthorities) {
        if ((userAuthorities == null) || (userAuthorities.isEmpty())) {
            return allAuthorities;
        }
        List<Authority> unrelatedAuthorities = new ArrayList<>();
        for (Authority authority : allAuthorities) {
            boolean isRelated = false;
            for (Authority relatedAuthority : userAuthorities) {
                if (relatedAuthority.getId() == authority.getId()) {
                    isRelated = true;
                    break;
                }
            }
            if (!isRelated) {
                unrelatedAuthorities.add(authority);
            }
        }
        return unrelatedAuthorities;
    }

    private List<Authority> filterUserAuthorities(String userAuth,
                                                  Map<String, Authority> authorityMap) {
        if ((StringUtils.isBlank(userAuth)) || (authorityMap == null) || (authorityMap.isEmpty())) {
            return null;
        }

        List<String> userAuthStrList = UserAuthUtil.getAuthList(userAuth);

        List<Authority> userAuthorities = new ArrayList<>();

        Set<String> authoritySet = authorityMap.keySet();
        for (String authority : authoritySet) {
            if (userAuthStrList.contains(authority)) {
                userAuthorities.add(authorityMap.get(authority));
            }
        }
        return userAuthorities;
    }

    private Map<String, Authority> buildEnNameAuthorityMap(List<Authority> authorities) {
        if ((authorities == null) || (authorities.isEmpty())) {
            return null;
        }
        Map<String, Authority> enNameAuthorityMap = new HashMap<>();
        for (Authority authority : authorities) {
            enNameAuthorityMap.put(authority.getAuthority(), authority);
        }
        return enNameAuthorityMap;
    }

}
