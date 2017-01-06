package com.buyerologie.console.web.playlist;

import javax.annotation.Resource;

import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.buyerologie.video.VideoService;

@Controller
public class PlayListPageController {

    @Resource
    private VideoService videoService;

    @Secured({ "ROLE_ADMIN", "ROLE_VIDEO_MASTER", "ROLE_VIDEO_EDITOR" })
    @RequestMapping(value = "/play/list", method = RequestMethod.GET)
    public String userDetail(Model model) {

        model.addAttribute("videos", videoService.getAllVideos());
        return "playlist/playlists";
    }
}
