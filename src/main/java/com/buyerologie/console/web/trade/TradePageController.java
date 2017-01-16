package com.buyerologie.console.web.trade;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.buyerologie.console.web.trade.vo.IntactTradeOrder;
import com.buyerologie.enums.OrderStatus;
import com.buyerologie.trade.TradeService;
import com.buyerologie.trade.model.TradeOrder;
import com.buyerologie.user.UserService;
import com.buyerologie.user.model.User;
import com.buyerologie.utils.PageUtil;

@Controller
public class TradePageController {

    @Resource
    private UserService      userService;

    @Resource
    private TradeService     tradeService;

    private static final int DEFALUT_PAGE_SIZE = 20;

    //    private static final Logger logger            = Logger.getLogger(TradePageController.class);

    @RequestMapping(value = "/trade/search", method = RequestMethod.GET)
    public String tradeSearch(Model model, @RequestParam String keywords) {

        User user = userService.getUser(keywords);

        List<TradeOrder> tradeOrders = new ArrayList<>();
        if (user != null) {
            tradeOrders = tradeService.get(user.getId());
        } else {
            if (StringUtils.isNumeric(keywords)) {
                tradeOrders.add(tradeService.get(Long.parseLong(keywords)));
            }
        }
        model.addAttribute("tradeOrders", get(tradeOrders));
        return "trade/tradeList";
    }

    @RequestMapping(value = "/trade/list", method = RequestMethod.GET)
    public String tradeList(Model model,
                            @RequestParam(required = false, defaultValue = "1") int page,
                            @RequestParam(required = false, defaultValue = "0") int statusCode) {

        model.addAttribute("tradeOrders", get(page, statusCode));
        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages", PageUtil.calcPageTotal(
            tradeService.countOrderNum(OrderStatus.getOrderStatus(statusCode)), DEFALUT_PAGE_SIZE));

        return "trade/tradeList";
    }

    private List<IntactTradeOrder> get(List<TradeOrder> tradeOrders) {
        if (tradeOrders == null || tradeOrders.isEmpty()) {
            return null;
        }
        List<IntactTradeOrder> intactTradeOrders = new ArrayList<>();
        for (TradeOrder tradeOrder : tradeOrders) {
            intactTradeOrders.add(new IntactTradeOrder(
                userService.getUser(tradeOrder.getBuyerId()), tradeOrder));
        }
        return intactTradeOrders;
    }

    private List<IntactTradeOrder> get(int page, int statusCode) {
        List<TradeOrder> tradeOrders = tradeService.get(OrderStatus.getOrderStatus(statusCode),
            page, DEFALUT_PAGE_SIZE);
        return get(tradeOrders);
    }
}
