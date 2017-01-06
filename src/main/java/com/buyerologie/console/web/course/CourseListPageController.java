package com.buyerologie.console.web.course;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.buyerologie.topic.CourseService;
import com.buyerologie.topic.vo.Course;
import com.buyerologie.utils.PageUtil;

@Controller
public class CourseListPageController {

    @Resource
    private CourseService    courseService;

    private static final int DEFAULT_PAGE_SIZE = 12;

    @Secured({ "ROLE_ADMIN", "ROLE_COURSE_MASTER", "ROLE_COURSE_EDITOR" })
    @RequestMapping(value = "/course/list", method = RequestMethod.GET)
    public String userDetail(Model model,
                             @RequestParam(required = false, defaultValue = "1") int page) {

        List<Course> courses = courseService.getCourses(page, DEFAULT_PAGE_SIZE);

        model.addAttribute("currentPage", page);
        model.addAttribute("totalPages",
            PageUtil.calcPageTotal(courseService.count(), DEFAULT_PAGE_SIZE));
        model.addAttribute("courses", courses);
        return "course/courseList";
    }
}
