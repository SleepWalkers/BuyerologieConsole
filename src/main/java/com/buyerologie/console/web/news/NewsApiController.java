package com.buyerologie.console.web.news;

import javax.annotation.Resource;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.buyerologie.common.vo.JsonVO;
import com.buyerologie.console.utils.FileUploadUtils;
import com.buyerologie.console.utils.NewsContentImageUtils;
import com.buyerologie.security.SecurityService;
import com.buyerologie.topic.NewsService;
import com.buyerologie.topic.enums.ImageType;
import com.buyerologie.topic.exception.TopicException;

@Controller
public class NewsApiController {

    @Resource
    private SecurityService securityService;

    @Resource
    private NewsService     newsService;

    @Secured({ "ROLE_ADMIN", "ROLE_NEWS_MASTER", "ROLE_NEWS_EDITOR" })
    @ResponseBody
    @RequestMapping(value = "/api/news/add", method = RequestMethod.POST)
    public String newsAdd(@RequestParam String title,
                          @RequestParam String content) throws TopicException {

        content = NewsContentImageUtils.formatImageTag(content);
        newsService.createNews(0, title, content);

        JsonVO jsonVO = new JsonVO(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL("/news/list");
        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_NEWS_MASTER", "ROLE_NEWS_EDITOR" })
    @ResponseBody
    @RequestMapping(value = "/api/news/edit", method = RequestMethod.POST)
    public String newsEdit(@RequestParam int newsId, @RequestParam String title,
                           @RequestParam String content) throws TopicException {
        content = NewsContentImageUtils.formatImageTag(content);

        newsService.editNews(newsId, title, content);

        JsonVO jsonVO = new JsonVO(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL("/news/list");
        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_NEWS_MASTER", "ROLE_NEWS_EDITOR" })
    @ResponseBody
    @RequestMapping(value = "/api/news/image/delete", method = RequestMethod.POST)
    public String newsAdd(@RequestParam int imageId, @RequestParam int newsId,
                          @RequestParam String redirectUrl) throws TopicException {

        newsService.delteNewsImage(newsId, imageId);

        JsonVO jsonVO = new JsonVO(true);
        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_NEWS_MASTER", "ROLE_NEWS_EDITOR" })
    @ResponseBody
    @RequestMapping(value = "/api/news/delete", method = RequestMethod.POST)
    public String newsAdd(@RequestParam int id) throws TopicException {

        newsService.deleteNews(id);
        JsonVO jsonVO = new JsonVO(true);
        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_NEWS_MASTER", "ROLE_NEWS_EDITOR" })
    @ResponseBody
    @RequestMapping(value = "/api/news/image/upload", method = RequestMethod.POST)
    public String newsImage(@RequestParam int newsId, @RequestParam int imageType,
                            @RequestParam(required = false, defaultValue = "0") int imageId,
                            @RequestParam MultipartFile imageFile,
                            @RequestParam String redirectUrl) throws TopicException {

        String image = FileUploadUtils.uploadImage(imageFile);

        if (imageId == 0) {
            newsService.addNewsImage(newsId, image, ImageType.cast(imageType));
        } else {
            newsService.editImage(imageId, image);
        }
        JsonVO jsonVO = new JsonVO(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL(redirectUrl);
        return jsonVO.toString();
    }
}
