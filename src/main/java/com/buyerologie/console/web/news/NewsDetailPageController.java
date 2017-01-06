package com.buyerologie.console.web.news;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.buyerologie.common.exception.PageNotFoundException;
import com.buyerologie.topic.NewsService;
import com.buyerologie.topic.enums.ImageType;
import com.buyerologie.topic.model.Image;

@Controller
public class NewsDetailPageController {

    @Resource
    private NewsService newsService;

    @Secured({ "ROLE_ADMIN", "ROLE_NEWS_MASTER", "ROLE_NEWS_EDITOR" })
    @RequestMapping(value = "/news/add", method = RequestMethod.GET)
    public String newsAdd(Model model) {

        return "news/newsAdd";
    }

    @Secured({ "ROLE_ADMIN", "ROLE_NEWS_MASTER", "ROLE_NEWS_EDITOR" })
    @RequestMapping(value = "/news/edit", method = RequestMethod.GET)
    public String newsEdit(Model model, @RequestParam int id) throws PageNotFoundException {

        model.addAttribute("news", newsService.getNews(id));

        return "news/newsAdd";
    }

    @Secured({ "ROLE_ADMIN", "ROLE_NEWS_MASTER", "ROLE_NEWS_EDITOR" })
    @RequestMapping(value = "/news/image/edit", method = RequestMethod.GET)
    public String newsImageEdit(Model model, @RequestParam int id) throws PageNotFoundException {

        model.addAttribute("newsId", id);

        List<Image> listImages = newsService.getImages(id, ImageType.LIST);
        if (listImages != null && !listImages.isEmpty()) {
            model.addAttribute("listImage1", listImages.get(0));
        }

        if (listImages.size() > 1) {
            model.addAttribute("listImage2", listImages.get(1));
        }

        List<Image> collectImages = newsService.getImages(id, ImageType.COLLECT);

        model.addAttribute("collectImage", collectImages.isEmpty() ? null : collectImages.get(0));
        return "news/imageEdit";
    }
}
