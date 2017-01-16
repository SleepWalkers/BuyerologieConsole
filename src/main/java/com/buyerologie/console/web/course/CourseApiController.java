package com.buyerologie.console.web.course;

import javax.annotation.Resource;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.buyerologie.common.vo.JsonVO;
import com.buyerologie.core.spring.mvc.CheckToken;
import com.buyerologie.topic.CourseService;
import com.buyerologie.topic.exception.TopicException;
import com.buyerologie.video.VideoService;

@Controller
public class CourseApiController {

    @Resource
    private VideoService  videoService;

    @Resource
    private CourseService courseService;

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_MASTER" })
    @CheckToken(resetToken = true)
    @ResponseBody
    @RequestMapping(value = "/api/course/sync", method = RequestMethod.POST)
    public String courseSync() {
        videoService.sync();
        return new JsonVO(true).toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_MASTER", "ROLE_COURSE_EDITOR" })
    @ResponseBody
    @RequestMapping(value = "/api/course/add", method = RequestMethod.POST)
    public String newsAdd(@RequestParam String title, @RequestParam boolean isFree,
                          @RequestParam String videoId, @RequestParam String content)
                                                                                     throws TopicException {

        courseService.createCourse(0, isFree, title, videoId, content);

        JsonVO jsonVO = new JsonVO(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL("/course/list");
        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_MASTER", "ROLE_COURSE_EDITOR" })
    @ResponseBody
    @RequestMapping(value = "/api/course/edit", method = RequestMethod.POST)
    public String newsEdit(@RequestParam int courseId, @RequestParam String title,
                           @RequestParam boolean isFree, @RequestParam String videoId,
                           @RequestParam String content) throws TopicException {

        courseService.editCourse(courseId, isFree, title, videoId, content);
        JsonVO jsonVO = new JsonVO(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL("/course/list");
        return jsonVO.toString();
    }

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_MASTER", "ROLE_COURSE_EDITOR" })
    @ResponseBody
    @RequestMapping(value = "/api/course/delete", method = RequestMethod.POST)
    public String delete(@RequestParam int id) throws TopicException {

        courseService.deleteCourse(id);
        JsonVO jsonVO = new JsonVO(true);
        jsonVO.setIsRedirect(true);
        jsonVO.setRedirectURL("/course/list");
        return jsonVO.toString();
    }
}
