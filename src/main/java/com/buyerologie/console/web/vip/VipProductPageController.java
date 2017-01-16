package com.buyerologie.console.web.vip;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.buyerologie.trade.ProductService;
import com.buyerologie.trade.model.VipProduct;

@Controller
public class VipProductPageController {

    @Resource
    private ProductService productService;

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_EDITOR" })
    @RequestMapping(value = "/vip/product/list", method = RequestMethod.GET)
    public String productList(Model model) {
        List<VipProduct> vipProducts = productService.getAllProducts();
        model.addAttribute("vipProducts", vipProducts);
        return "vip/product/productList";
    }

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_EDITOR" })
    @RequestMapping(value = "/vip/product/add", method = RequestMethod.GET)
    public String productAdd(Model model) {
        return "vip/product/productEdit";
    }

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_EDITOR" })
    @RequestMapping(value = "/vip/product/edit", method = RequestMethod.GET)
    public String productEdit(Model model, @RequestParam int id) {
        model.addAttribute("product", productService.get(id));
        return "vip/product/productEdit";
    }
}
