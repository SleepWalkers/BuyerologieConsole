package com.buyerologie.console.web.vip;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.buyerologie.common.vo.JsonVO;
import com.buyerologie.core.spring.mvc.CheckToken;
import com.buyerologie.trade.ProductService;
import com.buyerologie.trade.model.VipProduct;
import com.buyerologie.vip.exception.VipException;
import com.buyerologie.vip.exception.VipProductInfoErrorException;

@Controller
public class VipProductApiController {

    @Resource
    private ProductService productService;

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_MASTER" })
    @CheckToken(resetToken = true)
    @ResponseBody
    @RequestMapping(value = "/api/vip/product/add", method = RequestMethod.POST)
    public String productAdd(@RequestParam String name, @RequestParam double price,
                             @RequestParam int availableDays, @RequestParam String description,
                             @RequestParam String redirectUrl) throws VipException {

        if (StringUtils.isBlank(name) || price <= 0 || availableDays <= 0
            || StringUtils.isBlank(description)) {
            throw new VipProductInfoErrorException();
        }

        VipProduct vipProduct = new VipProduct(name, price, availableDays, description);
        productService.add(vipProduct);

        return new JsonVO(true, true, redirectUrl).toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_MASTER" })
    @CheckToken(resetToken = true)
    @ResponseBody
    @RequestMapping(value = "/api/vip/product/edit", method = RequestMethod.POST)
    public String prodcutEdit(@RequestParam int productId, @RequestParam String name,
                              @RequestParam double price, @RequestParam int availableDays,
                              @RequestParam String description, @RequestParam String redirectUrl)
                                                                                                 throws VipException {

        if (StringUtils.isBlank(name) || price <= 0 || availableDays <= 0
            || StringUtils.isBlank(description)) {
            throw new VipProductInfoErrorException();
        }

        productService.edit(productId, name, price, availableDays, description);

        return new JsonVO(true, true, redirectUrl).toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_MASTER" })
    @CheckToken(resetToken = true)
    @ResponseBody
    @RequestMapping(value = "/api/vip/product/delete", method = RequestMethod.POST)
    public String prodcutDelete(@RequestParam int productId) throws VipException {

        productService.delete(productId);

        return new JsonVO(true).toString();
    }

}
