package com.buyerologie.console.web.course;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.buyerologie.common.exception.PageNotFoundException;
import com.buyerologie.topic.CourseService;
import com.buyerologie.video.VideoService;
import com.buyerologie.video.model.Video;

@Controller
public class CourseDetailPageController {

    @Resource
    private VideoService  videoService;

    @Resource
    private CourseService courseService;

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_MASTER", "ROLE_COURSE_EDITOR" })
    @RequestMapping(value = "/course/add", method = RequestMethod.GET)
    public String newsAdd(Model model) {
        List<Video> videos = videoService.getAllVideos();
        model.addAttribute("videos", videos);
        return "course/courseAdd";
    }

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_MASTER", "ROLE_COURSE_EDITOR" })
    @RequestMapping(value = "/course/edit", method = RequestMethod.GET)
    public String newsEdit(Model model, @RequestParam int id) throws PageNotFoundException {

        List<Video> videos = videoService.getAllVideos();
        model.addAttribute("videos", videos);

        model.addAttribute("course", courseService.getCourse(id));

        return "course/courseAdd";
    }

}
