package com.buyerologie.console.web.trade.vo;

import com.buyerologie.trade.model.TradeOrder;
import com.buyerologie.user.model.User;

public class IntactTradeOrder extends TradeOrder {

    private User buyer;

    public IntactTradeOrder() {
    }

    public IntactTradeOrder(TradeOrder tradeOrder) {
        super(tradeOrder);
    }

    public IntactTradeOrder(User buyer, TradeOrder tradeOrder) {
        super(tradeOrder);
        this.buyer = buyer;
    }

    public User getBuyer() {
        return buyer;
    }

    public void setBuyer(User buyer) {
        this.buyer = buyer;
    }

}
