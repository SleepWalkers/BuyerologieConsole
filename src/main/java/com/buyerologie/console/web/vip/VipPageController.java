package com.buyerologie.console.web.vip;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.buyerologie.user.UserService;
import com.buyerologie.user.model.VipDetail;
import com.buyerologie.utils.PageUtil;
import com.buyerologie.vip.VipService;

@Controller
public class VipPageController {

    @Resource
    private VipService       vipService;

    @Resource
    private UserService      userService;

    private static final int DEFAULT_PAGE_SIZE = 20;

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_EDITOR", "ROLE_COURSE_MASTER" })
    @RequestMapping(value = "/vip/list", method = RequestMethod.GET)
    public String productList(Model model,
                              @RequestParam(required = false, defaultValue = "1") int page) {

        List<VipDetail> vipDetails = vipService.get(page, DEFAULT_PAGE_SIZE);

        List<ListVipDetail> listVipDetails = null;
        if (vipDetails != null) {
            listVipDetails = new ArrayList<>();
            for (VipDetail vipDetail : vipDetails) {
                listVipDetails.add(new ListVipDetail(userService.getUser(vipDetail.getUserId()),
                    vipDetail));
            }
        }

        model.addAttribute("vips", listVipDetails);
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages",
            PageUtil.calcPageTotal(vipService.countVipNum(), DEFAULT_PAGE_SIZE));
        return "vip/user/vipList";
    }
}
