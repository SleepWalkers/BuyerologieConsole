package com.buyerologie.console.web.news;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.buyerologie.topic.NewsService;
import com.buyerologie.topic.vo.ListNews;
import com.buyerologie.utils.PageUtil;

@Controller
public class NewsListPageController {

    @Resource
    private NewsService      newsService;

    private static final int DEFAULT_PAGE_SIZE = 12;

    @Secured({ "ROLE_ADMIN", "ROLE_NEWS_MASTER", "ROLE_NEWS_EDITOR" })
    @RequestMapping(value = "/news/list", method = RequestMethod.GET)
    public String userDetail(Model model,
                             @RequestParam(required = false, defaultValue = "1") int page) {

        List<ListNews> listNewses = newsService.getListNewses(page, DEFAULT_PAGE_SIZE);

        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages",
            PageUtil.calcPageTotal(newsService.count(), DEFAULT_PAGE_SIZE));
        model.addAttribute("newses", listNewses);
        return "news/newsList";
    }
}
