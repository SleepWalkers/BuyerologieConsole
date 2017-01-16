package com.buyerologie.console.web.vip;

import com.buyerologie.user.model.User;
import com.buyerologie.user.model.VipDetail;

public class ListVipDetail extends VipDetail {

    private User user;

    public ListVipDetail() {
    }

    public ListVipDetail(VipDetail vipDetail) {
        super(vipDetail);
    }

    public ListVipDetail(User user, VipDetail vipDetail) {
        super(vipDetail);
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
